import React from 'react';
import { Flex, Box, Divider, Text } from '@chakra-ui/core';

import {
  AiFillHeart,
  AiOutlineGithub,
  AiOutlineTwitter,
  AiFillFacebook,
} from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

import LinkIcon from './LinkIcon';

const LayoutHeading = () => {
  return (
    <Box>
      <Divider />
      <Flex direction="column" align="center" justify="center" marginY="3rem">
        <Flex direction="row" align="center">
          <Text fontSize="sm">Developed with</Text>
          <Box as={AiFillHeart} fontSize="sm" marginX="0.2rem" />
          <Text fontSize="sm">by Lorenzo Pincinato</Text>
        </Flex>
        <Flex direction="row" align="center" marginTop="1rem">
          <LinkIcon
            href="https://github.com/lorenzopincinato"
            as={AiOutlineGithub}
            size="1.25rem"
          />
          <LinkIcon
            href="https://twitter.com/lemaum_"
            as={AiOutlineTwitter}
            size="1.45rem"
          />
          <LinkIcon
            href="https://facebook.com/lorenzopincinato"
            as={AiFillFacebook}
            size="1.25rem"
          />
          <LinkIcon
            href="mailto:lorenzopincinato@gmail.com"
            as={MdEmail}
            size="1.4rem"
          />
        </Flex>
        <Box />
      </Flex>
    </Box>
  );
};

export default LayoutHeading;
