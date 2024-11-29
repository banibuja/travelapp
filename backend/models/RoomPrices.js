const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Replace with the actual path to your sequelize instance

const RoomPrices = sequelize.define('RoomPrices', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  room_type: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  service: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price_1: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  price_2: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = RoomPrices;
