import React from 'react';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';

import LayoutHeading from './LayoutHeading';
import LayoutFooting from './LayoutFooting';

import theme from '../../config/theme';
import CenterBox from './CenterBox';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <LayoutHeading />
        <CenterBox>{children}</CenterBox>
        <LayoutFooting />
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default Layout;
