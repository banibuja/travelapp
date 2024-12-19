const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const BullgariSlider = sequelize.define('BullgariSlider', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageBase64: {
    type: DataTypes.TEXT('long'), 
    allowNull: false,
  },
});

module.exports = BullgariSlider;
