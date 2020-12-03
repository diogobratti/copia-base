const database = require("../models");
const { InvalidArgumentError, InternalServerError } = require("../error/error");

module.exports = {
  listStarred: async (req, res) => {
    try {
      const providers = await database.Provider.findAll({
        where: { isStarred: true },
      });
      res.json(providers);
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
  listWhereCategory: async (req, res) => {
    try {
      const providers = await database.Provider.findAll({
        where: { CategoryId: req.params.categoryId },
      });
      res.json(providers);
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
