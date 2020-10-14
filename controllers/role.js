const database = require('./../models');
const { InvalidArgumentError, InternalServerError } = require('../error/error');

module.exports = {
  add: async (req, res) => {
    const { name } = req.body;

    try {
      
      const role = await database.Role.create({
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
    const roles = await database.Role.findAll();
    res.json(roles);
  },

  delete: async (req, res) => {
    const role = await database.Role.findByPk(req.params.id);
    try {
      await role.destroy(role);
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
