const database = require("../models");
const { InvalidArgumentError, InternalServerError } = require("../error/error");
const tokens = require("../auth/tokens");
const authController = require("./auth");
const { EmailVerification } = require('../email');

function generateURL(route, token) {
  const baseURL = process.env.BASE_URL;
  return `${baseURL}${route}${token}`;
}

module.exports = {
  signUp: async (req, res) => {
    // console.log(req.body);
    let user = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
      allowExtraEmails: req.body.allowExtraEmails,
      allowExtraWhatsapp: req.body.allowExtraWhatsapp,
      termsAccepted: req.body.termsAccepted ? database.NOW : null,
      RoleId: 3, //client
    };
    let address = {
      zip: req.body.zip,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      neighborhood: req.body.neighborhood,
      CityId: req.body.CityId,
      main: true,
    };
    try {
      let newUser = await database.User.create(user);
      address["UserId"] = newUser.id;
      console.log(newUser);
      console.log(address);
      let newAddress = await database.Address.create(address);
      const body = await authController.basicLogin(newUser);

      const token = tokens.emailVerification.create(newUser);
      const address = generateURL('/auth/verifyEmail/', token);
      const emailVerification = new EmailVerification(newUser, address);
      emailVerification.sendEmail().catch(console.log);

      res.set("Authorization", body.token);
      res.status(201).json(body);
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
