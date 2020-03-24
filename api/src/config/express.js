const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routes = require('../routes');

const { customErrorHandler, errorHandler } = require('../helpers/error');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/', routes);

app.use(customErrorHandler);
app.use(errorHandler);

module.exports = app;
