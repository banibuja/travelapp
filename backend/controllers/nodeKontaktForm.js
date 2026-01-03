// nodeMailerController.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactEmail = async (req, res) => {
  const { name, number, email, message } = req.body;

  if (!name || !number || !email || !message) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER || 'travelbani48@gmail.com',
    replyTo: email,
    to: 'travelbani48@gmail.com',
    subject: 'New Contact Form Message - TravelApp',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">New Contact Form Submission</h2>
        <p>You have received a new message from the contact form:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2d5a87; margin-top: 0;">Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${number}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #1e3a5f; margin-top: 10px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        
        <p style="color: #666; font-size: 12px;">You can reply directly to this email to respond to ${name}.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ message: 'Error sending email.' });
  }
};

module.exports = { sendContactEmail };
