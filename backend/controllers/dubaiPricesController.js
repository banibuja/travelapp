const DubaiPrices = require('../models/DubaiPrices');

// Get all dubai prices
const getAllDubaiPrices = async (req, res) => {
  try {
    const dubaiPrices = await DubaiPrices.findAll();
    res.json(dubaiPrices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new dubai price
const addDubaiPrice = async (req, res) => {
  const { nisja, tipi_dhomes, udhetimi, cmimi, sherbimi } = req.body;

  try {
    const newDubaiPrice = await DubaiPrices.create({
      nisja, 
      tipi_dhomes, 
      udhetimi, 
      cmimi, 
      sherbimi
    });

    res.status(201).json({
      message: 'Dubai price added successfully',
      dubaiPrice: newDubaiPrice
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding dubai price', error: error.message });
  }
};

// Delete dubai price
const deleteDubaiPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const dubaiPrice = await DubaiPrices.findByPk(id);
    if (!dubaiPrice) {
      return res.status(404).json({ error: 'Dubai price not found' });
    }
    await dubaiPrice.destroy();
    res.status(200).json({ message: 'Dubai price deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update dubai price
const updateDubaiPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { nisja, tipi_dhomes, udhetimi, cmimi, sherbimi} = req.body;
    const dubaiPrice = await DubaiPrices.findByPk(id);
    if (!dubaiPrice) {
      return res.status(404).json({ error: 'Dubai price not found' });
    }

    dubaiPrice.nisja = nisja || dubaiPrice.nisja;
    dubaiPrice.tipi_dhomes = tipi_dhomes || dubaiPrice.tipi_dhomes;
    dubaiPrice.udhetimi = udhetimi || dubaiPrice.udhetimi;
    dubaiPrice.cmimi = cmimi || dubaiPrice.cmimi;
    dubaiPrice.sherbimi = sherbimi || dubaiPrice.sherbimi;

    await dubaiPrice.save();
    res.status(200).json(dubaiPrice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllDubaiPrices, addDubaiPrice, deleteDubaiPrice, updateDubaiPrice };
