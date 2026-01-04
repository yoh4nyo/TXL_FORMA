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
            const [admins, eleves, intervenants] = await Promise.all([
                apiClient.get('/admin').catch(() => []),
                apiClient.get('/eleve').catch(() => []),
                apiClient.get('/intervenant').catch(() => [])
            ]);

            let foundUser = null;
            
            foundUser = admins.find(u => u.identifiant === identifiant);
            if (!foundUser) {
                foundUser = eleves.find(u => u.identifiant === identifiant);
            }
            if (!foundUser) {
                foundUser = intervenants.find(u => u.identifiant === identifiant);
            }

            if (!foundUser) {
                throw new Error('Identifiant ou mot de passe incorrect');
            }

            if (foundUser.password !== password) {
                throw new Error('Identifiant ou mot de passe incorrect');
            }

            const userData = {
                id: foundUser.id,
                identifiant: foundUser.identifiant,
                role: foundUser.role,
                nom: foundUser.nom,
                prenom: foundUser.prenom,
                mail: foundUser.mail
            };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            
            return userData;
        } catch (error) {
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
