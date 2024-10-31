require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const createDatabase = async () => {
  try {
    const connection = new Sequelize(
      '',
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
      }
    );
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log('Databaza është krijuar ose ekziston.');

    await sequelize.authenticate();
    console.log('Lidhja me bazën e të dhënave është e suksesshme.');

    // Krijo tabelat menjehere pas krijimit te databazes
    await sequelize.sync();
    console.log('Tabela(t) janë krijuar në MySQL.');
  } catch (error) {
    console.error('Gabim gjatë krijimit të databazës ose tabelës:', error);
  }
};

createDatabase();

module.exports = sequelize;
