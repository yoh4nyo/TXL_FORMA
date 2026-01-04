const API_BASE_URL = 'http://localhost:8080/api';

const defaultHeaders = {
    'Content-Type': 'application/json',
};

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`.replace(/(?<!:)\/\/+/g, '/'), {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(errorText || 'Erreur API');
        error.status = response.status;
        throw error;
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    return null;
}

export const apiClient = {
    get: (endpoint) => request(endpoint, { method: 'GET' }),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export const API_BASE = API_BASE_URL;
