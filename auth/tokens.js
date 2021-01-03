const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

const { InvalidArgumentError } = require('../error/error');
// const generalConfig = require("../config")["general"];

const allowlistRefreshToken = require('../redis/allowlistRefreshToken');
const blocklistAccessToken = require('../redis/blocklistAccessToken');
const passwordChange = require('../redis/passwordChange');

function createJWTToken(user, [timeQuantity, timeUnity]) {
  const payload = {
    id: user.id,
    RoleId: user.RoleId,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: timeQuantity + timeUnity,
  });
  
  return token;
}

async function verifyTokenJWT (token, name, blocklist) {
  await verifyTokenInBlocklist(token, name, blocklist);
  const { id } = jwt.verify(token, process.env.JWT_KEY);
  return id;
}

async function verifyTokenInBlocklist (token, name, blocklist) {
  if (!blocklist) {
    return;
  }

  const tokenInBlocklist = await blocklist.hasToken(token)
  if (tokenInBlocklist) {
    throw new jwt.JsonWebTokenError(`${name} inválido por logout!`);
  }
}

function invalidateTokenJWT (token, blocklist) {
  return blocklist.add(token);
}

async function createOpaqueToken (user, [timeQuantity, timeUnity], allowlist) {
  const opaqueToken = crypto.randomBytes(24).toString('hex');
  const expirationDate = moment().add(timeQuantity, timeUnity).unix();
  await allowlist.add(opaqueToken, user.id, expirationDate);
  return opaqueToken;
}

async function verifyOpaqueToken (token, name, allowlist) {
  verifySentToken(token, name);
  const id = await allowlist.searchValue(token);
  verifyValidToken(id, name);
  return id;
}

async function invalidateOpaqueToken (token, allowlist) {
  await allowlist.delete(token);
}

function verifyValidToken (id, name) {
  if (!id) {
    throw new InvalidArgumentError(`${name} inválido!`);
  }
}

function verifySentToken (token, name) {
  if (!token) {
    throw new InvalidArgumentError(`${name} não enviado!`);
  }
}

module.exports = {
  access: {
    name: 'access token',
    list: blocklistAccessToken,
    expiration: [15, 'm'],
    create (user) {
      return createJWTToken(user, this.expiration);
    },
    verify (token) {
      return verifyTokenJWT(token, this.name, this.list);
    },
    invalidate (token) {
      return invalidateTokenJWT(token, this.list);
    }
  },
  refresh: {
    name: 'refresh token',
    list: allowlistRefreshToken,
    expiration: [5, 'd'],
    create (user) {
      return createOpaqueToken(user, this.expiration, this.list);
    },
    verify (token) {
      return verifyOpaqueToken(token, this.name, this.list);
    },
    invalidate (token) {
      return invalidateOpaqueToken(token, this.list);
    }
  },
  emailVerification: {
    name: 'token de verificação de e-mail',
    expiration: [1, 'h'],
    create (user) {
      return createJWTToken(user, this.expiration);
    },
    verify (token) {
      return verifyTokenJWT(token, this.name);
    }
  },
  passwordChange: {
    name: 'redefinição de senha',
    list: passwordChange,
    expiration: [1, 'h'],
    create (user) {
      return createOpaqueToken(user, this.expiration, this.list);
    },
    verify (token) {
      return verifyOpaqueToken(token, this.name, this.list);
    },
  }
}
