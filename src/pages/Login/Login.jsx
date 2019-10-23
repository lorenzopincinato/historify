import { Box, Button, Text } from 'grommet'
import { Book, Spotify } from 'grommet-icons'
import React from 'react'

const Login = () => (
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
    />
  </Box>
)

export default Login
