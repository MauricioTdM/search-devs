import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Flex, VStack, Heading, Text } from '@chakra-ui/react';
import { SearchIcon } from '../../components/icons';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim() === '') return;

        navigate(`/profile/${searchQuery}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Flex w="100%" h="100vh" align="center" justify="center">
            <VStack
                spacing={8}
                w="90%"
                maxW="800px"
                p={4}
            >
                <Heading
                    as="h1"
                    fontSize={{ base: "4xl", md: "8xl" }}
                    fontWeight="normal"
                    color="secondary.500"
                    textAlign="center"
                >
                    Search <Text as="span" color="primary.500">d_evs</Text>
                </Heading>

                <Flex
                    w="100%"
                    gap={4}
                    flexDir={{ base: "column", md: "row" }}
                >
                    <Input
                        icon={<SearchIcon />}
                        placeholder={t('search_placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        h={{ base: "50px", md: "48px" }}
                        w={{ base: "50px", md: "592px" }}
                        fontSize="lg"
                    />
                    <Button
                        onClick={handleSearch}
                        h={{ base: "50px", md: "48px" }}
                        w={{ base: "100%", md: "176px" }}
                        fontSize="lg"
                    >
                        {t('search')}
                    </Button>
                </Flex>
            </VStack>
        </Flex>
    );
}