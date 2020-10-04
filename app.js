const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { authStrategy } = require('./src/auth');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

module.exports = app;
