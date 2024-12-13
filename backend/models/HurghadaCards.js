// models/Hurghada.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Hurghada = sequelize.define('Hurghada', {
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

module.exports = Hurghada;
