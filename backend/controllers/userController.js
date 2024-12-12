const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const passport = require('passport'); 


const registerUser = async (req, res) => {
  const { firstName, lastName, number, email, username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      number,
      email,
      username,
      password: hash,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: 'Login i dështuar. Provoni përsëri.' });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          process.env.JWT_SECRET || 'supersecret',
          { expiresIn: '24h' }
        );
        res.cookie('ubtsecured', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'strict',
        });
        res.status(200).json({ message: 'Login i suksesshëm', user });
      });
    })(req, res, next);
  };

  const getUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // updateUser handler
  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, number } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.number = number || user.number;
  
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const verifyRole = (role) => {
    return (req, res, next) => {
      const token = req.cookies.ubtsecured;
      
      if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
  
      jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden' });
        }
  
        if (decoded.role !== role) {
          return res.status(403).json({ message: 'Access forbidden' });
        }
  
        req.user = decoded;
        next();
      });
    };
  };

  const countUsers = async (req, res) => {
    try {
      const userCount = await User.count(); 
      res.status(200).json({ count: userCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { registerUser, loginUser, getUsers, deleteUser, updateUser, verifyRole, countUsers };

