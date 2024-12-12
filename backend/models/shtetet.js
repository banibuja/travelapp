const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Shtetet = sequelize.define('shtetet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  emri: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'shtetet',
  timestamps: false,
});

module.exports = Shtetet;
