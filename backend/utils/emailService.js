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
      subject: 'Pagesa u krye me sukses! - TravelApp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">Pagesa u konfirmua me sukses!</h2>
          <p>Përshëndetje <strong>${user.firstName || ''} ${user.lastName || ''}</strong>,</p>
          <p>Faleminderit për pagesën tuaj! Rezervimi juaj është konfirmuar.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a87; margin-top: 0;">Detajet e rezervimit:</h3>
            <p><strong>Paketa:</strong> ${packageDetails.titulli || 'N/A'}</p>
            <p><strong>Destinacioni:</strong> ${packageDetails.shteti || 'N/A'}</p>
            <p><strong>Numri i personave:</strong> ${packageDetails.nrPersonave || 'N/A'}</p>
            <p><strong>Numri i netëve:</strong> ${packageDetails.nrNeteve || 'N/A'}</p>
            <p><strong>Data e nisjes:</strong> ${packageDetails.dataNisjes || 'N/A'}</p>
            <p><strong>Data e kthimit:</strong> ${packageDetails.dataKthimit || 'N/A'}</p>
            <p><strong>Shuma:</strong> €${parseFloat(purchase.amount).toFixed(2)}</p>
            <p><strong>Status:</strong> ${purchase.status}</p>
          </div>
          
          <p>Rezervimi juaj do të shqyrtoret nga stafi ynë dhe do të merrni një email konfirmimi me dokumentin e udhëtimit pas aprovimit.</p>
          
          <p>Me respekt,<br>Ekipi i TravelApp</p>
        </div>
      `,
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const result = await transporter.sendMail(mailOptions);
    console.log('Payment confirmation email sent successfully to:', user.email);
    console.log('Email result:', result.messageId);
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
      subject: 'Dokumenti juaj i udhëtimit - TravelApp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">Rezervimi juaj u aprovua!</h2>
          <p>Përshëndetje <strong>${user.firstName} ${user.lastName}</strong>,</p>
          <p>Rezervimi juaj është aprovuar me sukses! Në bashkëngjitje gjeni dokumentin tuaj të udhëtimit.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a87; margin-top: 0;">Detajet e rezervimit:</h3>
            <p><strong>Paketa:</strong> ${packageDetails.titulli || 'N/A'}</p>
            <p><strong>Destinacioni:</strong> ${packageDetails.shteti || 'N/A'}</p>
            <p><strong>Data e nisjes:</strong> ${packageDetails.dataNisjes || 'N/A'}</p>
            <p><strong>Data e kthimit:</strong> ${packageDetails.dataKthimit || 'N/A'}</p>
          </div>
          
          <p><strong>Ju lutem printoni ose ruani këtë dokument për udhëtimin tuaj.</strong></p>
          <p>Ky dokument është i nevojshëm për të udhëtuar me ${packageDetails.llojiTransportit === 'plane' ? 'aeroplan' : 'autobus'}.</p>
          
          <p>Me respekt,<br>Ekipi i TravelApp</p>
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
      subject: 'Rimbursimi u krye me sukses! - TravelApp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">Rimbursimi u krye me sukses!</h2>
          <p>Përshëndetje <strong>${user.firstName} ${user.lastName}</strong>,</p>
          <p>Rimbursimi për rezervimin tuaj është procesuar me sukses.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a87; margin-top: 0;">Detajet e rimbursimit:</h3>
            <p><strong>Paketa:</strong> ${packageDetails.titulli || 'N/A'}</p>
            <p><strong>Destinacioni:</strong> ${packageDetails.shteti || 'N/A'}</p>
            <p><strong>Shuma e rimbursuar:</strong> €${parseFloat(purchase.amount).toFixed(2)}</p>
            <p><strong>Status i rimbursimit:</strong> ${refund.status}</p>
            <p><strong>ID e rimbursimit:</strong> ${refund.id}</p>
            <p><strong>Purchase ID:</strong> #${purchase.id}</p>
          </div>
          
          <p>Paratë do të kthehen në kartën tuaj brenda 5-10 ditëve të punës, në varësi të bankës suaj.</p>
          
          <p>Nëse keni pyetje, ju lutem na kontaktoni.</p>
          
          <p>Me respekt,<br>Ekipi i TravelApp</p>
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

