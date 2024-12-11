// models/TravelPlan.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const TravelPlan = sequelize.define('TravelPlan', {
  nisja_nga: {
    type: DataTypes.STRING,
    allowNull: false
  },
  destinimi_hoteli: {
    type: DataTypes.STRING,
    allowNull: false
  },
  opsionet_neteve: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  udhetaret: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'travel_plans',  
  timestamps: true           
});

module.exports = TravelPlan;
