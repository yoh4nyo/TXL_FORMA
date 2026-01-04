import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/connexion" state={{ from: location.pathname }} />;
};

export const AdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/connexion" state={{ from: location.pathname }} />;
    }

    return isAdmin ? children : <Navigate to="/" />;
};

export const FormateurRoute = ({ children }) => {
    const { isAuthenticated, isFormateur, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/connexion" state={{ from: location.pathname }} />;
    }

    return isFormateur ? children : <Navigate to="/" />;
};

export const EleveRoute = ({ children }) => {
    const { isAuthenticated, isEleve, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/connexion" state={{ from: location.pathname }} />;
    }

    return isEleve ? children : <Navigate to="/" />;
};
