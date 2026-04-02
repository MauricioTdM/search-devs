import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </BrowserRouter>
  );
}