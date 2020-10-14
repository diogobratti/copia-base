const database = require('./../models');
const { InvalidArgumentError, InternalServerError } = require('../error/error');

module.exports = {
  add: async (req, res) => {
    const { name, acronym } = req.body;

    try {
      
      const country = await database.Country.create({
                                      name: name,
                                      acronym: acronym,
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
    const countries = await database.Country.findAll();
    res.json(countries);
  },

  delete: async (req, res) => {
    const country = await database.Country.findByPk(req.params.id);
    try {
      await country.destroy(country);
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
