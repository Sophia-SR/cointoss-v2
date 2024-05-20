const { Sequelize } = require('sequelize');
require('dotenv').config(); // Ensure environment variables are loaded

const sequelize = new Sequelize(
  process.env.DB_NAME || 'cointossdb', 
  process.env.DB_USER || 'test_user', 
  process.env.DB_PASSWORD || 'test', 
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: console.log, // Add logging to diagnose issues
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
