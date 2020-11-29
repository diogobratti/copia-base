const jwt = require("jsonwebtoken");
const database = require("../models");
const { InvalidArgumentError, InternalServerError } = require("../error/error");
const blacklist = require("../redis/blacklist-actions");
const generalConfig = require("../config")["general"];

function createJWTToken(user) {
  const payload = {
    id: user.id,
    RoleId: user.RoleId,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: generalConfig.timeToExpireToken,
  });
  return token;
}
function basicLogin(user) {
  const token = createJWTToken(user);
  const body = {
    token: token,
    user: user,
  };
  return body;
}

module.exports = {
  basicLogin: basicLogin,

  login: (req, res) => {
    const body = basicLogin(req.user);
    res.set("Authorization", body.token);
    res.json(body);
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
