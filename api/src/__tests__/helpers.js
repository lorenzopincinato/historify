const cookieParser = require('set-cookie-parser');

const { generateRandomString } = require('../helpers/string');

function extractCookies(response) {
  const cookies = cookieParser.parse(response);

  return cookies.reduce(
    // eslint-disable-next-line no-param-reassign, no-return-assign, no-sequences
    (obj, item) => ((obj[item.name] = item.value), obj),
    {}
  );
}

function parseCookies(cookies) {
  return Object.keys(cookies).map(key => `${key}=${cookies[key]}`);
}

function extractQuery(response) {
  const queryString = response.headers.location.split('?')[1];

  const query = {};

  const pairs = (queryString === '?'
    ? queryString.substr(1)
    : queryString
  ).split('&');

  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

function generateToken() {
  return generateRandomString(64);
}

function generateState() {
  return generateRandomString(16);
}

module.exports = {
  extractCookies,
  parseCookies,
  extractQuery,
  generateToken,
  generateState,
};
