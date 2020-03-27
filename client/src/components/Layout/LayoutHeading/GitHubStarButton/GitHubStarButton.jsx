import React from 'react';

import { Box, useColorMode } from '@chakra-ui/core';
import GitHubButton from 'react-github-btn';

const GitHubStarButton = props => {
  const { colorMode } = useColorMode();

  return (
    <Box marginBottom="-.4rem" {...props}>
      <GitHubButton
        href="https://github.com/lorenzopincinato/historify"
        data-color-scheme={`no-preference: ${colorMode}; light: ${colorMode}; dark: ${colorMode};`}
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
      >
        Star
      </GitHubButton>
    </Box>
  );
};

export default GitHubStarButton;
