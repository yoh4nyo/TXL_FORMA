import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/txlformatblanc.png';
import gustaveEiffel from '../../assets/1200px-Logo_Universite_Gustave_Eiffel_2020.svg.png';
import visaLogo from '../../assets/Visa_Inc._logo.svg.png';
import stripeLogo from '../../assets/stripe_logo.png';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row className="footer-main">
                    <Col lg={2} md={4} sm={6} className="footer-col">
                        <h5 className="footer-title">Qui sommes nous ?</h5>
                        <ul className="footer-links">
                            <li><a href="#">En bref</a></li>
                            <li><a href="#">Notre histoire</a></li>
                            <li><a href="#">Nos publications</a></li>
                            <li><a href="#">Notre GitHub</a></li>
                        </ul>
                    </Col>

                    <Col lg={2} md={4} sm={6} className="footer-col">
                        <h5 className="footer-title">Actualités</h5>
                        <ul className="footer-links">
                            <li><a href="#">Nos formations</a></li>
                            <li><a href="#">Nos formateurs</a></li>
                            <li><a href="#">MAYY Corporation</a></li>
                        </ul>
                    </Col>

                    <Col lg={2} md={4} sm={6} className="footer-col">
                        <h5 className="footer-title">Obtenir de l'aide</h5>
                        <ul className="footer-links">
                            <li><a href="#">Nous Contacter</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Réclamations</a></li>
                            <li><a href="#">Modalités de paiements</a></li>
                        </ul>
                    </Col>

                    <Col lg={2} md={4} sm={6} className="footer-col">
                        <h5 className="footer-title">À propos</h5>
                        <ul className="footer-links">
                            <li><a href="#">Mentions légales</a></li>
                            <li><a href="#">Cookies</a></li>
                            <li><a href="#">Politique de protection des données</a></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6} className="footer-col footer-social-col">
                        <h5 className="footer-title">Retrouvez nous sur</h5>
                        <div className="social-icons">
                            <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="social-icon"><i className="bi bi-youtube"></i></a>
                            <a href="#" className="social-icon"><i className="bi bi-twitter-x"></i></a>
                        </div>
                        <div className="partner-logo">
                            <img src={gustaveEiffel} alt="Université Gustave Eiffel" className="gustave-logo" />
                        </div>
                    </Col>
                </Row>

                <div className="footer-bottom">
                    <div className="footer-brand">
                        <img src={logo} alt="TXL Formation" className="footer-logo-img" />
                        <span className="brand-date">© 2025 TXLFORMA</span>
                    </div>

                    <div className="footer-payments">
                        <img src={visaLogo} alt="Visa" />
                        <img src={stripeLogo} alt="Stripe" />
                    </div>

                    <div className="footer-legal">
                        <a href="#">⚬ FR</a>
                        <span className="footer-credit">Projet étudiant - Yannis, Yohan, Mathias et Alexandre</span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
