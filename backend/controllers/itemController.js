const Item = require('../models/item');

// Krijimi i Item-it
const createItem = async (req, res) => {
  try {
    const itemData = {
      ...req.body,
      userId: req.user.id, 
    };
    const item = await Item.create(itemData);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      where: {
        userId: req.user.id, 
      }
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


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
