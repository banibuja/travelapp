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
const { 
  getAllAranzhmanet, updateAranzhmani, deleteAranzhmanet, addAranzhmanet
} = require('../controllers/aranzhmanetController');
const { 
  getAllAirports, addAirports, deleteAirport, updateAirport
} = require('../controllers/airportsController');
const { 
  getAllShtetet, addShtetet, deleteShtetet, updateShteti
} = require('../controllers/shtetetController');
const { 
  getAllHurghada, addCardHurgada, deleteHurgada, updateCardHurgada 
} = require('../controllers/hurghadasController');
const { 
  getAllKapodakia, addCardKapodakia, deleteKapodakia, updateCardKapodakia 
} = require('../controllers/kapodakiaCards');
const { 
  getAllQytetet, addQytetet, deleteQytetet, updateQytetet
} = require('../controllers/qytetetController');

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

// stamboll Cards routes
router.post('/add-cards', addCard);
router.get('/cards', getAllHotels);
router.delete('/cards-delete/:id', isAuthenticated, deleteHotel);
router.put('/cards-update/:id', isAuthenticated, updateCard);

//hurghada cards routes
router.post('/hurghada/add-cards', addCardHurgada);
router.get('/hurghada/cards', getAllHurghada);
router.delete('/hurghada/cards-delete/:id', isAuthenticated, deleteHurgada);
router.put('/hurghada/cards-update/:id', isAuthenticated, updateCardHurgada);

//kapodakia cards routes
router.post('/kapodakia/add-cards', addCardKapodakia);
router.get('/kapodakia/cards', getAllKapodakia);
router.delete('/kapodakia/cards-delete/:id', isAuthenticated, deleteKapodakia);
router.put('/kapodakia/cards-update/:id', isAuthenticated, updateCardKapodakia);


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
router.post('/add-dubai-price', isAuthenticated, addDubaiPrice);

router.post('/add-Aranzhmani', addAranzhmanet);
router.delete('/Aranzhmani-delete/:id', isAuthenticated, deleteAranzhmanet);
router.put('/Aranzhmani-update/:id', isAuthenticated, updateAranzhmani);
router.get('/aranzhmanet', getAllAranzhmanet);

router.post('/add-airports', addAirports);
router.delete('/airports-delete/:id', isAuthenticated, deleteAirport);
router.put('/airports-update/:id', isAuthenticated, updateAirport);
router.get('/airports', getAllAirports);

router.post('/add-shtetin', addShtetet);
router.delete('/shtetin-delete/:id', isAuthenticated, deleteShtetet);
router.put('/shtetin-update/:id', isAuthenticated, updateShteti);
router.get('/shtetet', getAllShtetet);

router.post('/add-qytetet', addQytetet);
router.delete('/qytetet-delete/:id', isAuthenticated, deleteQytetet);
router.put('/qytetet-update/:id', isAuthenticated, updateQytetet);
router.get('/qytetet', getAllQytetet);


module.exports = router;
