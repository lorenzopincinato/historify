import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/core';

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === 'light' ? 'moon' : 'sun'}
      onClick={toggleColorMode}
    />
  );
};

export default ColorModeButton;
