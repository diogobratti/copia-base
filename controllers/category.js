const database = require("../models");
const { InvalidArgumentError, InternalServerError } = require("../error/error");

module.exports = {
  listWithProvider: async (req, res) => {
    try {
      const categories = await database.Category.findAll({
        include: { model: database.Provider, required: true },
      });
      res.json(categories);
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
};
