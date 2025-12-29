const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Aranzhmanet = require('./Aranzhmanet');

const Purchases = sequelize.define('purchases', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  aranzhmaniId: {
    type: DataTypes.INTEGER,
    references: {
      model: Aranzhmanet,
      key: 'id',
    },
    allowNull: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'eur',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // pending, completed, failed, cancelled, refused
  },
  adminApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: null,
    allowNull: true,
  },
  stripePaymentIntentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stripeSessionId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    defaultValue: 'stripe',
  },
  // Store package details as JSON (without imageBase64 to save space)
  packageDetails: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
}, {
  tableName: 'purchases',
  timestamps: true,
});

// Associations must be defined after both models are loaded
// This will be handled in a separate file or after User model is fully loaded
Purchases.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user',
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE' 
});
User.hasMany(Purchases, { 
  foreignKey: 'userId', 
  as: 'purchases',
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE' 
});

Purchases.belongsTo(Aranzhmanet, { foreignKey: 'aranzhmaniId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Aranzhmanet.hasMany(Purchases, { foreignKey: 'aranzhmaniId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

module.exports = Purchases;

