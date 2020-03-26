const express = require('express');

const authorize = require('../controllers/authorize');
const {
  validateRedirectUriQuery,
  validateRedirectUriCookie,
  validateStateCookie,
} = require('../validators/authorize');

const router = express.Router();

router.route('/').get(validateRedirectUriQuery, authorize.redirectToLogin);

router
  .route('/callback')
  .get(
    validateRedirectUriCookie,
    validateStateCookie,
    authorize.handleLoginCallback
  );

router.route('/token').get(authorize.refreshAccessToken);

module.exports = router;
