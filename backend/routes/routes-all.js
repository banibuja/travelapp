const express = require('express');
const { 
  registerUser, loginUser, getUsers, deleteUser, updateUser, verifyRole, countUsers 
} = require('../controllers/userController');
const { 
  getAllTravelPlans, addTravelPlan, deleteTravelPlan, updateTravelPlan 
} = require('../controllers/travelController');
const { 
  getAllRoomPrices, addRoomPrice, deleteRoomPrice, updateRoomPrice 
} = require('../controllers/roomPricesController');
const { 
  getAllDubaiPrices, addDubaiPrice, deleteDubaiPrice, updateDubaiPrice 
} = require('../controllers/dubaiPricesController');
const { 
  getAllImages, addImage, deleteImage, updateImage 
} = require('../controllers/sliderHomeController');
const { 
  getAllHotels, addCard, deleteHotel, updateCard 
} = require('../controllers/stambollCardsController');

const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');

// User routes
router.post('/register', registerUser);
router.post('/login', (req, res, next) => loginUser(req, res, next));
router.get('/users-get', isAuthenticated, getUsers);
router.delete('/users/:id', isAuthenticated, deleteUser);
router.put('/users/:id', isAuthenticated, updateUser);
router.get('/users-count', isAuthenticated, countUsers);

// Travel plans routes
router.post('/travel-plans', isAuthenticated, addTravelPlan);
router.get('/travel-plans', getAllTravelPlans);
router.delete('/travel-plans/:id', isAuthenticated, deleteTravelPlan);
router.put('/travel-plans/:id', isAuthenticated, updateTravelPlan);

// Images routes
router.post('/add-images', addImage);
router.get('/images', getAllImages);
router.delete('/images-delete/:id', isAuthenticated, deleteImage);
router.put('/images-update/:id', isAuthenticated, updateImage);

// Cards routes
router.post('/add-cards', addCard);
router.get('/cards', getAllHotels);
router.delete('/cards-delete/:id', isAuthenticated, deleteHotel);
router.put('/cards-update/:id', isAuthenticated, updateCard);

// Room prices routes
router.post('/add-room-price', isAuthenticated, addRoomPrice);
router.get('/room-price', getAllRoomPrices);
router.delete('/room-prices-delete/:id', isAuthenticated, deleteRoomPrice);
router.put('/room-prices-update/:id', isAuthenticated, updateRoomPrice);

// Dubai prices routes
router.post('/add-dubai-price', isAuthenticated, addDubaiPrice);
router.get('/dubai-price', getAllDubaiPrices);
router.delete('/dubai-prices-delete/:id', isAuthenticated, deleteDubaiPrice);
router.put('/dubai-prices-update/:id', isAuthenticated, updateDubaiPrice);

module.exports = router;