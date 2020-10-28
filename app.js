const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const { strategy } = require('./auth');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

module.exports = app;
