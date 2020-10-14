const database = require('./../models');
const { InvalidArgumentError, InternalServerError } = require('../error/error');

module.exports = {
  add: async (req, res) => {
    const { name } = req.body;

    try {
      
      const city = await database.City.create({
                                      name: name,
                                    });

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

  list: async (req, res) => {
    const cities = await database.City.findAll();
    res.json(cities);
  },

  delete: async (req, res) => {
    const city = await database.City.findByPk(req.params.id);
    try {
      await city.destroy(city);
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
