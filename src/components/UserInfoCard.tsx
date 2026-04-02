import { Box, Flex, Avatar, Text, VStack, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import type { User } from '../schemas';
import { 
    UsersIcon, HeartIcon, CompanyIcon, 
    LocationIcon, EmailIcon, LinkIcon, TwitterIcon 
} from './icons';

interface UserInfoCardProps {
    user: User;
}

export function UserInfoCard({ user }: UserInfoCardProps) {
    const { t } = useTranslation();

    return (
        <Box 
            bg="white" 
            p={6} 
            borderRadius="md" 
            borderWidth="1px"
            borderColor="gray.200"
            w="100%"
        >
            <Flex align="center" gap={4} mb={6}>
                <Avatar src={user.avatar_url} name={user.name || user.login} size="xl" />
                <Box>
                    <Text fontSize="xl" fontWeight="bold" color="gray.800" lineHeight="tight">
                        {user.name}
                    </Text>
                    <Text fontSize="md" color="gray.500">
                        @{user.login}
                    </Text>
                </Box>
            </Flex>

            {/* Bio */}
            {user.bio && (
                <Text color="gray.600" mb={6} fontSize="sm">
                    {user.bio}
                </Text>
            )}

            {/* Seguidores e Seguindo */}
            <VStack align="start" spacing={2} mb={6}>
                <HStack color="gray.600">
                    <UsersIcon /> {/* Substitua pelo seu SVG */}
                    <Text fontSize="sm">
                        <Text as="span" fontWeight="bold" color="gray.800">{user.followers}</Text> {t('followers')}
                    </Text>
                </HStack>
                <HStack color="gray.600">
                    <HeartIcon /> {/* Substitua pelo seu SVG */}
                    <Text fontSize="sm">
                        <Text as="span" fontWeight="bold" color="gray.800">{user.following}</Text> {t('following')}
                    </Text>
                </HStack>
            </VStack>

            {/* Informações Extras (Só renderiza se o dado existir na API) */}
            <VStack align="start" spacing={3} mb={8} color="gray.600" fontSize="sm">
                {user.company && (
                    <HStack><CompanyIcon /> <Text>{user.company}</Text></HStack>
                )}
                
                {user.location && (
                    <HStack><LocationIcon /> <Text>{user.location}</Text></HStack>
                )}
                
                {user.email && (
                    <HStack><EmailIcon /> <Text>{user.email}</Text></HStack>
                )}
                
                {user.blog && (
                    <HStack>
                        <LinkIcon /> 
                        <ChakraLink href={user.blog} isExternal color="primary.500">
                            {user.blog}
                        </ChakraLink>
                    </HStack>
                )}
                
                {user.twitter_username && (
                    <HStack><TwitterIcon /> <Text>@{user.twitter_username}</Text></HStack>
                )}
            </VStack>

            <ChakraLink 
                href={`mailto:${user.email || ''}`} 
                _hover={{ textDecoration: 'none' }}
                w="100%"
                display="block"
            >
                <Button w="100%">
                    {t('contact')}
                </Button>
            </ChakraLink>
        </Box>
    );
}