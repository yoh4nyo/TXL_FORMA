import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/txlformatblanc.png';
import '../MenuAdmin/MenuAdmin.css';

const MenuFormateur = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formateurId } = useParams();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <img src={logo} alt="TXL Forma" className="sidebar-logo" />
                </div>

                <nav className="sidebar-nav">
                    <NavLink to={`/formateur/${formateurId}/profil`} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                        <span>Profil</span>
                    </NavLink>
                    <NavLink to={`/formateur/${formateurId}/formations`} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faBook} className="sidebar-icon" />
                        <span>Formations</span>
                    </NavLink>
                </nav>

                <div className="mt-auto mb-3">
                    <button onClick={handleLogout} className="sidebar-link w-100 border-0 bg-transparent text-start">
                        <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
                        <span>Déconnexion</span>
                    </button>
                </div>

                <div className="sidebar-footer">
                    <span className="sidebar-copyright">© 2025 TXL FORMA</span>
                </div>
            </aside>

            <div className="admin-main">
                <main className="admin-content">
                    <div key={location.pathname} className="page-transition">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MenuFormateur;
