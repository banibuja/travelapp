require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Purchases = require('../models/purchases');
const User = require('../models/user');
const Aranzhmanet = require('../models/Aranzhmanet');
const { sendPaymentConfirmationEmail, sendTravelDocumentEmail, sendRefundConfirmationEmail } = require('../utils/emailService');

// Create Stripe Checkout Session
const createCheckoutSession = async (req, res) => {
  let purchase = null;
  try {
    const { userId, aranzhmaniId, packageDetails } = req.body;

    if (!userId || !packageDetails || !packageDetails.cmimi) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get user info
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove imageBase64 from packageDetails to save space in database
    const { imageBase64, ...packageDetailsWithoutImage } = packageDetails;

    // Create purchase record with pending status
    purchase = await Purchases.create({
      userId: userId,
      aranzhmaniId: aranzhmaniId || null,
      amount: parseFloat(packageDetails.cmimi),
      currency: 'eur',
      status: 'pending',
      adminApproved: null, // Explicitly set to null, not false
      packageDetails: JSON.stringify(packageDetailsWithoutImage),
    });

    // Create Stripe Checkout Session
    // Note: We don't include images because base64 images are too large for Stripe URL limits (2048 chars)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: packageDetails.titulli || 'Travel Package',
              description: `${packageDetails.nrNeteve} nights, ${packageDetails.nrPersonave} travelers - ${packageDetails.shteti || ''}`,
              // Images removed - base64 images exceed Stripe's 2048 character URL limit
            },
            unit_amount: Math.round(parseFloat(packageDetails.cmimi) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}&purchase_id=${purchase.id}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/cancel?purchase_id=${purchase.id}`,
      customer_email: user.email,
      metadata: {
        purchaseId: purchase.id.toString(),
        userId: userId.toString(),
        aranzhmaniId: aranzhmaniId ? aranzhmaniId.toString() : '',
      },
    });

    // Update purchase with session ID
    await purchase.update({
      stripeSessionId: session.id,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    // If purchase was created but session creation failed, delete the purchase
    if (purchase && purchase.id) {
      try {
        await Purchases.destroy({ where: { id: purchase.id } });
      } catch (deleteError) {
        console.error('Error deleting purchase after session creation failure:', deleteError);
      }
    }
    res.status(500).json({ 
      error: error.message || 'Failed to create checkout session',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Handle Stripe Webhook
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const purchaseId = session.metadata.purchaseId;

      console.log('Webhook received: checkout.session.completed');
      console.log('Purchase ID from metadata:', purchaseId);

      if (purchaseId) {
        const purchase = await Purchases.findByPk(purchaseId, {
          include: [
            { model: User, as: 'user' },
          ],
        });

        if (purchase) {
          console.log('Purchase found:', purchase.id);
          console.log('User found:', purchase.user ? `${purchase.user.firstName} ${purchase.user.lastName} (${purchase.user.email})` : 'NO USER');

          await purchase.update({
            status: 'completed',
            stripePaymentIntentId: session.payment_intent,
            // Don't touch adminApproved - it should remain null until admin acts
          });

          // Send payment confirmation email
          if (purchase.user && purchase.user.email) {
            try {
              const packageDetails = purchase.packageDetails 
                ? (typeof purchase.packageDetails === 'string' 
                    ? JSON.parse(purchase.packageDetails) 
                    : purchase.packageDetails)
                : {};

              console.log('Attempting to send payment confirmation email to:', purchase.user.email);
              await sendPaymentConfirmationEmail(purchase.user, purchase, packageDetails);
              console.log('Payment confirmation email sent successfully');
            } catch (emailError) {
              console.error('Error sending payment confirmation email:', emailError);
              console.error('Error stack:', emailError.stack);
              // Don't fail the webhook if email fails
            }
          } else {
            console.error('Cannot send email: User or user email is missing');
            console.error('Purchase user:', purchase.user);
          }
        } else {
          console.error('Purchase not found with ID:', purchaseId);
        }
      } else {
        console.error('No purchase ID in session metadata');
      }
      break;

    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object;
      // Find purchase by payment intent ID and update status
      await Purchases.update(
        { status: 'failed' },
        { where: { stripePaymentIntentId: paymentIntent.id } }
      );
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// Get purchase by ID
const getPurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchases.findByPk(id, {
      include: [
        { 
          model: User, 
          as: 'user',
          attributes: ['id', 'username', 'email', 'firstName', 'lastName'] 
        },
        { 
          model: Aranzhmanet, 
          as: 'aranzhmanet',
          attributes: ['id', 'titulli', 'cmimi'] 
        },
      ],
    });

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    res.json(purchase);
  } catch (error) {
    console.error('Error getting purchase:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all purchases for a user
const getUserPurchases = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchases.findAll({
      where: { userId },
      include: [
        { 
          model: Aranzhmanet, 
          as: 'aranzhmanet',
          attributes: ['id', 'titulli', 'cmimi', 'imageBase64'] 
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(purchases);
  } catch (error) {
    console.error('Error getting user purchases:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all purchases (for admin dashboard)
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchases.findAll({
      include: [
        { 
          model: User, 
          as: 'user',
          attributes: ['id', 'username', 'email', 'firstName', 'lastName'],
          required: false, // LEFT JOIN - nëse user nuk ekziston, purchase do të kthehet përsëri
        },
        { 
          model: Aranzhmanet, 
          as: 'aranzhmanet',
          attributes: ['id', 'titulli', 'cmimi', 'imageBase64'],
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // Debug: log first purchase to see structure
    if (purchases.length > 0) {
      console.log('First purchase sample:', JSON.stringify(purchases[0].toJSON(), null, 2));
    }

    res.json(purchases);
  } catch (error) {
    console.error('Error getting all purchases:', error);
    res.status(500).json({ error: error.message });
  }
};

// Verify payment status
const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.query;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const purchase = await Purchases.findOne({
      where: { stripeSessionId: sessionId },
      include: [
        { model: User, as: 'user' },
      ],
    });

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    const isPaid = session.payment_status === 'paid';
    const wasPending = purchase.status === 'pending';
    const shouldUpdateStatus = isPaid && wasPending;

    // Update status ONLY if payment is paid AND purchase was still pending
    // Don't update if already completed or if admin has already approved/rejected
    if (shouldUpdateStatus) {
      await purchase.update({
        status: 'completed',
        stripePaymentIntentId: session.payment_intent,
        // Don't touch adminApproved - it should remain null until admin acts
      });

      // Send payment confirmation email if webhook didn't send it
      // Only send if status was pending (meaning webhook might not have fired)
      if (purchase.user && purchase.user.email) {
        try {
          const packageDetails = purchase.packageDetails 
            ? (typeof purchase.packageDetails === 'string' 
                ? JSON.parse(purchase.packageDetails) 
                : purchase.packageDetails)
            : {};

          console.log('Sending payment confirmation email from verifyPayment endpoint');
          await sendPaymentConfirmationEmail(purchase.user, purchase, packageDetails);
        } catch (emailError) {
          console.error('Error sending payment confirmation email from verifyPayment:', emailError);
          // Don't fail the verification if email fails
        }
      }
    }

    // Reload purchase to get updated status
    await purchase.reload();

    res.json({
      status: isPaid ? 'completed' : purchase.status,
      session: {
        payment_status: session.payment_status,
        amount_total: session.amount_total,
      },
      purchase: {
        id: purchase.id,
        status: purchase.status,
        amount: purchase.amount,
        adminApproved: purchase.adminApproved,
      },
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: error.message });
  }
};

// Approve purchase (admin only)
const approvePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchases.findByPk(id, {
      include: [
        { model: User, as: 'user' },
      ],
    });
    
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    await purchase.update({
      adminApproved: true,
      status: 'completed',
    });

    // Send travel document email with PDF
    try {
      const packageDetails = purchase.packageDetails 
        ? (typeof purchase.packageDetails === 'string' 
            ? JSON.parse(purchase.packageDetails) 
            : purchase.packageDetails)
        : {};

      // Fetch airport/bus station info if needed
      if (purchase.aranzhmaniId) {
        const Airports = require('../models/airports');
        const BusStations = require('../models/busStations');
        
        const aranzhmanet = await Aranzhmanet.findByPk(purchase.aranzhmaniId, {
          include: [
            { model: Airports, attributes: ['emri', 'akronimi'] },
            { model: BusStations, attributes: ['emri', 'adresa'] },
          ],
        });

        if (aranzhmanet) {
          if (packageDetails.llojiTransportit === 'plane' && aranzhmanet.airport) {
            packageDetails.airport = `${aranzhmanet.airport.emri} (${aranzhmanet.airport.akronimi})`;
          } else if (packageDetails.llojiTransportit === 'bus' && aranzhmanet.busStation) {
            packageDetails.busStation = aranzhmanet.busStation.emri;
          }
        }
      }

      await sendTravelDocumentEmail(purchase.user, purchase, packageDetails);
    } catch (emailError) {
      console.error('Error sending travel document email:', emailError);
      // Don't fail the approval if email fails
    }

    res.json({ message: 'Purchase approved successfully', purchase });
  } catch (error) {
    console.error('Error approving purchase:', error);
    res.status(500).json({ error: error.message });
  }
};

// Reject purchase (admin only)
const rejectPurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchases.findByPk(id);
    
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    await purchase.update({
      adminApproved: false,
      status: 'refused',
    });

    res.json({ message: 'Purchase rejected successfully', purchase });
  } catch (error) {
    console.error('Error rejecting purchase:', error);
    res.status(500).json({ error: error.message });
  }
};

// Refund purchase (admin only)
const refundPurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchases.findByPk(id, {
      include: [
        { model: User, as: 'user' },
      ],
    });
    
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    // Check if purchase is already refunded
    if (purchase.status === 'refunded') {
      return res.status(400).json({ error: 'Purchase has already been refunded' });
    }

    // Check if purchase has a payment intent ID
    if (!purchase.stripePaymentIntentId) {
      return res.status(400).json({ error: 'No payment intent found for this purchase. Cannot process refund.' });
    }

    // Check if purchase status allows refund
    if (purchase.status !== 'completed' && purchase.status !== 'refused') {
      return res.status(400).json({ error: 'Only completed or refused purchases can be refunded' });
    }

    // Create refund in Stripe
    let refund;
    try {
      refund = await stripe.refunds.create({
        payment_intent: purchase.stripePaymentIntentId,
        amount: Math.round(parseFloat(purchase.amount) * 100), // Convert to cents
        reason: 'requested_by_customer',
      });
    } catch (stripeError) {
      console.error('Stripe refund error:', stripeError);
      return res.status(500).json({ 
        error: 'Failed to process refund with Stripe', 
        details: stripeError.message 
      });
    }

    // Update purchase status
    await purchase.update({
      status: 'refunded',
      adminApproved: false, // Reset admin approval on refund
    });

    // Send refund confirmation email
    if (purchase.user && purchase.user.email) {
      try {
        const packageDetails = purchase.packageDetails 
          ? (typeof purchase.packageDetails === 'string' 
              ? JSON.parse(purchase.packageDetails) 
              : purchase.packageDetails)
          : {};

        await sendRefundConfirmationEmail(purchase.user, purchase, packageDetails, refund);
      } catch (emailError) {
        console.error('Error sending refund confirmation email:', emailError);
        // Don't fail the refund if email fails
      }
    }

    res.json({ 
      message: 'Refund processed successfully', 
      purchase,
      refund: {
        id: refund.id,
        amount: refund.amount / 100, // Convert back from cents
        status: refund.status,
      }
    });
  } catch (error) {
    console.error('Error refunding purchase:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
  getPurchase,
  getUserPurchases,
  getAllPurchases,
  verifyPayment,
  approvePurchase,
  rejectPurchase,
  refundPurchase,
};

