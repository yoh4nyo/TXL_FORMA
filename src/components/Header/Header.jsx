import { Container, Nav, Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
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
                  <i className="bi bi-search"></i>
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
              <i className="bi bi-person"></i>
              S'inscrire
            </Button>
            <Button className="btn-formations" onClick={() => navigate('/nos-formations')}>
              <i className="bi bi-book me-2"></i>
              Nos formations
            </Button>
          </div>
        </Container>
      </div>

      {/* Ligne 2: Navigation */}
      <div className="header-nav-row">
        <Container>
          <Nav className="header-nav">
            <Nav.Link as={Link} to="/" className="nav-link-custom active">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/devenir-formateur" className="nav-link-custom">Devenir formateur</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">Nous contacter</Nav.Link>
          </Nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;
