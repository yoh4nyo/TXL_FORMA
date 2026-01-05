import { Container, Nav, Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faBook, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/txlformatvert.png';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, user, logout, isEleve } = useAuth();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/nos-formations', { state: { searchTerm: searchTerm.trim() } });
    }
  };

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      logout();
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <Container className="d-flex align-items-center justify-content-between">
          <div className="header-left">
            <Link to="/" className="header-logo">
              <img src={logo} alt="TXL Formation" className="logo-img" />
            </Link>
            <div className="header-search">
              <Form onSubmit={handleSearchSubmit}>
                <InputGroup>
                  <InputGroup.Text className="search-icon">
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Rechercher une formation"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Form>
            </div>
          </div>

          <div className="header-buttons">
            {isAuthenticated ? (
              <>
                <span className="text-muted me-3">Bonjour, {user?.prenom}</span>
                {isEleve && !location.pathname.includes('/profil') && (
                  <Button variant="outline" className="btn-connexion me-2" onClick={() => navigate(`/profil/${user.id}`)}>
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Mon profil
                  </Button>
                )}
                <Button variant="outline" className="btn-connexion" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="btn-connexion" onClick={() => navigate('/inscription')}>
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  S'inscrire
                </Button>
                <Button variant="outline" className="btn-connexion me-2" onClick={() => navigate('/connexion')}>
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Connexion
                </Button>
              </>
            )}
            <Button className="btn-formations" onClick={() => navigate('/nos-formations')}>
              <FontAwesomeIcon icon={faBook} className="me-2" />
              Nos formations
            </Button>
          </div>
        </Container>
      </div>

      <div className="header-nav-row">
        <Container>
          <Nav className="header-nav">
            <NavLink to="/" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`} end>
              Accueil
            </NavLink>
            <NavLink to="/devenir-formateur" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
              Devenir formateur
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
              Nous contacter
            </NavLink>
          </Nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;
