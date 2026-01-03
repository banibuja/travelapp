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
      return res.status(400).json({ message: 'Please enter a valid email address!' });
    }
  
    const mailOptions = {
      from: process.env.EMAIL_USER || 'travelbani48@gmail.com', 
      to: email, 
      subject: 'Subscription Successful! - TravelApp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">Subscription Successful!</h2>
          <p>Hello,</p>
          <p>You have successfully subscribed to our newsletter! You will be notified about the best offers every week.</p>
          <p>Thank you for choosing TravelApp!</p>
          <p>Best regards,<br>The TravelApp Team</p>
        </div>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending subscription email:', error);
      res.status(500).json({ message: 'Error sending email.' });
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
        return res.status(400).json({ message: 'All fields are required!' });
      }
  
      const staffEmailOptions = {
        from: process.env.EMAIL_USER || 'travelbani48@gmail.com',
        to: 'travelbani48@gmail.com',
        subject: 'New Reservation - TravelApp',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a5f;">New Reservation</h2>
            <p>A new offer has been reserved by client: <strong>${username}</strong></p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d5a87; margin-top: 0;">Reservation Details:</h3>
              <p><strong>Title:</strong> ${item.titulli}</p>
              <p><strong>Price:</strong> €${item.cmimi}.00</p>
              <p><strong>Details:</strong> ${item.nrNeteve} nights, ${item.nrPersonave} adults, ${item.shteti}</p>
            </div>
          </div>
        `,
      };
  
      const userEmailOptions = {
        from: process.env.EMAIL_USER || 'travelbani48@gmail.com',
        to: userEmail, 
        subject: 'Reservation Confirmed - TravelApp',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a5f;">Reservation Confirmed</h2>
            <p>Hello <strong>${username}</strong>,</p>
            <p>You have reserved the following offer:</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d5a87; margin-top: 0;">Reservation Details:</h3>
              <p><strong>Title:</strong> ${item.titulli}</p>
              <p><strong>Price:</strong> €${item.cmimi}.00</p>
            </div>
            
            <p>Thank you for choosing our services!</p>
            <p>Best regards,<br>The TravelApp Team</p>
          </div>
        `,
      };
  
      // Send emails
      await transporter.sendMail(staffEmailOptions);
      await transporter.sendMail(userEmailOptions);
  
      res.status(200).json({ message: 'Reservation completed successfully!' });
    } catch (error) {
      console.error('Error sending reservation email:', error);
      res.status(500).json({ message: 'Error sending email.' });
    }
  };


  module.exports = { abonohu, reserveOffer };
