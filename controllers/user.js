const database = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../error/error');


module.exports = {

    signUp: async (req, res) => {
        // console.log(req.body);
        let user = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            allowExtraEmails: req.body.allowExtraEmails,
            allowExtraWhatsapp: req.body.allowExtraWhatsapp,
            termsAccepted: (req.body.terms ? database.NOW : null),
            RoleId: 3,//client
        };
        let address = {
            zip: req.body.zip,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            neighborhood: req.body.neighborhood,
            CityId: req.body.city,
            main: true,
        };
        try {
            let newUser = await database.User.create(user);
            address['UserId'] = newUser.id;
            console.log(newUser);
            console.log(address);
            let newAddress = await database.Address.create(address);
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
