// models/item.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Item.belongsTo(User, { foreignKey: 'userId' });

module.exports = Item;
