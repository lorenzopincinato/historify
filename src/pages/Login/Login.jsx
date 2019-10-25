import { Box, Button, Text } from 'grommet'
import { Book, Spotify } from 'grommet-icons'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import {
  authenticate,
  isAuthenticated,
  isAuthenticating,
  openAuthenticationPage,
} from '../../services/spotifyAuthentication'

const Login = ({ history }) => {
  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/')
    }

    if (isAuthenticating()) {
      authenticate()
        .then(() => {
          history.push('/')
        })
        .catch(error => {
          // TODO: Show failed to authenticate custom message
          window.alert(error)
        })
    }
  }, [history])

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
        onClick={openAuthenticationPage}
      />
    </Box>
  )
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Login
