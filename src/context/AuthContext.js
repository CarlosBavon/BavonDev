import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('bavdev-access-token');
        if (token) {
            api
                .get('/api/auth/me')
                .then((res) => setAdmin(res.data.data))
                .catch(() => {
                    localStorage.removeItem('bavdev-access-token');
                    localStorage.removeItem('bavdev-refresh-token');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (email, password) => {
        const res = await api.post('/api/auth/login', { email, password });
        const { accessToken, refreshToken, admin: adminData } = res.data.data;
        localStorage.setItem('bavdev-access-token', accessToken);
        localStorage.setItem('bavdev-refresh-token', refreshToken);
        setAdmin(adminData);
        return adminData;
    }, []);

    const logout = useCallback(async () => {
        try {
            await api.post('/api/auth/logout');
        } catch { } finally {
            localStorage.removeItem('bavdev-access-token');
            localStorage.removeItem('bavdev-refresh-token');
            setAdmin(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
            {children}
        </AuthContext.Provider>
    );
};