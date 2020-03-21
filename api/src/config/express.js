const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const consign = require('consign');

const routes = require('../routes');

const { customErrorHandler, errorHandler } = require('../helpers/error');

const app = express();

consign()
  .include('src/helpers')
  .then('src/services')
  .then('src/controllers')
  .then('src/validators')
  .into(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/', routes);

app.use(customErrorHandler);
app.use(errorHandler);

module.exports = app;
