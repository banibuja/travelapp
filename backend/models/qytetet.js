const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Shtetet = require('./shtetet.js');

const Qytetet = sequelize.define('qytetet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  emri: {
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
  tableName: 'qytetet',
  timestamps: false,
});

Qytetet.belongsTo(Shtetet, { foreignKey: 'shtetiId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Shtetet.hasMany(Qytetet, { foreignKey: 'shtetiId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


module.exports = Qytetet;
