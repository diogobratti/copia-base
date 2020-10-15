'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const routes = {};
const controllers = require('../controllers');
const { authMiddleware } = require('../auth')

module.exports = app => {

const fileNames = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  });
fileNames.forEach(file => {
      routes[file.slice(0,-3)] = require(path.join(__dirname, file))(app);
    });

  /**************************
  Reading all models and inserting CRUD routes 
  ***************************/    
  fs
    .readdirSync(__dirname + "/../models")
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = file.slice(0,-3);

      app
        .route('/' + model)
          .post(authMiddleware.bearer,controllers[model].add)
          .get(authMiddleware.bearer,controllers[model].list);

      app
        .route('/' + model + '/:id')
          .delete(authMiddleware.bearer,controllers[model].delete)
          .get(authMiddleware.bearer,controllers[model].findByPk);

    });

  return routes;
}