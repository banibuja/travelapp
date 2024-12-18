const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const GreqiSlider = sequelize.define('GreqiSlider', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageBase64: {
    type: DataTypes.TEXT('long'), 
    allowNull: false,
  },
});

module.exports = GreqiSlider;