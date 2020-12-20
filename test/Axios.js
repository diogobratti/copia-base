const axios = require("axios");
const config = require("./config.json");

const Axios = axios.create({
  baseURL: config.BASE_URL,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'accept' : 'application/json, text/plain, */*'
  // }
});

const publicGet = async (url) => {
  // try {
  return await Axios.get(config.PUBLIC_PATH + url);
  // } catch (error) {
  //   console.log(error);
  // }
};
const publicPost = async (url, params) => {
  // try {
  return await Axios.post(config.PUBLIC_PATH + url, params);
  // } catch (error) {
  //   console.log(error);
  // }
};
module.exports = { Axios: Axios, publicGet: publicGet, publicPost: publicPost };
