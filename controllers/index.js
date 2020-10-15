'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const database = require('./../models');
const controllers = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    controllers[file.slice(0,-3)] = require(path.join(__dirname, file));
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
      const Model = model.charAt(0).toUpperCase() + model.slice(1);


      //TODO: Include add operation. I wasn't able so far because I couldn't handle an async call.
      // const standardColumns = [
      //   'id',
      //   'createdAt',
      //   'updatedAt',
      //   'deletedAt'
      // ];
      // const describe = await database[Model].describe();
      // const columns = Object.keys(describe);
      // const nonStandardColumns = columns.filter(column => !standardColumns.includes(column));

      const controller = {

        findByPk: async (req, res) => {
          const item = await database[Model].findByPk(req.params.id);
          res.json(item);
        },

        list: async (req, res) => {
          const items = await database[Model].findAll();
          res.json(items);
        },
      
        delete: async (req, res) => {
          const item = await database[Model].findByPk(req.params.id);
          try {
            await item.destroy(item);
            res.status(200).send();
          } catch (error) {
            res.status(500).json({ error: error });
          }
        }
      };
      controllers[model] = { ...controllers[model], ...controller};
    });

module.exports = controllers;
