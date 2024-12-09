const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Replace with the actual path to your sequelize instance

const DubaiPrices = sequelize.define('Dubai_prices', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nisja: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  tipi_dhomes: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  udhetimi: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  cmimi: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  sherbimi: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
});

module.exports = DubaiPrices;