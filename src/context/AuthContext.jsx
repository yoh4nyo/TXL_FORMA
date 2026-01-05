import { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (identifiant, password) => {
        try {
            const response = await apiClient.post('/auth/login', {
                identifiant,
                password
            });

            if (!response.success) {
                throw new Error(response.message || 'Identifiant ou mot de passe incorrect');
            }

            const userData = {
                id: response.id,
                identifiant: response.identifiant,
                role: response.role,
                nom: response.nom,
                prenom: response.prenom,
                mail: response.mail
            };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            
            return userData;
        } catch (error) {
            // Gérer les erreurs 401 du backend
            if (error.status === 401) {
                throw new Error('Identifiant ou mot de passe incorrect');
            }
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ROLE_ADMIN',
        isFormateur: user?.role === 'ROLE_INTERVENANT',
        isEleve: user?.role === 'ROLE_ELEVE'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
