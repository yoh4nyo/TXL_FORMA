import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/connexion" state={{ from: location.pathname }} />;
};

export const OwnProfileRoute = ({ children }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();
    const { eleveId } = useParams();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/connexion" state={{ from: location.pathname }} />;
    }

    if (user && String(user.id) !== String(eleveId)) {
        return <Navigate to={`/profil/${user.id}`} />;
    }

    return children;
};

export const OwnFormateurRoute = ({ children }) => {
    const { isAuthenticated, isFormateur, user, loading } = useAuth();
    const location = useLocation();
    const { formateurId } = useParams();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/connexion" state={{ from: location.pathname }} />;
    }

    if (!isFormateur) {
        return <Navigate to="/" />;
    }

    if (user && String(user.id) !== String(formateurId)) {
        return <Navigate to={`/formateur/${user.id}`} />;
    }

    return children;
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
