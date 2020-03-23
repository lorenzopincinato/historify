module.exports = function() {
  process.env.SPOTIFY_CLIENT_ID = 'test_spotify_client_id';
  process.env.SPOTIFY_CLIENT_SECRET = 'test_spotify_client_secret';
  process.env.SPOTIFY_REDIRECT_URI =
    'historify.test.com/api/authorize/callback';
  process.env.SPOTIFY_SCOPE = 'test-spotify-scope';
  process.env.AUTHORIZE_REDIRECT_URIS = 'historify.test.com/login';
};
