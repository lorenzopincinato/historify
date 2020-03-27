import React from 'react';
import { Flex, Heading, Box, Link } from '@chakra-ui/core';
import { GoMarkGithub } from 'react-icons/go';
import GitHubStarButton from './GitHubStarButton/GitHubStarButton';
import ColorModeButton from './ColorModeButton';
import CenterBox from '../CenterBox';

const LayoutHeading = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      borderBottom="1px"
      height="4rem"
    >
      <CenterBox>
        <Flex
          align="center"
          width="100%"
          height="100%"
          paddingX="1.5rem"
          justify="space-between"
        >
          <Box>
            <Heading as="h1" size="lg" letterSpacing="-.1rem">
              historify
            </Heading>
          </Box>
          <Flex direction="row" align="center">
            <GitHubStarButton marginRight=".75rem" />
            <Link
              href="https://github.com/lorenzopincinato/historify"
              isExternal
            >
              <Box as={GoMarkGithub} size="1.5rem" marginRight=".75rem" />
            </Link>
            <ColorModeButton />
          </Flex>
        </Flex>
      </CenterBox>
    </Flex>
  );
};

export default LayoutHeading;
