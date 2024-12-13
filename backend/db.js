const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port:process.env.PORT,
  logging: false, 
  pool: {
    max: 10, 
    min: 0,  
    acquire: 30000, 
    idle: 10000, 
  },
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, 
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const results = await sequelize.query("SELECT * FROM users WHERE id=1");
    console.log("Tables in the database:", results);
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();

module.exports = sequelize;