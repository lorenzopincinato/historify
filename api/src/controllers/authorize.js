const querystring = require('querystring');

const authorize = require('../services/authorize');

async function redirectToLogin(req, res) {
  try {
    const { cookies, loginUrl } = authorize.getCookiesAndLoginUrl(
      req.query.redirect_uri || null
    );

    for (let key in cookies) {
      res.cookie(key, cookies[key]);
    }

    res.redirect(loginUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function handleLoginCallback(req, res) {
  try {
    const {
      accessToken,
      refreshToken,
      redirectUri
    } = await authorize.getAccessAndRefreshToken(
      req.query.code || null,
      req.query.state || null,
      req.cookies || null
    );

    res.clearCookie('spotify_auth_state');
    res.clearCookie('historify_redirect_uri');

    res.redirect(
      `${redirectUri}?` +
        querystring.stringify({
          access_token: accessToken,
          refresh_token: refreshToken
        })
    );
  } catch (err) {
    res.redirect('/#' + querystring.stringify({ error: err.message }));
  }
}

async function refreshAccessToken(req, res) {
  try {
    const accessToken = await authorize.refreshAccessToken(
      req.query.refresh_token
    );

    res.json({ access_token: accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { redirectToLogin, handleLoginCallback, refreshAccessToken };
