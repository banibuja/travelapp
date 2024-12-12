const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Shtetet = require('./shtetet.js');
const Airports = require('./airports.js');

const Aranzhmanet = sequelize.define('aranzhmanet', {
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    airportId: {
      type: DataTypes.INTEGER,
      references: {
        model: Airports,
        key: 'id',
      },
    },
  }, {
    tableName: 'aranzhmanet',
    timestamps: false,
  });
  
  Aranzhmanet.belongsTo(Shtetet, { foreignKey: 'shtetiId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  Shtetet.hasMany(Aranzhmanet, { foreignKey: 'shtetiId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

  Aranzhmanet.belongsTo(Airports, { foreignKey: 'airportId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  Airports.hasMany(Aranzhmanet, { foreignKey: 'airportId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  
  module.exports = Aranzhmanet;
