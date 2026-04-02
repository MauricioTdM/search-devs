import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Spinner, Text, Select } from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { getUserProfile, getUserRepositories } from '../../services';
import type { User, Repository } from '../../schemas';
import { UserInfoCard } from '../../components/UserInfoCard';
import { RepositoryCard } from '../../components/RepositoryCard';

export function Profile() {
    const { username } = useParams<{ username: string }>();

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

    // EFEITO 2: Busca os Repositórios (Roda na montagem, na rolagem ou ao mudar a ordenação)
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
    }, [username, page, sortField]); // O sortField entrou nas dependências!

    // EFEITO 3: O Scroll Infinito (Igualzinho ao que você já testou)
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

    // Função para lidar com a troca do filtro
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortField(event.target.value);
        setPage(1); // Voltamos para a página 1
        setRepos([]); // Limpamos a lista para o usuário ver que está carregando o novo filtro
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
            <Box w="100%" minH="100vh">
                <Header />
                <Flex w="100%" mt={20} justify="center">
                    <Text fontSize="xl">Usuário não encontrado.</Text>
                </Flex>
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
                            Repositórios
                        </Text>
                        
                        <Select 
                            w={{ base: "100%", md: "250px" }} 
                            value={sortField} 
                            onChange={handleSortChange}
                            borderColor="gray.200"
                            _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px #8C19D2" }}
                            bg="white"
                        >
                            <option value="pushed">Atualizados recentemente</option>
                            <option value="created">Criados recentemente</option>
                            <option value="full_name">Ordem alfabética</option>
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