const querystring = require('querystring');
const axios = require('axios');
const { spotify } = require('../config/env');

function loginUrl(state) {
  return `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id: spotify.clientId,
    scope: spotify.scope,
    redirect_uri: spotify.redirectUri,
    state: state,
  })}`;
}

async function postWithClientCredentials(url, body) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${spotify.clientId}:${spotify.clientSecret}`
      ).toString('base64')}`,
    },
  };

  return axios.post(url, querystring.stringify(body), config);
}

async function getAccessAndRefreshToken(code) {
  const body = {
    code: code,
    redirect_uri: spotify.redirectUri,
    grant_type: 'authorization_code',
  };

  const response = await postWithClientCredentials(
    'https://accounts.spotify.com/api/token',
    body
  );

  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
  };
}

async function getAccessToken(refreshToken) {
  const body = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };

  const response = await postWithClientCredentials(
    'https://accounts.spotify.com/api/token',
    body
  );

  return response.data.access_token;
}

module.exports = {
  authorize: { loginUrl, getAccessAndRefreshToken, getAccessToken },
};
