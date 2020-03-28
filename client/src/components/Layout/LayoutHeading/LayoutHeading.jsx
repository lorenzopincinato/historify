import React from 'react';
import { Flex, Heading, Box, Link, useColorMode } from '@chakra-ui/core';
import { AiOutlineGithub } from 'react-icons/ai';
import GitHubStarButton from './GitHubStarButton/GitHubStarButton';
import ColorModeButton from './ColorModeButton';
import CenterBox from '../CenterBox';

const LayoutHeading = () => {
  const { colorMode } = useColorMode();
  const titleColor = { light: 'gray.700', dark: 'white' };
  const borderColor = { light: 'gray.200', dark: 'gray.700' };

  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      borderBottom="1px"
      borderBottomColor={borderColor[colorMode]}
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
            <Heading
              as="h1"
              fontSize="2rem"
              color={titleColor[colorMode]}
              letterSpacing="-.1rem"
            >
              historify
            </Heading>
          </Box>
          <Flex direction="row" align="center">
            <GitHubStarButton marginRight="1rem" />
            <Link
              href="https://github.com/lorenzopincinato/historify"
              marginRight=".5rem"
              isExternal
              _focus={{
                outline: 'none',
              }}
            >
              <Box as={AiOutlineGithub} size="1.6rem" color="gray.500" />
            </Link>
            <ColorModeButton
              fontSize="1.35rem"
              color="gray.500"
              variant="ghost"
            />
          </Flex>
        </Flex>
      </CenterBox>
    </Flex>
  );
};

export default LayoutHeading;
