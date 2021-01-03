const redis = require('redis');
const manageList = require('./manageList');
const connection = redis.createClient({ prefix: 'allowlist-refresh-token' });
module.exports = manageList(connection);