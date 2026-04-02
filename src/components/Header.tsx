import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SearchIcon } from './icons';
import { Input } from './Input';

export function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchValue.trim() !== '') {
            navigate(`/profile/${searchValue}`);
        }
    };

    return (
        <Flex as="header" w="100%" justify="center" py={6} bg="white">
            
            <Flex w="100%" maxW="1200px" px={4} align="center" gap={{ base: 4, md: 12 }}>
                
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Heading 
                        as="h1" 
                        fontSize={{ base: "2xl", md: "4xl" }}
                        fontWeight="normal"
                        color="secondary.500"
                        whiteSpace="nowrap"
                    >
                        Search <Text as="span" color="primary.500">d_evs</Text>
                    </Heading>
                </Link>

                <Box w="100%" maxW="500px">
                    <Input 
                        icon={<SearchIcon />} 
                        placeholder={t('search_placeholder')}
                        h="48px" 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </Box>

            </Flex>
        </Flex>
    );
}