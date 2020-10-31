const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

const { strategy } = require('./auth');

app.use(
  bodyParser.json()
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

module.exports = app;
