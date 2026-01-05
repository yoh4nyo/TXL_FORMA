import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faUsers, faChalkboardTeacher, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/txlformatblanc.png';
import './MenuAdmin.css';

const MenuAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-layout">
            <button className="mobile-menu-toggle d-lg-none" onClick={toggleMobileMenu}>
                <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>

            <aside className={`admin-sidebar ${isMobileMenuOpen ? 'show' : ''}`}>
                <div className="sidebar-brand">
                    <img src={logo} alt="TXL Forma" className="sidebar-logo" />
                </div>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/admin/formations"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <FontAwesomeIcon icon={faBook} className="sidebar-icon" />
                        <span>Formations</span>
                    </NavLink>
                    <NavLink
                        to="/admin/utilisateurs"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                        <span>Utilisateurs</span>
                    </NavLink>
                    <NavLink
                        to="/admin/formateurs"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="sidebar-icon" />
                        <span>Formateurs</span>
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

export default MenuAdmin;
