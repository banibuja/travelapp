//nodeMailerController
require('dotenv').config();
const nodemailer = require('nodemailer');
const User = require('../models/user'); 



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

  const reserveOffer = async (req, res) => {
    const { item, userId } = req.body;
  
    try {
      const user = await User.findOne({ where: { id: userId } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
  
      const userEmail = user.email;
      const username = user.username;  

      if (!item || !userEmail) {
        return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme!' });
      }
  
      const staffEmailOptions = {
        from: process.env.EMAIL_USER,
        to: 'travelbani48@gmail.com',
        subject: 'Rezervim i ri',
        text: `Ofertë e rezervuar nga klienti: ${username}
          Titulli: ${item.titulli}
          Çmimi: €${item.cmimi}.00
          Detaje: ${item.nrNeteve} netë, ${item.nrPersonave} të rritur, ${item.shteti}`,
      };
  
      const userEmailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail, 
        subject: 'Rezervim i konfirmuar',
        text: `Ju keni rezervuar këtë ofertë:
          Titulli: ${item.titulli}
          Çmimi: €${item.cmimi}.00
          Ju faleminderit që zgjodhët shërbimet tona!`,
      };
  
      // Send emails
      await transporter.sendMail(staffEmailOptions);
      await transporter.sendMail(userEmailOptions);
  
      res.status(200).json({ message: 'Rezervimi u krye me sukses!' });
    } catch (error) {
      console.error('Gabim gjatë dërgimit të email-it:', error);
      res.status(500).json({ message: 'Gabim gjatë dërgimit të email-it.' });
    }
  };


  module.exports = { abonohu, reserveOffer };
