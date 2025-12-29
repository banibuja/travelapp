const BusStations = require('../models/busStations');
const Shtetet = require('../models/shtetet');

// Get all Bus Stations
const getAllBusStations = async (req, res) => {
  try {
    const busStations = await BusStations.findAll({
      include: [
        {
          model: Shtetet,
          attributes: ['emri'],
        }
      ],
    });
    res.json(
      busStations.map(station => ({
        id: station.id,
        emri: station.emri,
        adresa: station.adresa,
        shtetiId: station.shtetiId,
        shteti: station.shtetet?.emri
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get bus stations by shtetiId
const getBusStationsByShtetiId = async (req, res) => {
  try {
    const { shtetiId } = req.params;
    if (!shtetiId) {
      return res.status(400).json({ error: 'shtetiId parameter is required' });
    }
    const busStations = await BusStations.findAll({
      where: { shtetiId },
      include: [
        {
          model: Shtetet,
          attributes: ['emri'],
        }
      ],
    });

    res.json(
      busStations.map(station => ({
        id: station.id,
        emri: station.emri,
        adresa: station.adresa,
        shtetiId: station.shtetiId,
        shteti: station.shtetet?.emri,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new Bus Station
const addBusStation = async (req, res) => {
  try {
    const { emri, adresa, shtetiId } = req.body;
    const newBusStation = await BusStations.create({
      emri,
      adresa,
      shtetiId: parseInt(shtetiId) || null,
    });
    res.status(201).json({
      message: 'Bus station added successfully',
      busStation: newBusStation,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding bus station', error: error.message });
  }
};

// Update Bus Station
const updateBusStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { emri, adresa, shtetiId } = req.body;
    const busStation = await BusStations.findByPk(id);
    if (!busStation) {
      return res.status(404).json({ error: 'Bus station not found' });
    }

    busStation.emri = emri !== undefined ? emri : busStation.emri;
    busStation.adresa = adresa !== undefined ? adresa : busStation.adresa;
    busStation.shtetiId = shtetiId !== undefined ? parseInt(shtetiId) : busStation.shtetiId;

    await busStation.save();
    res.status(200).json({ message: 'Bus station updated successfully', busStation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Bus Station
const deleteBusStation = async (req, res) => {
  try {
    const { id } = req.params;
    const busStation = await BusStations.findByPk(id);
    if (!busStation) {
      return res.status(404).json({ error: 'Bus station not found' });
    }
    await busStation.destroy();
    res.status(200).json({ message: 'Bus station deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBusStations,
  getBusStationsByShtetiId,
  addBusStation,
  updateBusStation,
  deleteBusStation,
};

