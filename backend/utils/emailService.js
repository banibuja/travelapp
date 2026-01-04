require('dotenv').config();
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send payment confirmation email
const sendPaymentConfirmationEmail = async (user, purchase, packageDetails) => {
  try {
    if (!user || !user.email) {
      throw new Error('User or user email is missing');
    }

    console.log('Preparing payment confirmation email for:', user.email);

    const mailOptions = {
      from: process.env.EMAIL_USER || 'travelbani48@gmail.com',
      to: user.email,
      subject: 'Payment Successful! - TravelApp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">Payment Confirmed Successfully!</h2>
          <p>Hello <strong>${user.firstName || ''} ${user.lastName || ''}</strong>,</p>
          <p>Thank you for your payment! Your reservation has been confirmed.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a87; margin-top: 0;">Reservation Details:</h3>
            <p><strong>Package:</strong> ${packageDetails.titulli || 'N/A'}</p>
            <p><strong>Destination:</strong> ${packageDetails.shteti || 'N/A'}</p>
            <p><strong>Number of Travelers:</strong> ${packageDetails.nrPersonave || 'N/A'}</p>
            <p><strong>Number of Nights:</strong> ${packageDetails.nrNeteve || 'N/A'}</p>
            <p><strong>Departure Date:</strong> ${packageDetails.dataNisjes || 'N/A'}</p>
            <p><strong>Return Date:</strong> ${packageDetails.dataKthimit || 'N/A'}</p>
            <p><strong>Amount:</strong> €${parseFloat(purchase.amount).toFixed(2)}</p>
            <p><strong>Status:</strong> ${purchase.status}</p>
          </div>
          
          <p>Your reservation will be reviewed by our staff and you will receive a confirmation email with your travel document after approval.</p>
          
          <p>Best regards,<br>The TravelApp Team</p>
        </div>
      `,
    };

    // console.log('Sending email with options:', { // Disabled for cleaner logs
    //   from: mailOptions.from,
    //   to: mailOptions.to,
    //   subject: mailOptions.subject,
    // });

    const result = await transporter.sendMail(mailOptions);
    // console.log('Payment confirmation email sent successfully to:', user.email); // Disabled for cleaner logs
    // console.log('Email result:', result.messageId); // Disabled for cleaner logs
    return result;
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      user: user ? { email: user.email, id: user.id } : 'NO USER',
    });
    throw error;
  }
};

// Generate travel document PDF
const generateTravelDocumentPDF = (purchase, user, packageDetails) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const pdfPath = path.join(__dirname, '../temp', `travel_document_${purchase.id}_${Date.now()}.pdf`);
      
      // Ensure temp directory exists
      const tempDir = path.dirname(pdfPath);
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Header
      doc.fontSize(20)
         .fillColor('#1e3a5f')
         .text('TRAVEL DOCUMENT', { align: 'center' })
         .moveDown();

      doc.fontSize(12)
         .fillColor('#2d5a87')
         .text('TravelApp - Travel Authorization', { align: 'center' })
         .moveDown(2);

      // Document Number
      doc.fontSize(10)
         .fillColor('#000000')
         .text(`Document Number: TRAV-${purchase.id}-${Date.now()}`, { align: 'right' })
         .moveDown();

      // Traveler Information
      doc.fontSize(14)
         .fillColor('#1e3a5f')
         .text('TRAVELER INFORMATION', { underline: true })
         .moveDown();

      doc.fontSize(11)
         .fillColor('#000000')
         .text(`Name: ${user.firstName} ${user.lastName}`)
         .text(`Email: ${user.email}`)
         .text(`Username: ${user.username || 'N/A'}`)
         .moveDown();

      // Package Information
      doc.fontSize(14)
         .fillColor('#1e3a5f')
         .text('PACKAGE INFORMATION', { underline: true })
         .moveDown();

      doc.fontSize(11)
         .fillColor('#000000')
         .text(`Package: ${packageDetails.titulli || 'N/A'}`)
         .text(`Destination: ${packageDetails.shteti || 'N/A'}`)
         .text(`Travelers: ${packageDetails.nrPersonave || 'N/A'} Adults`)
         .text(`Nights: ${packageDetails.nrNeteve || 'N/A'} Nights`)
         .text(`Room Type: ${packageDetails.llojiDhomes || 'N/A'}`)
         .text(`Service: ${packageDetails.sherbimi || 'N/A'}`)
         .text(`Departure Date: ${packageDetails.dataNisjes || 'N/A'}`)
         .text(`Return Date: ${packageDetails.dataKthimit || 'N/A'}`)
         .moveDown();

      // Transport Information
      if (packageDetails.llojiTransportit) {
        doc.fontSize(14)
           .fillColor('#1e3a5f')
           .text('TRANSPORT INFORMATION', { underline: true })
           .moveDown();

        doc.fontSize(11)
           .fillColor('#000000')
           .text(`Transport Type: ${packageDetails.llojiTransportit.toUpperCase()}`);

        if (packageDetails.llojiTransportit === 'plane' && packageDetails.airport) {
          doc.text(`Airport: ${packageDetails.airport}`);
        } else if (packageDetails.llojiTransportit === 'bus' && packageDetails.busStation) {
          doc.text(`Bus Station: ${packageDetails.busStation}`);
        }
        doc.moveDown();
      }

      // Payment Information
      doc.fontSize(14)
         .fillColor('#1e3a5f')
         .text('PAYMENT INFORMATION', { underline: true })
         .moveDown();

      doc.fontSize(11)
         .fillColor('#000000')
         .text(`Amount Paid: €${parseFloat(purchase.amount).toFixed(2)}`)
         .text(`Payment Method: ${purchase.paymentMethod || 'Stripe'}`)
         .text(`Purchase ID: #${purchase.id}`)
         .text(`Status: ${purchase.status.toUpperCase()}`)
         .text(`Approved: ${purchase.adminApproved ? 'YES' : 'NO'}`)
         .moveDown();

      // Authorization
      doc.fontSize(14)
         .fillColor('#1e3a5f')
         .text('AUTHORIZATION', { underline: true })
         .moveDown();

      doc.fontSize(11)
         .fillColor('#000000')
         .text('This document serves as official confirmation of your travel booking.')
         .text('Please present this document when traveling.')
         .moveDown();

      doc.fontSize(10)
         .fillColor('#666666')
         .text(`Generated on: ${new Date().toLocaleString()}`)
         .text(`Valid for travel from ${packageDetails.dataNisjes || 'N/A'} to ${packageDetails.dataKthimit || 'N/A'}`)
         .moveDown();

      // Footer
      doc.fontSize(9)
         .fillColor('#999999')
         .text('This is an official travel document issued by TravelApp.', { align: 'center' })
         .text('For inquiries, please contact: travelbani48@gmail.com', { align: 'center' });

      // Finalize PDF
      doc.end();

      // Save PDF to file
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      stream.on('finish', () => {
        resolve(pdfPath);
      });

      stream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Send travel document email with PDF attachment
const sendTravelDocumentEmail = async (user, purchase, packageDetails) => {
  try {
    // Generate PDF
    const pdfPath = await generateTravelDocumentPDF(purchase, user, packageDetails);

    const mailOptions = {
      from: process.env.EMAIL_USER || 'travelbani48@gmail.com',
      to: user.email,
      subject: 'Your Travel Document - TravelApp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">Your Reservation Has Been Approved!</h2>
          <p>Hello <strong>${user.firstName} ${user.lastName}</strong>,</p>
          <p>Your reservation has been approved successfully! Please find your travel document attached.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a87; margin-top: 0;">Reservation Details:</h3>
            <p><strong>Package:</strong> ${packageDetails.titulli || 'N/A'}</p>
            <p><strong>Destination:</strong> ${packageDetails.shteti || 'N/A'}</p>
            <p><strong>Departure Date:</strong> ${packageDetails.dataNisjes || 'N/A'}</p>
            <p><strong>Return Date:</strong> ${packageDetails.dataKthimit || 'N/A'}</p>
          </div>
          
          <p><strong>Please print or save this document for your trip.</strong></p>
          <p>This document is required for traveling by ${packageDetails.llojiTransportit === 'plane' ? 'plane' : 'bus'}.</p>
          
          <p>Best regards,<br>The TravelApp Team</p>
        </div>
      `,
      attachments: [
        {
          filename: `Travel_Document_${purchase.id}.pdf`,
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log(`Travel document email sent to ${user.email}`);

    // Delete temporary PDF file after sending
    setTimeout(() => {
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    }, 5000);

    return true;
  } catch (error) {
    console.error('Error sending travel document email:', error);
    throw error;
  }
};

// Send refund confirmation email
const sendRefundConfirmationEmail = async (user, purchase, packageDetails, refund) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'travelbani48@gmail.com',
      to: user.email,
      subject: 'Refund Processed Successfully! - TravelApp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">Refund Processed Successfully!</h2>
          <p>Hello <strong>${user.firstName} ${user.lastName}</strong>,</p>
          <p>The refund for your reservation has been processed successfully.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a87; margin-top: 0;">Refund Details:</h3>
            <p><strong>Package:</strong> ${packageDetails.titulli || 'N/A'}</p>
            <p><strong>Destination:</strong> ${packageDetails.shteti || 'N/A'}</p>
            <p><strong>Refund Amount:</strong> €${parseFloat(purchase.amount).toFixed(2)}</p>
            <p><strong>Refund Status:</strong> ${refund.status}</p>
            <p><strong>Refund ID:</strong> ${refund.id}</p>
            <p><strong>Purchase ID:</strong> #${purchase.id}</p>
          </div>
          
          <p>The funds will be returned to your original payment method within 5-10 business days, depending on your bank.</p>
          
          <p>If you have any questions, please contact us.</p>
          
          <p>Best regards,<br>The TravelApp Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Refund confirmation email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending refund confirmation email:', error);
    throw error;
  }
};

module.exports = {
  sendPaymentConfirmationEmail,
  sendTravelDocumentEmail,
  generateTravelDocumentPDF,
  sendRefundConfirmationEmail,
};

