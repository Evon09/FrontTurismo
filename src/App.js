import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

import AppRoutes from './AppRoutes';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
