require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const User = require('./models/user');
// const axios = require('axios');

// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } }); 

const { registerUser, loginUser, getUsers, deleteUser, updateUser, verifyRole  } = require('./controllers/userController');
const { getAllTravelPlans, addTravelPlan, deleteTravelPlan, updateTravelPlan  } = require('./controllers/travelController');
const { getAllRoomPrices, addRoomPrice, deleteRoomPrice, updateRoomPrice  } = require('./controllers/roomPricesController');
const { getAllDubaiPrices, addDubaiPrice, deleteDubaiPrice, updateDubaiPrice  } = require('./controllers/dubaiPricesController');
const { getAllImages, addImage, deleteImage, updateImage  } = require('./controllers/sliderHomeController');

const { getAllHotels, addCard, deleteHotel, updateCard  } = require('./controllers/stambollCardsController');


const app = express();



const allowedOrigin = "http://localhost:3000";

const originWhitelistMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  if (origin === allowedOrigin) {
    next(); // Allow the request
  } else {
    res.status(403).json({ error: "Forbidden: Invalid origin" });
  }
};

app.use(originWhitelistMiddleware);

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use(limiter);

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(bodyParser.json());
app.use(cookieParser());




// Logging middleware to debug session and user
app.use((req, res, next) => {
  // console.log('Session:', req.session);
  // console.log('User:', req.user);
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

// Middleware to ensure the user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.cookies['ubtsecured'];
  if (!token) {
    return res.status(401).json({ error: 'Kërkohet autentifikimi.' });
  }
  jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token i pavlefshëm.' });
    }
    req.user = user;
    next();
  });
};



// Route to get the logged-in user's information
app.get('/user', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});




// Logout route
app.post('/logout', (req, res) => {
  res.clearCookie('ubtsecured', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'U çkyçët me sukses.' });
  });
});

// Check session or authentication status
app.get('/check-session', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ message: 'User is logged in' });
  } else {
    return res.status(401).json({ message: 'User not logged in' });
  }
});



app.post('/register', registerUser);
app.post('/login', (req, res, next) => loginUser(req, res, next));
app.get('/users-get', isAuthenticated, getUsers);
app.delete('/users/:id', isAuthenticated, deleteUser);
app.put('/users/:id', isAuthenticated, updateUser);
// app.use('/manage-user', verifyRole('admin'));


app.post('/travel-plans', isAuthenticated ,  addTravelPlan);
app.get('/travel-plans', getAllTravelPlans);
app.delete('/travel-plans/:id', isAuthenticated , deleteTravelPlan);
app.put('/travel-plans/:id', isAuthenticated , updateTravelPlan);


app.post('/add-images', addImage);
app.get('/images', isAuthenticated , getAllImages);
app.delete('/images-delete/:id', isAuthenticated , deleteImage);
app.put('/images-update/:id', isAuthenticated , updateImage);

app.post('/add-cards', addCard);
app.get('/cards', isAuthenticated , getAllHotels);
app.delete('/cards-delete/:id', isAuthenticated , deleteHotel);
app.put('/cards-update/:id', isAuthenticated , updateCard);

app.post('/add-room-price', isAuthenticated , addRoomPrice);
app.get('/room-price', isAuthenticated , getAllRoomPrices);
app.delete('/room-prices-delete/:id', isAuthenticated , deleteRoomPrice);
app.put('/room-prices-update/:id', isAuthenticated , updateRoomPrice);

app.post('/add-dubai-price', isAuthenticated , addDubaiPrice);
app.get('/dubai-price', isAuthenticated , getAllDubaiPrices);
app.delete('/dubai-prices-delete/:id', isAuthenticated , deleteDubaiPrice);
app.put('/dubai-prices-update/:id', isAuthenticated , updateDubaiPrice);



// Initialize server and ensure database and table creation
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
