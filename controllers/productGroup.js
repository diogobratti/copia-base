const database = require("../models");
const { InvalidArgumentError, InternalServerError } = require("../error/error");

module.exports = {
  listWithProductByProvider: async (req, res) => {
    try {
      const products = await database.ProductGroup.findAll({
        include: {
          model: database.Product,
          where: { providerId: req.params.providerId },
        },
      });
      res.json(products);
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
