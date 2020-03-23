const querystring = require('querystring');

const authorize = require('../services/authorize');

async function redirectToLogin(req, res) {
  const { state, loginUrl } = authorize.getStateAndLoginUrl();

  res.cookie('spotify_auth_state', state);
  res.cookie('historify_redirect_uri', req.query.redirect_uri);

  res.redirect(loginUrl);
}

async function handleLoginCallback(req, res) {
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
}

async function refreshAccessToken(req, res) {
  const accessToken = await authorize.refreshAccessToken(
    req.query.refresh_token
  );

  res.json({ access_token: accessToken });
}

module.exports = { redirectToLogin, handleLoginCallback, refreshAccessToken };
