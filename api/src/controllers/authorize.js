const querystring = require('querystring');

const authorize = require('../services/authorize');

async function redirectToLogin(req, res) {
  const { cookies, loginUrl } = authorize.getCookiesAndLoginUrl(
    req.query.redirect_uri
  );

  for (let key in cookies) {
    res.cookie(key, cookies[key]);
  }

  res.redirect(loginUrl);
}

async function handleLoginCallback(req, res) {
  const {
    accessToken,
    refreshToken
  } = await authorize.getAccessAndRefreshToken(req.query.code, req.query.state);

  const redirect_uri = req.cookies['historify_redirect_uri'];

  res.clearCookie('spotify_auth_state');
  res.clearCookie('historify_redirect_uri');

  res.redirect(
    `${redirect_uri}?` +
      querystring.stringify({
        access_token: accessToken,
        refresh_token: refreshToken
      })
  );
}

async function refreshAccessToken(req, res) {
  const accessToken = await authorize.refreshAccessToken(
    req.query.refresh_token
  );

  res.json({ access_token: accessToken });
}

module.exports = { redirectToLogin, handleLoginCallback, refreshAccessToken };
