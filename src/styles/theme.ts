import { extendTheme } from '@chakra-ui/react';

const colors = {
    primary: {
        500: '#8C19D2',
        600: '#7515B0',
        700: '#5E118E',
    },
    secondary: {
        500: '#0069CA',
    }
};

export const theme = extendTheme({ colors });