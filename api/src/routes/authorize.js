const express = require('express');

const authorize = require('../controllers/authorize');
const {
  validateRedirectUriQuery,
  validateRedirectUriCookie,
  validateState
} = require('../validators/authorize');

const router = express.Router();

router.route('/').get(validateRedirectUriQuery, authorize.redirectToLogin);

router
  .route('/callback')
  .get(validateRedirectUriCookie, validateState, authorize.handleLoginCallback);

router.route('/refresh_token').get(authorize.refreshAccessToken);

module.exports = router;
