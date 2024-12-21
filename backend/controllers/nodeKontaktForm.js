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
    return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme!' });
  }

  const mailOptions = {
    from: email,  
    to: 'travelbani48@gmail.com',  
    subject: 'Mesazh nga formulari i kontaktit',
    text: `
      Emri: ${name}
      Email: ${email}
      Numri: ${number}
      Mesazhi: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email u dërgua me sukses!' });
  } catch (error) {
    console.error('Gabim gjatë dërgimit të email-it:', error);
    res.status(500).json({ message: 'Gabim gjatë dërgimit të email-it.' });
  }
};

module.exports = { sendContactEmail };
