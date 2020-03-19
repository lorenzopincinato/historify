const express = require('express');

const authorize = require('../controllers/authorize');

const router = express.Router();

router.route('/').get(authorize.redirectToLogin);

router.route('/callback').get(authorize.handleLoginCallback);

router.route('/refresh_token').get(authorize.refreshAccessToken);

module.exports = router;
