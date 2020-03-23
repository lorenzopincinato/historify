const spotifyLoginUrlPattern = new RegExp(
  '^https://accounts.spotify.com/authorize\\?response_type=code&client_id=test_spotify_client_id&scope=test-spotify-scope&redirect_uri=historify.test.com%2Fapi%2Fauthorize%2Fcallback&state=[a-zA-Z0-9]{16}$',
  'g'
);

const stateCookiePattern = new RegExp('^[a-zA-Z0-9]{16}$', 'g');

module.exports = { spotifyLoginUrlPattern, stateCookiePattern };
