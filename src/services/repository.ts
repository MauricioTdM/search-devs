import { z } from 'zod';
import { repositorySchema, type Repository } from '../schemas';
import { getAuthHeaders } from './api';

const repositoryListSchema = z.array(repositorySchema);

export async function getUserRepositories(
    username: string,
    page: number = 1,
    sort: string = 'pushed'
): Promise<Repository[]> {
    const url = new URL(`${import.meta.env.VITE_BASE_URL}/users/${username}/repos`);
    url.searchParams.append('per_page', '10');
    url.searchParams.append('page', page.toString());
    url.searchParams.append('sort', sort);

    const response = await fetch(url.toString(), { headers: getAuthHeaders() });

    if (!response.ok) {
        throw new Error('Erro ao buscar repositórios');
    }

    const data = await response.json();

    return repositoryListSchema.parse(data);
}