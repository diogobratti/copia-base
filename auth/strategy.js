const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { InvalidArgumentError } = require("../error/error");
const model = require("../models");
const blacklist = require("../redis/blacklist-actions");
const i18n = require("../i18n/texts");

function verifyUser(user) {
  if (user === null) {
    throw new InvalidArgumentError(i18n.USER_NOT_FOUND);
  }
}

async function existsTokenInBlacklist(token) {
  const tokenNaBlacklist = await blacklist.existsToken(token);
  if (tokenNaBlacklist) {
    throw new jwt.JsonWebTokenError(i18n.TOKEN_INVALID);
  }
}

async function verifyPassword(password, passwordHash) {
  const validPassword = await bcrypt.compare(password, passwordHash);
  if (!validPassword) {
    throw new InvalidArgumentError(i18n.LOGIN_INVALID);
  }
}

passport.use(
  new LocalStrategy(
    {
      // usernameField: 'username',
      // passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      try {
        const user = await model.User.findOne({
          include: { all: true, nested: true },
          // attributes : [ 'id', 'name', 'email', 'username', 'password', 'RoleId' ],
          where: { username: username },
        });
        verifyUser(user);
        await verifyPassword(password, user.password);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      await existsTokenInBlacklist(token);
      const payload = jwt.verify(token, process.env.JWT_KEY);
      const user = await model.User.findByPk(payload.id);
      done(null, user, { token: token });
    } catch (error) {
      done(error);
    }
  })
);
