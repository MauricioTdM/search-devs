import { VStack, Heading, Text, Box } from '@chakra-ui/react';

interface EmptyStateProps {
    title: string;
    message: string;
    action?: React.ReactNode; // Permite passar um botão customizado, se precisar
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
    return (
        <VStack spacing={4} mt={20} textAlign="center" w="100%" px={4}>
            <Heading as="h2" size="xl" color="primary.500">
                {title}
            </Heading>
            
            <Text fontSize="lg" color="gray.600" maxW="400px">
                {message}
            </Text>
            
            {action && (
                <Box mt={4}>
                    {action}
                </Box>
            )}
        </VStack>
    );
}