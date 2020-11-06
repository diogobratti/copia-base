const database = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../error/error');


module.exports = {


    listWithCities: async (req, res) => {
        try {
            const states = await database.State.findAll({
                include: database.City
            });
            res.json(states);
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
