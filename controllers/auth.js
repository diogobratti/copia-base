const jwt = require("jsonwebtoken");
const database = require("../models");
const { InvalidArgumentError, InternalServerError } = require("../error/error");
const { blocklistAccessToken } = require("../redis");
const generalConfig = require("../config")["general"];
const tokens = require("../auth/tokens");
const { EmailPasswordChange } = require("../email");
const i18n = require('../i18n/texts');

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
async function basicLogin(user) {
  const accessToken = tokens.access.create(user);
  const refreshToken = await tokens.refresh.create(user);
  const body = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user,
  };
  return body;
}

module.exports = {
  basicLogin: basicLogin,

  async login(req, res) {
    const body = await basicLogin(req.user);
    res.set("Authorization", body.accessToken);
    res.json(body);
  },

  async logout(req, res) {
    try {
      const token = req.token;
      await tokens.access.invalidate(token);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async emailVerification(req, res, next) {
    try {
      const user = req.user;
      user.emailVerified = true;
      await user.save();
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  },

  async phoneVerification(req, res, next) {
    try {
      const user = req.user;
      user.phoneVerified = true;
      await user.save();
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  },

  async forgotMyPassword(req, res, next) {
    try {
      const user = await database.User.findOne({
        where: { email: req.body.email },
      });
      if(user === null){
        throw Error(i18n.EMAIL_NOT_FOUND);
      }
        const token = await tokens.passwordChange.create(user);
        const email = new EmailPasswordChange(user, token);
        await email.sendEmail();

        res.send({ message: i18n.EMAIL_FORGOT_PASSWORD_SENT});
    } catch (error) {

      next(error);
    }
  },

  async passwordChange(req, res, next) {
    try {
      if (typeof req.body.token !== 'string' || req.body.token.lenght === 0) {
        throw new InvalidArgumentError(i18n.TOKEN_INVALID)
      }
      const id = await tokens.passwordChange.verify(req.body.token);
      const user = await database.User.findByPk(id);
      user.password = req.body.password;
      await user.save();
      res.send({ message: i18n.PASSWORD_CHANGED });
    } catch (error) {
      next(error);
    }
  },
};
