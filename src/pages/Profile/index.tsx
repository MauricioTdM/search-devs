import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Spinner, Text, Select } from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { getUserProfile, getUserRepositories } from '../../services';
import type { User, Repository } from '../../schemas';
import { UserInfoCard } from '../../components/UserInfoCard';
import { RepositoryCard } from '../../components/RepositoryCard';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';

export function Profile() {
    const { username } = useParams<{ username: string }>();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [repos, setRepos] = useState<Repository[]>([]);
    
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isLoadingRepos, setIsLoadingRepos] = useState(true);
    const [hasError, setHasError] = useState(false);

    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [sortField, setSortField] = useState('pushed');

    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchUser() {
            if (!username) return;
            setIsLoadingUser(true);
            setHasError(false);
            try {
                const userData = await getUserProfile(username);
                setUser(userData);
            } catch (error) {
                console.error(error);
                setHasError(true);
            } finally {
                setIsLoadingUser(false);
            }
        }
        fetchUser();
    }, [username]);

    useEffect(() => {
        async function fetchRepos() {
            if (!username) return;

            try {
                if (page === 1) {
                    setIsLoadingRepos(true);
                    const reposData = await getUserRepositories(username, 1, sortField);
                    setRepos(reposData);
                    setHasMore(reposData.length === 10);
                    setIsLoadingRepos(false);
                } else {
                    setIsLoadingMore(true);
                    const newRepos = await getUserRepositories(username, page, sortField);
                    setRepos(prev => [...prev, ...newRepos]);
                    setHasMore(newRepos.length === 10);
                    setIsLoadingMore(false);
                }
            } catch (error) {
                console.error('Erro ao buscar repositórios', error);
                setIsLoadingRepos(false);
                setIsLoadingMore(false);
            }
        }
        fetchRepos();
    }, [username, page, sortField]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isLoadingRepos) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, isLoadingRepos]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortField(event.target.value);
        setPage(1);
        setRepos([]);
    };

    if (isLoadingUser) {
        return (
            <Box w="100%" minH="100vh">
                <Header />
                <Flex w="100%" mt={20} justify="center">
                    <Spinner size="xl" color="primary.500" />
                </Flex>
            </Box>
        );
    }

    if (hasError || !user) {
        return (
            <Box w="100%" minH="100vh" bg="gray.50">
                <Header />
                <EmptyState 
                    title={t('ops_title')} 
                    message={t('not_found')}
                    action={
                        <Button onClick={() => navigate('/')}>
                            {t('back_to_home')}
                        </Button>
                    }
                />
            </Box>
        );
    }

    return (
        <Box w="100%" minH="100vh" bg="white">
            <Header />
            <Flex w="100%" maxW="1200px" mx="auto" px={4} py={8} gap={8} flexDir={{ base: 'column', md: 'row' }}>
                
                <Box w={{ base: "100%", md: "320px" }}>
                    <UserInfoCard user={user} />
                </Box>

                <Box flex="1">
                    <Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={4}>
                        <Text fontSize="2xl" color="primary.500" fontWeight="bold">
                            {t('repositories')}
                        </Text>
                        
                        <Select 
                            w={{ base: "100%", md: "250px" }} 
                            value={sortField} 
                            onChange={handleSortChange}
                            borderColor="gray.200"
                            _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px #8C19D2" }}
                            bg="white"
                        >
                            <option value="pushed">{t('repositories_sort_updated')}</option>
                            <option value="created">{t('repositories_sort_created')}</option>
                            <option value="full_name">{t('repositories_sort_alphabetical')}</option>
                        </Select>
                    </Flex>
                    
                    {isLoadingRepos && page === 1 ? (
                         <Flex justify="center" py={10}>
                             <Spinner color="primary.500" />
                         </Flex>
                    ) : (
                        <>
                            {repos.map((repo) => (
                                <RepositoryCard key={repo.id} repository={repo} />
                            ))}

                            <Box ref={observerTarget} w="100%" h="20px" mt={4} />

                            {isLoadingMore && (
                                <Flex justify="center" p={4}>
                                    <Spinner color="primary.500" />
                                </Flex>
                            )}
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}