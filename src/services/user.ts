import { userSchema, type User } from '../schemas';
import { getAuthHeaders } from './api';

export async function getUserProfile(username: string): Promise<User> {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${username}`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("not_found");
        }
        throw new Error("Erro ao buscar usuário");
    }

    const data = await response.json();

    return userSchema.parse(data);
}
