const express = require('express');
const {
  registerUser, loginUser, getUsers, deleteUser, updateUser, verifyRole, countUsers, registerUserForm, requestPasswordReset, resetPassword
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
  getAllMaqedoniPrices, addMaqedoniPrices, deleteMaqedoniPrices, updateMaqedoniPrices
} = require('../controllers/maqedoniPricesController');
const {
  getAllImages, addImage, deleteImage, updateImage
} = require('../controllers/sliderHomeController');
const {
  getAllHotels, addCard, deleteHotel, updateCard
} = require('../controllers/stambollCardsController');
const {
  getAllAranzhmanet, updateAranzhmani, deleteAranzhmanet, addAranzhmanet, countAranzhmanet
} = require('../controllers/aranzhmanetController');
const {
  getAllAirports, addAirports, deleteAirport, updateAirport, getAirportsByShtetiId
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

const { getLogs
} = require('../controllers/logController');
const { subscribe
} = require('../controllers/nodeMailerController');

const {
  getAllGreqiImages, addGreqiImage, deleteGreqiImage,
} = require('../controllers/GreqiSlider');

const {
  getAllImagesBullgari, addImageBullgari, deleteImageBullgari, updateImageBullgari
} = require('../controllers/bullgariController');


const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');


const { abonohu, reserveOffer
} = require('../controllers/nodeMailerController');


const { sendContactEmail
} = require('../controllers/nodeKontaktForm');

router.post('/reserveOffer', reserveOffer);
router.post('/abonohu', abonohu);

router.post('/contact', sendContactEmail);



// User routes
router.post('/register', registerUser);
router.post('/AddUser', isAuthenticated, registerUser);
router.post('/registerForm', registerUserForm);
router.post('/login', (req, res, next) => loginUser(req, res, next));
router.get('/users-get', isAuthenticated, getUsers);
router.delete('/users/:id', isAuthenticated, deleteUser);
router.put('/users/:id', isAuthenticated, updateUser);
router.get('/users-count', isAuthenticated, countUsers);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

router.get('/logs', getLogs); // Fetch all logs


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


router.post('/bullgari/add-images', addImageBullgari);
router.get('/bullgari/images', getAllImagesBullgari);
router.delete('/bullgari/images-delete/:id', isAuthenticated, deleteImageBullgari);
router.put('/bullgari/images-update/:id', isAuthenticated, updateImageBullgari);

// stamboll Cards routes
router.post('/add-cards', isAuthenticated, addCard);
router.get('/cards', getAllHotels);
router.delete('/cards-delete/:id', isAuthenticated, deleteHotel);
router.put('/cards-update/:id', isAuthenticated, updateCard);

//hurghada cards routes
router.post('/hurghada/add-cards', isAuthenticated, addCardHurgada);
router.get('/hurghada/cards', getAllHurghada);
router.delete('/hurghada/cards-delete/:id', isAuthenticated, deleteHurgada);
router.put('/hurghada/cards-update/:id', isAuthenticated, updateCardHurgada);

//kapodakia cards routes
router.post('/kapodakia/add-cards', isAuthenticated, addCardKapodakia);
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

//Maqedoni prices routes
router.post('/add-maqedoni-price', isAuthenticated, addMaqedoniPrices);
router.get('/maqedoni-price', getAllMaqedoniPrices);
router.delete('/maqedoni-prices-delete/:id', isAuthenticated, deleteMaqedoniPrices);
router.put('/maqedoni-prices-update/:id', isAuthenticated, updateMaqedoniPrices);
router.post('/add-maqedoni-price', isAuthenticated, addMaqedoniPrices);

router.post('/add-Aranzhmani', addAranzhmanet);
router.delete('/Aranzhmani-delete/:id', isAuthenticated, deleteAranzhmanet);
router.put('/Aranzhmani-update/:id', isAuthenticated, updateAranzhmani);
router.get('/aranzhmanet', getAllAranzhmanet);
router.get('/aranzhmanet/count', countAranzhmanet);


router.post('/add-airports', addAirports);
router.delete('/airports-delete/:id', isAuthenticated, deleteAirport);
router.put('/airports-update/:id', isAuthenticated, updateAirport);
router.get('/airports', getAllAirports);
router.get('/airports/by-shteti/:shtetiId', getAirportsByShtetiId);

router.post('/add-shtetin', addShtetet);
router.delete('/shtetin-delete/:id', isAuthenticated, deleteShtetet);
router.put('/shtetin-update/:id', isAuthenticated, updateShteti);
router.get('/shtetet', getAllShtetet);

router.post('/add-qytetet', addQytetet);
router.delete('/qytetet-delete/:id', isAuthenticated, deleteQytetet);
router.put('/qytetet-update/:id', isAuthenticated, updateQytetet);
router.get('/qytetet', getAllQytetet);

router.post('/add-greqi-image', addGreqiImage);
router.delete('/greqi-image-delete/:id', isAuthenticated, deleteGreqiImage);
router.get('/greqi-images', getAllGreqiImages);

module.exports = router;
