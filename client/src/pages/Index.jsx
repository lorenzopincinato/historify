import React from 'react';
import {
  Box,
  Button,
  Heading,
  Link,
  Text,
  useColorMode,
} from '@chakra-ui/core';
import { AiOutlineGithub } from 'react-icons/ai';

const Index = () => {
  const { colorMode } = useColorMode();
  const textColor = { light: 'gray.600', dark: 'gray.300' };

  return (
    <Box as="section" paddingY="6rem" width="100%">
      <Box maxWidth="36rem" marginX="auto" textAlign="center">
        <Heading as="h1" fontWeight="medium">
          Statistics about your Spotify listening history
        </Heading>
        <Text
          marginTop="1.5rem"
          fontSize="1.25rem"
          color={textColor[colorMode]}
        >
          Historify is an open source application that shows you numbers and
          graphics about your last played tracks.
        </Text>
        <Box marginTop="1.5rem">
          <Button size="lg" marginRight="1rem" variantColor="green" isDisabled>
            Log In
          </Button>
          <Link
            href="https://github.com/lorenzopincinato/historify"
            isExternal
            _hover={{}}
          >
            <Button size="lg" leftIcon={AiOutlineGithub}>
              GitHub
            </Button>
          </Link>
        </Box>
        <Text marginTop="1.5rem" fontSize="1rem" color={textColor[colorMode]}>
          All contributions are welcome.
        </Text>
      </Box>
    </Box>
  );
};

export default Index;
