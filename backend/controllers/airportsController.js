const Airports = require('../models/airports');
const Shtetet = require('../models/shtetet');

// Get all Airports
const getAllAirports = async (req, res) => {
  try {
    const airports = await Airports.findAll({
      include: [
        {
          model: Shtetet,
          attributes: ['emri'], // Include only the 'emri' (country name) column
        }
      ],
    });
    res.json(
      airports.map(airport => (
       {
        id: airport.id,
        emri: airport.emri,
        akronimi: airport.akronimi,
        shtetiId: airport.shtetiId,
        shteti: airport.shtetet.emri
      }
      ))
    );
  } catch (err) {
        res.status(500).json({ error: err.message });
  }
};

// Add new Airports
const addAirports = async (req, res) => {
  const { emri, akronimi, shtetiId } = req.body;
  try {
    const newAirport = await Airports.create({
      emri, akronimi, shtetiId 
    });
    res.status(201).json({
      message: 'Airport added successfully',
      Airport: newAirport
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding Airport', error: error.message });
  }
};




// Delete Airport
const deleteAirport= async (req, res) => {
  try {
    const { id } = req.params;
    const Airport = await Airports.findByPk(id);
    if (!Airport) {
      return res.status(404).json({ error: 'Airport not found' });
    }
    await Airport.destroy();
    res.status(200).json({ message: 'Airport deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Airport
const updateAirport = async (req, res) => {
  try {
    const { id } = req.params;
    const { emri, akronimi, shtetiId } = req.body;
    const Airport = await Airports.findByPk(id);
    if (!Airport) {
      return res.status(404).json({ error: 'Airport not found' });
    }

    Airport.emri = emri || Airport.emri;
    Airport.akronimi = akronimi || Airport.akronimi;
    Airport.shtetiId = shtetiId || Airport.shtetiId;

    await Airport.save();
    res.status(200).json(Airport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllAirports, addAirports, deleteAirport, updateAirport};
