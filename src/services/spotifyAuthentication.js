import ClientOauth2 from 'client-oauth2'
import crypto from 'crypto'
import SpotifyApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyApi()

const spotifyAuthentication = new ClientOauth2({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  accessTokenUri: process.env.REACT_APP_SPOTIFY_AUTHORIZE_URI,
  authorizationUri: process.env.REACT_APP_SPOTIFY_AUTHORIZE_URI,
  redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
  scopes: process.env.REACT_APP_SPOTIFY_SCOPES.split(','),
})

const getAccessToken = () => {
  return localStorage.getItem('SPOTFY_ACCESS_TOKEN')
}

const getAccessTokenState = () => {
  return localStorage.getItem('SPOTIFY_ACCESS_TOKEN_STATE')
}

const clearAccessToken = () => {
  localStorage.removeItem('SPOTFY_ACCESS_TOKEN')
  localStorage.removeItem('SPOTIFY_ACCESS_TOKEN_STATE')
}

const setAccessToken = token => {
  localStorage.setItem('SPOTFY_ACCESS_TOKEN', token)
  localStorage.removeItem('SPOTIFY_ACCESS_TOKEN_STATE')
}

const setAccessTokenState = state => {
  localStorage.setItem('SPOTIFY_ACCESS_TOKEN_STATE', state)
}

const isAuthenticating = () => {
  return getAccessTokenState() !== null
}

const isAuthenticated = () => {
  const accessToken = getAccessToken()

  if (accessToken !== null) {
    spotifyApi.setAccessToken(accessToken)
    spotifyApi
      .getMe()
      .then(() => {
        return true
      })
      .catch(() => {
        clearAccessToken()
        return false
      })
  }

  return false
}

const openAuthenticationPage = () => {
  const state = crypto.randomBytes(24).toString('hex')

  setAccessTokenState(state)

  window.open(spotifyAuthentication.token.getUri({ state, show_dialog: false }), '_self')
}

const authenticate = async () =>
  new Promise((resolve, reject) => {
    spotifyAuthentication.token
      .getToken(window.location.href, { state: getAccessTokenState() })
      .then(user => {
        spotifyApi.setAccessToken(user.accessToken)

        spotifyApi.getMe().then(() => {
          setAccessToken(user.accessToken)
          resolve()
        })
      })
      .catch(error => {
        clearAccessToken()
        reject(error)
      })
  })

export { isAuthenticating, isAuthenticated, openAuthenticationPage, authenticate }
