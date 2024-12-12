const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Shtetet = require('./shtetet.js');

const Ofertat = sequelize.define('Ofertat', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulli: {
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
    nrDiteve: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nrPersonave: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nrNeteve: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    llojiDhomes: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sherbimi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataNisjes: {
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    dataKthimit: {
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    cmimi: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    tableName: 'ofertat',
    timestamps: false,
  });
  
  Ofertat.belongsTo(Shtetet, { foreignKey: 'shtetiId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  Shtetet.hasMany(Ofertat, { foreignKey: 'shtetiId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  
  module.exports = Ofertat;