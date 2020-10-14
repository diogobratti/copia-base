const database = require('./../models');
const { InvalidArgumentError, InternalServerError } = require('../error/error');

module.exports = {
  add: async (req, res) => {
    const { label } = req.body;

    try {
      
      const state = await database.State.create({
                                      label: label,
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
    const states = await database.State.findAll();
    res.json(states);
  },

  delete: async (req, res) => {
    const state = await database.State.findByPk(req.params.id);
    try {
      await state.destroy(state);
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
