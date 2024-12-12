const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Shtetet = require('./shtetet.js');

const Airports = sequelize.define('airports', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  emri: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  akronimi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shtetiId: {
    type: DataTypes.INTEGER,
    references: {
      model: Shtetet,
      key: 'id',
    },
  },
}, {
  tableName: 'airports',
  timestamps: false,
});

Airports.belongsTo(Shtetet, { foreignKey: 'shtetiId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Shtetet.hasMany(Airports, { foreignKey: 'shtetiId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


module.exports = Airports;
