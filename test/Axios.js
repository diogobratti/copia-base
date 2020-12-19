const axios = require("axios");
const config = require('./config.json');

const Axios = axios.create({
  baseURL: config.BASE_URL,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'accept' : 'application/json, text/plain, */*'
  // }
});


module.exports = Axios;
