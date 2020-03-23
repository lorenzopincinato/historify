const cookieParser = require('set-cookie-parser');

function extractCookies(response) {
  const cookies = cookieParser.parse(response);

  return cookies.reduce(
    // eslint-disable-next-line no-param-reassign, no-return-assign, no-sequences
    (obj, item) => ((obj[item.name] = item.value), obj),
    {}
  );
}

module.exports = { extractCookies };
