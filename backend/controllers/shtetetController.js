const Shtetet = require('../models/shtetet');

// Get all Shtetet
const getAllShtetet = async (req, res) => {
  try {
    const shtetet = await Shtetet.findAll({});
    res.json(
      shtetet.map(shteti => (
       {
        id: shteti.id,
        emri: shteti.emri
      }
      ))
    );
  } catch (err) {
        res.status(500).json({ error: err.message });
  }
};

// Add new Shtetet
const addShtetet = async (req, res) => {
  const { emri } = req.body;
  try {
    const newShtet = await Shtetet.create({
      emri
    });
    res.status(201).json({
      message: 'Shteti added successfully',
      Shteti: newShtet
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding Shtetin', error: error.message });
  }
};




// Delete Shtetet
const deleteShtetet= async (req, res) => {
  try {
    const { id } = req.params;
    const Shteti = await Shtetet.findByPk(id);
    if (!Shteti) {
      return res.status(404).json({ error: 'Shteti not found' });
    }
    await Shteti.destroy();
    res.status(200).json({ message: 'Shteti deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Shteti
const updateShteti = async (req, res) => {
  try {
    const { id } = req.params;
    const { emri } = req.body;
    const Shteti = await Shtetet.findByPk(id);
    if (!Shteti) {
      return res.status(404).json({ error: 'Shteti not found' });
    }

    Shteti.emri = emri || Shteti.emri;

    await Shteti.save();
    res.status(200).json(Shteti);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllShtetet, addShtetet, deleteShtetet, updateShteti};
