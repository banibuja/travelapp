require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Purchases = require('../models/purchases');
const User = require('../models/user');
const Aranzhmanet = require('../models/Aranzhmanet');

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

      if (purchaseId) {
        await Purchases.update(
          {
            status: 'completed',
            stripePaymentIntentId: session.payment_intent,
          },
          { where: { id: purchaseId } }
        );
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
    });

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    res.json({
      status: session.payment_status === 'paid' ? 'completed' : purchase.status,
      session: {
        payment_status: session.payment_status,
        amount_total: session.amount_total,
      },
      purchase: {
        id: purchase.id,
        status: purchase.status,
        amount: purchase.amount,
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
    const purchase = await Purchases.findByPk(id);
    
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    await purchase.update({
      adminApproved: true,
      status: 'completed',
    });

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

module.exports = {
  createCheckoutSession,
  handleWebhook,
  getPurchase,
  getUserPurchases,
  getAllPurchases,
  verifyPayment,
  approvePurchase,
  rejectPurchase,
};

