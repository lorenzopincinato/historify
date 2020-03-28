import React from 'react';
import { Box, Link, useColorMode } from '@chakra-ui/core';

const LinkIcon = props => {
  const { href } = props;
  const { colorMode } = useColorMode();

  const iconColor = { light: 'gray.400', dark: 'gray.500' };

  return (
    <Link
      href={href}
      marginX="0.4rem"
      isExternal
      _focus={{
        outline: 'none',
      }}
    >
      <Box color={iconColor[colorMode]} {...props} />
    </Link>
  );
};

export default LinkIcon;
