const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const Log = sequelize.define('Log', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'logs',
  timestamps: true,
});

module.exports = Log;
