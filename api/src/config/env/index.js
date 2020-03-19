const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/./../../../.env' });

module.exports = {
  port: process.env.PORT || 8080,
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    scope: process.env.SPOTIFY_SCOPE || 'user-read-recently-played',
    redirectUri:
      process.env.SPOTIFY_REDIRECT_URI ||
      'http://localhost:8080/api/authorize/callback'
  }
};
