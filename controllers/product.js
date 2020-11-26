const database = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../error/error');


module.exports = {

    listByCategory: async (req, res) => {
        try {
            const product = await database.Product.findAll({
                include: [database.Category,database.Provider],
                where: {categoryId : req.params.id},
            });
            res.json(product);
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