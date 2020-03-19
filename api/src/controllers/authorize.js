const querystring = require('querystring');

const authorization = require('../services/authorization');

async function redirectToLogin(req, res) {
  const { stateCookie, loginUrl } = authorization.getStateCookieAndLoginUrl();

  res.cookie(stateCookie.key, stateCookie.value);
  res.redirect(loginUrl);
}

async function handleLoginCallback(req, res) {
  try {
    const {
      acccessToken,
      refreshToken
    } = await authorization.getAccessAndRefreshToken(
      req.query.code || null,
      req.query.state || null,
      req.cookies ? req.cookies['spotify_auth_state'] : null
    );

    res.clearCookie('spotify_auth_state');

    res.redirect(
      '/#' +
        querystring.stringify({
          access_token: acccessToken,
          refresh_token: refreshToken
        })
    );
  } catch (err) {
    res.redirect('/#' + querystring.stringify({ error: err.message }));
  }
}

async function refreshAccessToken(req, res) {
  try {
    const accessToken = await authorization.refreshAccessToken(
      req.query.refresh_token
    );

    res.json({ access_token: accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { redirectToLogin, handleLoginCallback, refreshAccessToken };
