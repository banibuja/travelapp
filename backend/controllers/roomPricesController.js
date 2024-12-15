const RoomPrices = require('../models/RoomPrices');

// Get all room prices
const getAllRoomPrices = async (req, res) => {
  try {
    const roomPrices = await RoomPrices.findAll();
    res.json(roomPrices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new room price
const addRoomPrice = async (req, res) => {
  const { room_type, service, price_1, price_2 } = req.body;

  try {
    const newRoomPrice = await RoomPrices.create({
      room_type,
      service,
      price_1,
      price_2
    });

    res.status(201).json({
      message: 'Room price added successfully',
      roomPrice: newRoomPrice
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding room price', error: error.message });
  }
};

// Delete room price
const deleteRoomPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const roomPrice = await RoomPrices.findByPk(id);
    if (!roomPrice) {
      return res.status(404).json({ error: 'Room price not found' });
    }
    await roomPrice.destroy();
    res.status(200).json({ message: 'Room price deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update room price
const updateRoomPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { room_type, service, price_1, price_2 } = req.body;
    const roomPrice = await RoomPrices.findByPk(id);
    if (!roomPrice) {
      return res.status(404).json({ error: 'Room price not found' });
    }

    roomPrice.room_type = room_type || roomPrice.room_type;
    roomPrice.service = service || roomPrice.service;
    roomPrice.price_1 = price_1 || roomPrice.price_1;
    roomPrice.price_2 = price_2 || roomPrice.price_2;

    await roomPrice.save();
    res.status(200).json(roomPrice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllRoomPrices, addRoomPrice, deleteRoomPrice, updateRoomPrice };
