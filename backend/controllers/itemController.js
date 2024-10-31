const Item = require('../models/item');

// Krijimi i Item-it
const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Merr të gjitha Item-et
const getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Përditësimi i Item-it
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    if (item) {
      await item.update(req.body);
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item jo i gjetur' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fshirja e Item-it
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    if (item) {
      await item.destroy();
      res.json({ message: 'Item u fshi' });
    } else {
      res.status(404).json({ error: 'Item jo i gjetur' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
