// const { Sequelize } = require('sequelize');

// const host = process.env.DB_HOST;
// const database = process.env.DB_DATABASE;
// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

// const sequelize = new Sequelize(database, username, password, {
//   host: host,
//   dialect: 'mysql'
// });

const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

module.exports = sequelize;