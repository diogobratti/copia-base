const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { strategy } = require('./auth');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

module.exports = app;
