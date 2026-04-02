import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../styles/theme';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </BrowserRouter>
  );
}