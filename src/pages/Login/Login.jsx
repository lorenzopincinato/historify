import { Box, Button, Text } from 'grommet'
import { Book, Spotify } from 'grommet-icons'
import React, { useEffect } from 'react'

import {
  authenticate,
  isAuthenticating,
  openAuthenticationPage,
} from '../../services/spotifyAuthentication'

const Login = () => {
  useEffect(() => {
    if (isAuthenticating()) {
      console.log('AUTHENTICATING')

      authenticate()
        .then(() => {
          console.log('AUTHENTICATED!')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  const handleLogin = () => {
    openAuthenticationPage()
  }

  return (
    <Box align="center" justify="center" fill>
      <Box pad="medium">
        <Book size="xlarge" color="text" />
        <Text size="xlarge" weight="bold">
          historify
        </Text>
      </Box>
      <Button
        label={<Text color="white">LOGIN WITH SPOTIFY</Text>}
        icon={<Spotify color="white" />}
        hoverIndicator={{ color: '#1ed760' }}
        color="#1db954"
        primary
        onClick={handleLogin}
      />
    </Box>
  )
}

export default Login
