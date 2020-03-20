const querystring = require('querystring');
const axios = require('axios');
const { spotify, authorize } = require('../config/env');

const { generateRandomString } = require('../utils/string');

function getCookiesAndLoginUrl(redirectUri) {
  validateRedirectUri(redirectUri);

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
    cookies: { spotify_auth_state: state, historify_redirect_uri: redirectUri },
    loginUrl: loginUrl
  };
}

async function getAccessAndRefreshToken(code, state, cookies) {
  if (cookies === null) throw new Error('invalid_cookies');

  validateRedirectUri(cookies['historify_redirect_uri']);

  validateState(cookies['spotify_auth_state'], state);

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
      refreshToken: response.data.refresh_token,
      redirectUri: cookies['historify_redirect_uri']
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

function validateRedirectUri(redirectUri) {
  if (!redirectUri || !authorize.redirectUris.includes(redirectUri))
    throw new Error('invalid_redirect_uri');
}

function validateState(storedState, state) {
  if (!state || state !== storedState) throw new Error('state_mismatch');
}

module.exports = {
  getCookiesAndLoginUrl,
  getAccessAndRefreshToken,
  refreshAccessToken
};
