import React from 'react';
import { Flex } from '@chakra-ui/core';

const CenterBox = ({ children }) => {
  return (
    <Flex
      align="center"
      width="100%"
      height="100%"
      paddingX="1.5rem"
      maxW="1280px"
      marginX="auto"
    >
      {children}
    </Flex>
  );
};

export default CenterBox;
