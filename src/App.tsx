import * as React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { HashRouter} from 'react-router-dom';
import Header from './component/Header';
import Content from './component/Content';

export const App = () => (
  <HashRouter>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Header />
        <Content />
      </Box>
    </ChakraProvider>
  </HashRouter>
);
