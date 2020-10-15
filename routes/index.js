'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const routes = {};
const controllers = require('../controllers');
const { middleware, authorization } = require('../auth')

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

      const adminAccess = [middleware.bearer, authorization.isAdmin];
      let adminOrMyAccess = [];
      if(model === 'user'){
        adminOrMyAccess = [middleware.bearer,
                                authorization.isAdmin,
                                authorization.isMyUser,];
      } else if (model === 'address'){
        adminOrMyAccess = [middleware.bearer,
                                authorization.isAdmin,
                                authorization.isMyAddress,];
      } else {
        adminOrMyAccess = [middleware.bearer,
                                authorization.isAdmin,];
      }

      app
        .route('/' + model)
          .post(adminAccess,controllers[model].add)
          .get(adminAccess,controllers[model].list);

      app
        .route('/' + model + '/:id')
          .delete(adminOrMyAccess,controllers[model].delete)
          .get(adminOrMyAccess,controllers[model].findByPk)
          .put(adminOrMyAccess,controllers[model].update);

    });

  return routes;
}