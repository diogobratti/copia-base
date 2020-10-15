const jwt = require('jsonwebtoken');
const database = require('./../models');
const { InvalidArgumentError, InternalServerError } = require('../error/error');
const blacklist = require('../redis/blacklist-actions');
const generalConfig = require('../config')["general"];

function createJWTToken(user){
  const payload = {
    id: user.id
  }

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: generalConfig.timeToExpireToken })
  return token
}

module.exports = {
  add: async (req, res) => {
    const { name, email, username, password } = req.body;

    try {
      
      const user = await database.User.create({
                                      name: name,
                                      email: email,
                                      username: username,
                                      hashedPassword: password,
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

  login: (req, res) => {
    const token = createJWTToken(req.user);
    res.set('Authorization', token);
    res.status(204).send();
  },

  logout: async (req, res) => {
    try {
      const token = req.token;
      await blacklist.add(token);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};
