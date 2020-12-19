const redis = require('redis');
const connection = redis.createClient({ prefix: 'allowlist-refresh-token' });
const manageList = require('./manageList');
module.exports = manageList(connection);