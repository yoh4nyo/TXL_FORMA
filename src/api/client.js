const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(endpoint, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    const isGetRequest = method === 'GET';
    const url = `${API_BASE_URL}${endpoint}`.replace(/(?<!:)\/\/+/g, '/');

    const headers = {
        ...(options.headers || {}),
    };

    if (options.body !== undefined && options.body !== null && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    const maxAttempts = isGetRequest ? 3 : 1;
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
            const response = await fetch(url, {
                ...options,
                method,
                cache: isGetRequest ? 'no-store' : options.cache,
                headers,
            });

            if (!response.ok) {
                let errorData;
                const contentType = response.headers.get('content-type');
                try {
                    if (contentType && contentType.includes('application/json')) {
                        errorData = await response.json();
                    } else {
                        errorData = await response.text();
                    }
                } catch {
                    errorData = await response.text();
                }

                const error = new Error('Erreur API');
                error.status = response.status;
                error.response = { data: errorData };

                const shouldRetry = isGetRequest && RETRYABLE_STATUS.has(response.status) && attempt < maxAttempts;
                if (shouldRetry) {
                    await wait(250 * attempt);
                    continue;
                }

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
        } catch (error) {
            const status = error?.status;
            const isNetworkError = error instanceof TypeError;
            const shouldRetry = isGetRequest && attempt < maxAttempts && (isNetworkError || RETRYABLE_STATUS.has(status));

            if (shouldRetry) {
                lastError = error;
                await wait(250 * attempt);
                continue;
            }

            throw error;
        }
    }

    throw lastError || new Error('Erreur API');
}

export const apiClient = {
    get: (endpoint) => request(endpoint, { method: 'GET' }),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export const API_BASE = API_BASE_URL;
