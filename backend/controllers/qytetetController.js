const Qytetet= require('../models/qytetet');
const Shtetet = require('../models/shtetet');

// Get all Qytetet
const getAllQytetet = async (req, res) => {
  try {
    const qytetet = await Qytetet.findAll({
      include: [
        {
          model: Shtetet,
          attributes: ['emri'], // Include only the 'emri' (country name) column
        }
      ],
    });
    res.json(
      airports.map(qytetet => (
       {
        id: qytetet.id,
        emri: airport.emri,
        shtetiId: qytetet.shtetiId,
        shteti: qytetet.shtetet.emri
      }
      ))
    );
  } catch (err) {
        res.status(500).json({ error: err.message });
  }
};

// Add new Qytetet
const addQytetet = async (req, res) => {
  const { emri, shtetiId } = req.body;
  try {
    const newQytetet = await Qytetet.create({
      emri, shtetiId 
    });
    res.status(201).json({
      message: 'Qytetet added successfully',
      Qytetet: newQytetet
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding Qytetet', error: error.message });
  }
};




// Delete Qytetet
const deleteQytetet= async (req, res) => {
  try {
    const { id } = req.params;
    const Qytetet = await Qytetet.findByPk(id);
    if (!Qytetet) {
      return res.status(404).json({ error: 'Qytetet not found' });
    }
    await Qytetet.destroy();
    res.status(200).json({ message: 'Qytetet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Qytetet
const updateQytetet = async (req, res) => {
  try {
    const { id } = req.params;
    const { emri, shtetiId } = req.body;
    const Qytetet = await Qytetet.findByPk(id);
    if (!Qytetet) {
      return res.status(404).json({ error: 'Qytetet not found' });
    }

    Qytetet.emri = emri || Qytetet.emri;
    Qytetet.shtetiId = shtetiId || Qytetet.shtetiId;

    await Qytetet.save();
    res.status(200).json(Qytetet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllQytetet, addQytetet, deleteQytetet, updateQytetet};
