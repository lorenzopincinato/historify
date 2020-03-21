const { authorize } = require('../config/env');

const { CustomError } = require('../helpers/error');

function validateRedirectUriQuery(req, res, next) {
  if (!redirectUriIsValid(req.query.redirect_uri))
    throw new CustomError(400, 'invalid_redirect_uri');
  else next();
}

function validateRedirectUriCookie(req, res, next) {
  if (!redirectUriIsValid(req.cookies['historify_redirect_uri']))
    throw new CustomError(400, 'invalid_redirect_uri', true);
  else next();
}

function redirectUriIsValid(redirectUri) {
  return redirectUri !== null && authorize.redirectUris.includes(redirectUri);
}

function validateState(req, res, next) {
  if (!req.query.state || req.query.state !== req.cookies['spotify_auth_state'])
    throw new CustomError(400, 'sate_mismatch', true);
  else next();
}

module.exports = {
  validateRedirectUriQuery,
  validateRedirectUriCookie,
  validateState
};
