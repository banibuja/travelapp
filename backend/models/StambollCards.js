// models/Hotel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Hotel = sequelize.define('Hotel', {
 
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageBase64: {
    type: DataTypes.TEXT('long'), 
    allowNull: false,
  },
});

module.exports = Hotel;
