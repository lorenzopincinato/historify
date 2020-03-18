const express = require('express');

const bodyParser = require('body-parser');
const routes = require('../routes');
const consign = require('consign');

const app = express();

consign()
  .include('../controllers')
  .into(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', routes);

module.exports = app;
