const { authorize } = require('../config/env');

const { CustomError } = require('../helpers/error');

function redirectUriIsValid(redirectUri) {
  return redirectUri !== null && authorize.redirectUris.includes(redirectUri);
}

function validateRedirectUriQuery(req, res, next) {
  if (!redirectUriIsValid(req.query.redirect_uri))
    throw new CustomError({ statusCode: 400, message: 'invalid_redirect_uri' });
  else next();
}

function validateRedirectUriCookie(req, res, next) {
  if (!redirectUriIsValid(req.cookies.historify_redirect_uri))
    throw new CustomError({
      statusCode: 400,
      message: 'invalid_redirect_uri',
      query: true,
    });
  else next();
}

function validateStateCookie(req, res, next) {
  if (!req.query.state || req.query.state !== req.cookies.spotify_auth_state)
    throw new CustomError({
      statusCode: 400,
      message: 'state_mismatch',
      query: true,
    });
  else next();
}

module.exports = {
  validateRedirectUriQuery,
  validateRedirectUriCookie,
  validateStateCookie,
};
