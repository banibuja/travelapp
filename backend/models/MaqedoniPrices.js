const {DataTypes} = require('sequelize');
const sequalize = require('../db');

const MaqedoniPrices = sequalize.define('Maqedoni_prices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    lloji_dhomes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sherbimi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gjat_sezones: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    jasht_sezones: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
});

module.exports = MaqedoniPrices;