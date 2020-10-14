const database = require('./../models');
const { InvalidArgumentError, InternalServerError } = require('../error/error');

module.exports = {
  add: async (req, res) => {
    const { street, number, complement, zip, cityId } = req.body;

    try {
      
      const address = await database.Address.create({
                                      street: street,
                                      number: number,
                                      complement: complement,
                                      zip: zip,
                                      cityId: cityId
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
    const addresses = await database.Address.findAll();
    res.json(addresses);
  },

  delete: async (req, res) => {
    const address = await database.Address.findByPk(req.params.id);
    try {
      await address.destroy(address);
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
