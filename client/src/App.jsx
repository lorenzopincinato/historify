import React from 'react';
import { Text, ThemeProvider } from '@chakra-ui/core';

import theme from './config/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Text>Historify</Text>
    </ThemeProvider>
  );
}

export default App;
