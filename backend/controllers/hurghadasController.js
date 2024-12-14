// controllers/hotelController.js
const Hurghada = require('../models/HurghadaCards');



const getAllHurghada = async (req, res) => {

  console.log(req.body)
  try {
    const hurghada = await Hurghada.findAll();
    res.json(hurghada);
    console.log(req.body)

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new hotel
const addCardHurgada = async (req, res) => {
  const { title, description, price, imageBase64 } = req.body; // Include price

  try {
    if (!title || !description || !price || !imageBase64) {
      return res.status(400).json({ message: 'Title, description, price, and image are required' });
    }

    const newCard = await Hurghada.create({
      name: title,
      location: description,
      price,
      imageBase64,
    });

    res.status(201).json({
      message: 'Card added successfully',
      card: newCard,
    });
  } catch (error) {
    console.error('Error adding card:', error);
    res.status(500).json({ message: 'Error adding card', error: error.message });
  }
};



// Delete a hotel by ID
const deleteHurgada = async (req, res) => {
  try {
    const { id } = req.params;
    const hurghada = await Hurghada.findByPk(id);

    if (!hurghada) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    await hurghada.destroy();
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCardHurgada = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price, imageBase64 } = req.body;

    // Find the card in the database
    const card = await Hurghada.findByPk(id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Update the card details
    card.name = name;
    card.location = location;
    card.price = price;  
    if (imageBase64) {
      card.imageBase64 = imageBase64;
    }

    await card.save();

    res.status(200).json({ message: 'Card updated successfully', card });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
getAllHurghada,
addCardHurgada,
deleteHurgada,
updateCardHurgada,
};
