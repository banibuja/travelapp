const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

// First, create database if it doesn't exist
(async () => {
  try {
    // Connect to MySQL server without specifying database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.end();
  } catch (error) {
    console.error('Error creating database:', error.message);
  }
})();

// Now create Sequelize connection with logging disabled
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Disable Sequelize query logging
});

(async () => {
  try {
    await sequelize.authenticate();

    const Log = require('./models/log')
    const BullgariSlider = require('./models/BullgariSlider')

    await sequelize.sync({ alter: false }); // Use alter: false to reduce logs

  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();

module.exports = sequelize;