import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('bavdev-access-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('bavdev-refresh-token');

            if (refreshToken) {
                try {
                    const res = await axios.post(
                        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/refresh-token`,
                        { refreshToken }
                    );
                    const { accessToken, refreshToken: newRefresh } = res.data.data;
                    localStorage.setItem('bavdev-access-token', accessToken);
                    localStorage.setItem('bavdev-refresh-token', newRefresh);
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return api(originalRequest);
                } catch {
                    localStorage.removeItem('bavdev-access-token');
                    localStorage.removeItem('bavdev-refresh-token');
                    window.location.href = '/admin';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;