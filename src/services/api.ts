export function getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {};

    if (import.meta.env.VITE_GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`;
    }

    return headers;
}
