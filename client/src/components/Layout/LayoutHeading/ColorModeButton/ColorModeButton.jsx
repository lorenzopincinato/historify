import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/core';

const ColorModeButton = props => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = { light: 'moon', dark: 'sun' };

  return (
    <IconButton icon={icon[colorMode]} onClick={toggleColorMode} {...props} />
  );
};

export default ColorModeButton;
