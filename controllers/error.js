const database = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../error/error');


module.exports = {


    notify: async (req, res) => {
        let error = {
            error: JSON.stringify(req.body.error), 
            localStorage: JSON.stringify(req.body.localStorage), 
            url: JSON.stringify(req.body.url), 
            UserId: req.body.UserId,
        };
        try {
            let newError = await database.Error.create(error);
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


};
