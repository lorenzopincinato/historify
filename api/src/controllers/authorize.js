const querystring = require('querystring');

const authorize = require('../services/authorize');

async function redirectToLogin(req, res, next) {
  try {
    const { state, loginUrl } = authorize.getStateAndLoginUrl();

    res.cookie('spotify_auth_state', state);
    res.cookie('historify_redirect_uri', req.query.redirect_uri);

    res.redirect(loginUrl);
  } catch (err) {
    next(err);
  }
}

async function handleLoginCallback(req, res, next) {
  try {
    const {
      accessToken,
      refreshToken,
    } = await authorize.getAccessAndRefreshToken(req.query.code);

    const redirectUri = req.cookies.historify_redirect_uri;

    res.clearCookie('spotify_auth_state');
    res.clearCookie('historify_redirect_uri');

    res.redirect(
      `${redirectUri}?${querystring.stringify({
        access_token: accessToken,
        refresh_token: refreshToken,
      })}`
    );
  } catch (err) {
    next(err);
  }
}

async function refreshAccessToken(req, res, next) {
  try {
    const accessToken = await authorize.refreshAccessToken(
      req.query.refresh_token
    );

    res.json({ access_token: accessToken });
  } catch (err) {
    next(err);
  }
}

module.exports = { redirectToLogin, handleLoginCallback, refreshAccessToken };
