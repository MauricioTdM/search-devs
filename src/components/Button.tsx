import { Button as ChakraButton, type ButtonProps } from '@chakra-ui/react';

export function Button({ children, ...props }: ButtonProps) {
    return (
        <ChakraButton
            colorScheme="primary"
            borderRadius="md"
            px={8}
            color="white"
            {...props}
        >
            {children}
        </ChakraButton>
    );
}