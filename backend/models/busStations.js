const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Shtetet = require('./shtetet.js');

const BusStations = sequelize.define('busStations', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  emri: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresa: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shtetiId: {
    type: DataTypes.INTEGER,
    references: {
      model: Shtetet,
      key: 'id',
    },
  },
}, {
  tableName: 'busStations',
  timestamps: false,
});

BusStations.belongsTo(Shtetet, { foreignKey: 'shtetiId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Shtetet.hasMany(BusStations, { foreignKey: 'shtetiId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = BusStations;

