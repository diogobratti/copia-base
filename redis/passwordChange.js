const redis = require('redis');
const connection = redis.createClient({ prefix: 'password-change' });
const manageList = require('./manageList');
module.exports = manageList(connection);