const TravelPlan = require('../models/TravelPlan');

// Fetch all travel plans



const getAllTravelPlans = async (req, res) => {
  try {
    const travelPlans = await TravelPlan.findAll();
    res.json(travelPlans);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Add travel plan
const addTravelPlan = async (req, res) => {
  const { nisja_nga, destinimi_hoteli, opsionet_neteve, data, udhetaret } = req.body;

  try {
    const newTravelPlan = await TravelPlan.create({
      nisja_nga,
      destinimi_hoteli,
      opsionet_neteve,
      data,
      udhetaret
    });

    res.status(201).json({
      message: 'Travel plan added successfully',
      travelPlan: newTravelPlan
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding travel plan', error: error.message });
  }
};

// Delete travel plan

const deleteTravelPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const travelPlans = await TravelPlan.findByPk(id);
    if (!travelPlans) {
      return res.status(404).json({ error: 'Travel not found' });
    }
    await travelPlans.destroy();
    res.status(200).json({ message: 'Travel deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





// Update travel plan

const updateTravelPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nisja_nga, destinimi_hoteli, opsionet_neteve, data, udhetaret } = req.body;
    const updatedTravelPlan = await TravelPlan.findByPk(id);
    if (!updatedTravelPlan) {
      return res.status(404).json({ error: 'TravelPlan not found' });
    }

    updatedTravelPlan.nisja_nga = nisja_nga || updatedTravelPlan.nisja_nga;
    updatedTravelPlan.destinimi_hoteli = destinimi_hoteli || updatedTravelPlan.destinimi_hoteli;
    updatedTravelPlan.opsionet_neteve = opsionet_neteve || updatedTravelPlan.opsionet_neteve;
    updatedTravelPlan.data = data || updatedTravelPlan.data;
    updatedTravelPlan.udhetaret = udhetaret || updatedTravelPlan.udhetaret;


    await updatedTravelPlan.save();
    res.status(200).json(updatedTravelPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllTravelPlans, addTravelPlan, deleteTravelPlan, updateTravelPlan };
