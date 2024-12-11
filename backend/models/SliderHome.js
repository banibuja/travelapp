const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SliderHome = sequelize.define('SliderHome', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageBase64: {
    type: DataTypes.TEXT('long'), 
    allowNull: false,
  },
});

module.exports = SliderHome;
