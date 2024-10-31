require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const flash = require('connect-flash');
const sequelize = require('./db'); 
const Item = require('./models/item'); 
const User = require('./models/user');
const { createItem, getItems, updateItem, deleteItem } = require('./controllers/itemController');

const app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Use 'secure: true' if using HTTPS
}));

// Initialize passport and session middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Configure Helmet for extra security headers
app.use(helmet());

// Configure rate limiting for DDoS protection
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));
app.use(bodyParser.json());

// Logging middleware to debug session and user
app.use((req, res, next) => {
  console.log('Session:', req.session);
  console.log('User:', req.user);
  next();
});

// Configure passport for local authentication
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { message: 'Përdoruesi nuk u gjet.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Fjalëkalimi është i gabuar.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Kërkohet autentifikimi.' });
};

app.get('/user', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Auth routes
app.post('/login', passport.authenticate('local', {
  successRedirect: '/items',
  failureRedirect: '/login',
  failureFlash: true
}));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hash, role: 'user' }); 
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'U çkyçët me sukses.' });
  });
});

// CRUD routes
app.post('/items', isAuthenticated, createItem);
app.get('/items', isAuthenticated, getItems);
app.put('/items/:id', isAuthenticated, updateItem);
app.delete('/items/:id', isAuthenticated, deleteItem);

const initializeDatabase = async () => {
  try {
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Serveri po punon në portin ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Gabim gjatë inicializimit të databazës:', error);
  }
};

initializeDatabase();
