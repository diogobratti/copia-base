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

  const standardColumns = [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt'
  ];


  fs
    .readdirSync(__dirname + "/../models")
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = file.slice(0,-3);
      const Model = model.charAt(0).toUpperCase() + model.slice(1);


      const columns = Object.keys(database[Model].rawAttributes);
      const nonStandardColumns = columns.filter(column => !standardColumns.includes(column));

      const controller = {

        add: async (req, res) => {
          let item = {};
          try {
            for(const column of nonStandardColumns){
              if(req.body[column] !== undefined){
                item[column] = req.body[column];
              }
            }
            await database[Model].create(item);
            res.status(201).json();
          } catch (error) {
            if (error instanceof InvalidArgumentError) {
              res.status(422).json({ error: error.message });
            } else if (error instanceof InternalServerError) {
              res.status(500).json({ error: error.message });
            } else {
              res.status(500).json({ error: error.message });
            }
          }
        },

        update: async (req, res) => {
          try {
            const item = await database[Model].findByPk(req.params.id);
            for(const column of nonStandardColumns){
              if(req.body[column] !== undefined){
                item[column] = req.body[column];
              }
            }
            await item.save();
            res.status(204).json();
          } catch (error) {
            if (error instanceof InvalidArgumentError) {
              res.status(422).json({ error: error.message });
            } else if (error instanceof InternalServerError) {
              res.status(500).json({ error: error.message });
            } else {
              res.status(500).json({ error: error.message });
            }
          }
        },

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
      controllers[model] = {  ...controller, ...controllers[model]};
    });

module.exports = controllers;
