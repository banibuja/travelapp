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
const routes = require('./routes/routes-all');

const app = express();
app.set('trust proxy', 1);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, 
//   max: 500, 
// });
// app.use(limiter);

// app.use((req, res, next) => {
//   if (req.ip === '127.0.0.1') {
//     return next(); 
//   }
//   limiter(req, res, next);
// });

// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 200, 
// });

// app.use('/api/auth', authLimiter);


// Set security headers
// app.use(helmet());

// CORS setup

const corsOptions = {
  origin: function (origin, callback) {
    // For development, allow any origin
    console.log("Request Origin:", origin); // Log the origin for debugging
    callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// app.options('*', cors()); 



// Middleware for parsing request bodies
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Middleware for handling cookies, sessions, and flash messages
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// app.use((req, res, next) => {
//   console.log('Request Origin:', req.headers.origin);
//   console.log('Request Headers:', req.headers);
//   next();
// });

app.use(flash());

// Passport.js setup for authentication
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

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   if (req.headers.origin && req.headers.origin !== 'http://localhost:3000') {
//     return res.status(403).json({ error: "Forbidden: Invalid origin" });
//   }
//   next();
// });

// Routes
app.use('/api', routes);

const isAuthenticated = (req, res, next) => {
  // const token = req.cookies['ubtsecured'];
  // if (!token) {
  //   return res.status(401).json({ error: 'Kërkohet autentifikimi.' });
  // }
  // jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
  //   if (err) {
  //     return res.status(403).json({ error: 'Token i pavlefshëm.' });
  //   }
  //   req.user = user;
  next();
  // });
};

// Example routes
app.get('/user', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

app.get('/', (req, res) => {
  res.json('user');
});

app.post('/logout', (req, res) => {
  res.clearCookie('ubtsecured', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'U çkyçët me sukses.' });
  });
});


const initializeDatabase = async () => {
  try {
    await sequelize.sync();
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Serveri po punon në portin ${PORT}`);
    });
  } catch (error) {
    console.error('Gabim gjatë inicializimit të databazës:', error);
  }
};

initializeDatabase();



// Global error handling
process.on('uncaughtException', (error) => {
  console.error('Unhandled Exception:', error.message);
  process.exit(1); // Force server exit on uncaught exceptions
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1); // Force server exit on unhandled promise rejections
});