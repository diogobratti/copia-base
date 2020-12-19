const redis = require('redis');
const connection = redis.createClient({ prefix: 'blocklist-access-token' });
const manageList = require('./manageList')(connection);

const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

function generateTokenHash(token) {
    return createHash('sha256').update(token).digest('hex');
  }

module.exports = {
    async add(token) {
      const expirationDate = jwt.decode(token).exp;
      const tokenHash = generateTokenHash(token);
      await manageList.add(tokenHash, '', expirationDate);
    },
    async hasToken(token) {
      const tokenHash = generateTokenHash(token);
      return manageList.hasKey(tokenHash);
    },
  };