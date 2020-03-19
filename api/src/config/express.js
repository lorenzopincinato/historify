const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const consign = require('consign');

const routes = require('../routes');

const app = express();

consign()
  .include('../controllers')
  .into(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/', routes);

module.exports = app;
