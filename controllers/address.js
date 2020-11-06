const database = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../error/error');
const cep = require('cep-promise');


module.exports = {

    getZip: async (req, res) => {
        try {
            const zip = await cep(req.body.zip);
            res.json(zip);
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
