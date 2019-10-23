import { Box, Button, Text } from 'grommet'
import { Spotify } from 'grommet-icons'
import React from 'react'

const Login = () => (
  <Box align="center" justify="center" fill>
    <Button
      label={<Text color="white">LOG IN WITH SPOTIFY</Text>}
      icon={<Spotify color="white" />}
      hoverIndicator={{ color: '#1ed760' }}
      color="#1db954"
      primary
    />
  </Box>
)

export default Login
