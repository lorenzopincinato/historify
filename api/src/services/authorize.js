const querystring = require('querystring');
const axios = require('axios');
const { spotify } = require('../config/env');

const { generateRandomString } = require('../utils/string');

function getStateCookieAndLoginUrl() {
  const stateKey = 'spotify_auth_state';
  const state = generateRandomString(16);

  const loginUrl =
    'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: spotify.clientId,
      scope: spotify.scope,
      redirect_uri: spotify.redirectUri,
      state: state
    });

  return {
    stateCookie: { key: stateKey, value: state },
    loginUrl: loginUrl
  };
}

async function getAccessAndRefreshToken(code, state, storedState) {
  if (state === null || state !== storedState)
    throw new Error('state_mismatch');

  const body = {
    code: code,
    redirect_uri: spotify.redirectUri,
    grant_type: 'authorization_code'
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(spotify.clientId + ':' + spotify.clientSecret).toString(
          'base64'
        )
    }
  };

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify(body),
      config
    );

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token
    };
  } catch (err) {
    console.log(err);
    throw new Error('invalid_token');
  }
}

async function refreshAccessToken(refreshToken) {
  const body = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(spotify.clientId + ':' + spotify.clientSecret).toString(
          'base64'
        )
    }
  };

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify(body),
      config
    );

    return response.data.access_token;
  } catch (err) {
    console.log(err);
    throw new Error('refresh_failed');
  }
}

module.exports = {
  getStateCookieAndLoginUrl,
  getAccessAndRefreshToken,
  refreshAccessToken
};
