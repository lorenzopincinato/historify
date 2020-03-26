const request = require('supertest');
const querystring = require('querystring');
const mockAxios = require('axios');

const app = require('../config/express');
const env = require('../config/env');
const helper = require('./helpers');
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
      const res = await getAuthorize(env.authorize.redirectUris[0]);

      const cookies = helper.extractCookies(res);

      expect(res.status).toBe(302);
      expect(res.header.location).toMatch(spotifyLoginUrlPattern);
      expect(cookies.spotify_auth_state).toMatch(stateCookiePattern);
      expect(cookies.historify_redirect_uri).toBe(
        env.authorize.redirectUris[0]
      );
    });
  });

  describe("should return 'invalid_redirect_uri' error", () => {
    it("when 'redirect_uri' isn't in config", async () => {
      const res = await getAuthorize('fakehistorifyapp.test.com/login');

      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({
        error: 'invalid_redirect_uri',
      });
    });

    it("when 'redirect_uri' is undefined", async () => {
      const res = await request(app).get('/api/authorize');

      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({
        error: 'invalid_redirect_uri',
      });
    });
  });
});

async function getAuthorizeCallback(query, cookies) {
  return request(app)
    .get(`/api/authorize/callback?${querystring.stringify(query)}`)
    .set('Cookie', helper.parseCookies(cookies));
}

describe('GET /api/authorize/callback', () => {
  describe("should redirect to 'redirect_uri' with 'access_token' and 'refresh_token'", () => {
    it('when has valid cookies, query and Spotify API is up', async () => {
      const accessToken = helper.generateToken();
      const refreshToken = helper.generateToken();

      mockAxios.post = jest.fn().mockResolvedValueOnce({
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      });

      const state = helper.generateState();
      const code = helper.generateToken();

      const res = await getAuthorizeCallback(
        { state: state, code: code },
        {
          spotify_auth_state: state,
          historify_redirect_uri: env.authorize.redirectUris[0],
        }
      );

      const query = helper.extractQuery(res);

      expect(res.status).toBe(302);
      expect(res.header.location).toMatch(env.authorize.redirectUris[0]);
      expect(query.access_token).toBe(accessToken);
      expect(query.refresh_token).toBe(refreshToken);

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
          code: code,
          redirect_uri: env.spotify.redirectUri,
          grant_type: 'authorization_code',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
              `${env.spotify.clientId}:${env.spotify.clientSecret}`
            ).toString('base64')}`,
          },
        }
      );
    });
  });

  describe("should return 'unexpected_error' error", () => {
    it('when has valid cookies, query and Spotify API return error', async () => {
      mockAxios.post = jest.fn().mockRejectedValueOnce({});

      const state = helper.generateState();
      const code = helper.generateToken();

      const res = await getAuthorizeCallback(
        { state: state, code: code },
        {
          spotify_auth_state: state,
          historify_redirect_uri: env.authorize.redirectUris[0],
        }
      );

      const query = helper.extractQuery(res);

      expect(res.status).toBe(302);
      expect(res.header.location).toMatch('#');
      expect(query.error).toBe('unexpected_error');

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
          code: code,
          redirect_uri: env.spotify.redirectUri,
          grant_type: 'authorization_code',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
              `${env.spotify.clientId}:${env.spotify.clientSecret}`
            ).toString('base64')}`,
          },
        }
      );
    });
  });

  describe("should return 'invalid_redirect_uri' error\"", () => {
    it("when 'historify_redirect_uri' cookie isn't in config", async () => {
      const state = helper.generateState();

      const res = await getAuthorizeCallback(
        { state: state },
        {
          spotify_auth_state: state,
          historify_redirect_uri: 'fakehistorifyapp.test.com/login',
        }
      );

      const query = helper.extractQuery(res);

      expect(res.status).toBe(302);
      expect(res.header.location).toMatch('#');
      expect(query.error).toBe('invalid_redirect_uri');
    });

    it("when 'historify_redirect_uri' cookie is undefined", async () => {
      const state = helper.generateState();

      const res = await getAuthorizeCallback(
        { state: state },
        { spotify_auth_state: state }
      );

      const query = helper.extractQuery(res);

      expect(res.status).toBe(302);
      expect(res.header.location).toMatch('#');
      expect(query.error).toBe('invalid_redirect_uri');
    });
  });

  describe("should return 'sate_mismatch' error", () => {
    it("when 'state' query isn't 'spotify_auth_state' cookie", async () => {
      const res = await getAuthorizeCallback(
        { state: helper.generateState() },
        {
          spotify_auth_state: helper.generateState(),
          historify_redirect_uri: env.authorize.redirectUris,
        }
      );

      const query = helper.extractQuery(res);

      expect(res.status).toBe(302);
      expect(res.header.location).toMatch('#');
      expect(query.error).toBe('state_mismatch');
    });

    it("when 'state' query isn't undefined", async () => {
      const res = await getAuthorizeCallback(
        {},
        {
          spotify_auth_state: helper.generateState(),
          historify_redirect_uri: env.authorize.redirectUris,
        }
      );

      const query = helper.extractQuery(res);

      expect(res.status).toBe(302);
      expect(res.header.location).toMatch('#');
      expect(query.error).toBe('state_mismatch');
    });

    it("when 'spotify_auth_state' cookie is undefined", async () => {
      const res = await getAuthorizeCallback(
        { state: helper.generateState() },
        { historify_redirect_uri: env.authorize.redirectUris }
      );

      const query = helper.extractQuery(res);

      expect(res.status).toBe(302);
      expect(res.header.location).toMatch('#');
      expect(query.error).toBe('state_mismatch');
    });

    it("when 'state' query and 'spotify_auth_state' cookie are undefined", async () => {
      const res = await getAuthorizeCallback(
        {},
        { historify_redirect_uri: env.authorize.redirectUris }
      );

      const query = helper.extractQuery(res);

      expect(res.status).toBe(302);
      expect(res.header.location).toMatch('#');
      expect(query.error).toBe('state_mismatch');
    });
  });
});

async function getAuthorizeRefreshToken(refreshToken) {
  return request(app).get(
    `/api/authorize/token?${querystring.stringify({
      refresh_token: refreshToken,
    })}`
  );
}

describe('GET /api/authorize/token', () => {
  describe("should return 'accessToken'", () => {
    it("when has valid 'refresh_token' and Spotify API is up", async () => {
      const accessToken = helper.generateToken();

      mockAxios.post = jest.fn().mockResolvedValueOnce({
        data: {
          access_token: accessToken,
        },
      });

      const refreshToken = helper.generateToken();

      const res = await getAuthorizeRefreshToken(refreshToken);

      expect(res.status).toBe(200);
      expect(res.body.access_token).toBe(accessToken);

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
              `${env.spotify.clientId}:${env.spotify.clientSecret}`
            ).toString('base64')}`,
          },
        }
      );
    });
  });

  describe("should return 'refresh_failed' error", () => {
    it("when has valid 'refresh_token' and Spotify API return error", async () => {
      mockAxios.post = jest.fn().mockRejectedValueOnce({});

      const refreshToken = helper.generateToken();

      const res = await getAuthorizeRefreshToken(refreshToken);

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('refresh_failed');

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
              `${env.spotify.clientId}:${env.spotify.clientSecret}`
            ).toString('base64')}`,
          },
        }
      );
    });
  });
});
