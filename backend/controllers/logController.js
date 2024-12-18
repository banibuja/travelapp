const Log = require('../models/log');

// Fetch all logs
const getLogs = async (req, res) => {
  try {
    const logs = await Log.findAll({
      order: [['createdAt', 'DESC']], 
    });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to fetch logs.' });
  }
};

// Create a new log
// const createLog = async (req, res) => {
//   const { userId, action, details } = req.body;
//   try {
//     const newLog = await Log.create({ userId, action, details });
//     res.status(201).json(newLog);
//   } catch (error) {
//     console.error('Error creating log:', error);
//     res.status(500).json({ error: 'Failed to create log.' });
//   }
// };

module.exports = {
  getLogs,
//   createLog,
};
