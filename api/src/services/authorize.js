const { CustomError } = require('../helpers/error');
const { generateRandomString } = require('../helpers/string');
const { authorize } = require('../apis/spotify');

function getStateAndLoginUrl() {
  const state = generateRandomString(16);
  const loginUrl = authorize.loginUrl(state);

  return { state: state, loginUrl: loginUrl };
}

async function getAccessAndRefreshToken(code) {
  try {
    const {
      accessToken,
      refreshToken
    } = await authorize.getAccessAndRefreshToken(code);

    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (err) {
    throw new CustomError(500, 'invalid_code', true);
  }
}

async function refreshAccessToken(refreshToken) {
  try {
    const accessToken = await authorize.getAccessToken(refreshToken);

    return accessToken;
  } catch (err) {
    throw new CustomError(500, 'refresh_failed');
  }
}

module.exports = {
  getStateAndLoginUrl,
  getAccessAndRefreshToken,
  refreshAccessToken
};
