import { 
    Input as ChakraInput, 
    InputGroup, 
    InputLeftElement, 
    type InputProps 
} from '@chakra-ui/react';

interface CustomInputProps extends InputProps {
    icon?: React.ReactNode;
}

export function Input({ icon, ...props }: CustomInputProps) {
    return (
        <InputGroup>
            {icon && (
                <InputLeftElement pointerEvents='none' h="full">
                    {icon}
                </InputLeftElement>
            )}
            
            <ChakraInput
                borderRadius="lg"
                borderColor="gray.200"
                _placeholder={{ color: 'blackAlpha.500' }}
                _hover={{ borderColor: 'gray.300' }}
                _focus={{ 
                    borderColor: 'primary.500', 
                    boxShadow: '0 0 0 1px #8C19D2' 
                }}
                {...props}
            />
        </InputGroup>
    );
}