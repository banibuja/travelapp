//nodeMailerController
require('dotenv').config();
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });
  
  const abonohu = async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: 'Ju lutem vendosni një email të vlefshëm!' });
    }
  
    const mailOptions = {
      from: 'travelbani48@gmail.com', 
      to: email, 
      subject: 'Abonimi juaj u realizua me sukses!',
      text: 'Jeni abonuar me sukses! Do të njoftoheni për ofertat më të mira çdo javë.',
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email u dërgua me sukses!' });
    } catch (error) {
      console.error('Gabim gjatë dërgimit të email-it:', error);
      res.status(500).json({ message: 'Gabim gjatë dërgimit të email-it.' });
    }
  };


  module.exports = { abonohu };
