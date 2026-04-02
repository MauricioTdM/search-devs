import { Box, Heading, Text, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import type { Repository } from '../schemas';
import { StarIcon } from './icons';

interface RepositoryCardProps {
    repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
    const { t } = useTranslation();

    const getRelativeDateText = (isoDate: string | null) => {
        if (!isoDate) return '';
        
        const date = new Date(isoDate);
        const now = new Date();
        const diffInMilliseconds = now.getTime() - date.getTime();
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return t('updated_today', 'Atualizado hoje');
        if (diffInDays === 1) return t('updated_yesterday', 'Atualizado ontem');
        
        // TODO:
        // No seu i18n, você pode criar uma chave "updated_days_ago": "Atualizado há {{count}} dias"
        return t('updated_days_ago', { count: diffInDays, defaultValue: `Atualizado há ${diffInDays} dias` });
    };

    return (
        <Box 
            py={6}
            borderBottomWidth="1px" 
            borderColor="gray.200"
            _last={{ borderBottomWidth: 0 }} 
        >
            <Heading 
                as="h3" 
                fontSize="xl" 
                color="gray.800" 
                fontWeight="bold" 
                mb={2}
            >
                {repository.name}
            </Heading>

            {repository.description && (
                <Text color="gray.600" fontSize="md" mb={4}>
                    {repository.description}
                </Text>
            )}

            <HStack color="gray.500" fontSize="sm" spacing={3}>
                <HStack spacing={1}>
                    <StarIcon />
                    <Text>{repository.stargazers_count}</Text>
                </HStack>

                <Text>•</Text>

                <Text>{getRelativeDateText(repository.updated_at)}</Text>
            </HStack>
        </Box>
    );
}