const request = require('supertest');
const querystring = require('querystring');

const app = require('../config/express');
const { extractCookies } = require('./helpers');
const { spotifyLoginUrlPattern, stateCookiePattern } = require('./constants');

async function getAuthorize(redirectUri) {
  return request(app).get(
    `/api/authorize?${querystring.stringify({
      redirect_uri: redirectUri,
    })}`
  );
}

describe('GET /api/authorize', () => {
  describe('should redirect to Spotify login and set cookies', () => {
    it("when 'redirect_uri' is in config", async () => {
      const response = await getAuthorize('historify.test.com/login');

      const cookies = extractCookies(response);

      expect(response.status).toBe(302);
      expect(response.header.location).toMatch(spotifyLoginUrlPattern);
      expect(cookies.spotify_auth_state).toMatch(stateCookiePattern);
      expect(cookies.historify_redirect_uri).toBe('historify.test.com/login');
    });
  });
  describe("should return 'invalid_redirect_uri' error", () => {
    it("when 'redirect_uri' isn't in config", async () => {
      const response = await getAuthorize('fakehistorifyapp.test.com/login');

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        error: 'invalid_redirect_uri',
      });
    });
    it("when 'redirect_uri' is undefined", async () => {
      const response = await request(app).get('/api/authorize');

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        error: 'invalid_redirect_uri',
      });
    });
  });
});
