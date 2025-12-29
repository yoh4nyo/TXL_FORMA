import { Container, Nav, Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/txlformatvert.png';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* Ligne 1: Logo, Recherche, Boutons */}
      <div className="header-top">
        <Container className="d-flex align-items-center justify-content-between">
          <div className="header-left">
            <Link to="/" className="header-logo">
              <img src={logo} alt="TXL Formation" className="logo-img" />
            </Link>
            <div className="header-search">
              <InputGroup>
                <InputGroup.Text className="search-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Rechercher une formation"
                  className="search-input"
                />
              </InputGroup>
            </div>
          </div>

          <div className="header-buttons">
            <Button variant="outline" className="btn-connexion" onClick={() => navigate('/inscription')}>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              S'inscrire
            </Button>
            <Button className="btn-formations" onClick={() => navigate('/nos-formations')}>
              <FontAwesomeIcon icon={faBook} className="me-2" />
              Nos formations
            </Button>
          </div>
        </Container>
      </div>

      {/* Ligne 2: Navigation */}
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
