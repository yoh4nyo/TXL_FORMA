import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import './Connexion.css';
import illustration from '../../assets/connexion_inscription.jpg';

function Connexion() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Ajouter la logique d'authentification ici
        navigate('/profil');
    };

    return (
        <div className="connexion-page">
            <Container fluid className="h-100 p-0">
                <Row className="h-100 g-0">
                    {/* Colonne Gauche - Illustration */}
                    <Col lg={6} className="d-none d-lg-block p-0">
                        <div className="h-100 w-100">
                            <img src={illustration} alt="Connexion Illustration" className="img-fluid h-100 w-100 object-fit-cover" />
                        </div>
                    </Col>

                    {/* Colonne Droite - Formulaire de connexion */}
                    <Col lg={6} className="d-flex align-items-center justify-content-center bg-light-blue position-relative overflow-auto">
                        <Link to="/" className="position-absolute top-0 start-0 m-4 text-dark-teal text-decoration-none fw-bold">
                            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                            Retour
                        </Link>

                        <Card className="connexion-card border-0 p-4 p-md-5 bg-white shadow-lg w-100" style={{ maxWidth: '500px' }}>
                            <Card.Body>
                                <div className="mb-5">
                                    <h1 className="fw-bold text-dark-teal mb-2">Bon retour !</h1>
                                    <p className="text-muted">Entrez vos coordonnées pour vous connecter.</p>
                                </div>

                                <Form onSubmit={handleLogin}>
                                    <Form.Group className="mb-4" controlId="identifiant">
                                        <Form.Label className="fw-bold small">Identifiant ou adresse mail</Form.Label>
                                        <Form.Control type="text" placeholder="Entrez votre identifiant" className="bg-white border-0 shadow-sm" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label className="fw-bold small">Mot de passe</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="bg-white border-0 shadow-sm pe-5"
                                            />
                                            <Button
                                                variant="link"
                                                className="position-absolute top-50 end-0 translate-middle-y text-muted text-decoration-none pe-3"
                                                onClick={togglePasswordVisibility}
                                            >
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </Button>
                                        </div>
                                    </Form.Group>

                                    <div className="d-flex justify-content-end mb-4">
                                        <a href="#" className="text-muted small text-decoration-none">Mot de passe oublié ?</a>
                                    </div>

                                    <Button size="lg" type="submit" className="w-100 mb-4 rounded-3 fw-bold btn-connexion-submit">
                                        Connexion
                                    </Button>

                                    <div className="text-center">
                                        <span className="text-muted">Vous n'avez pas de compte ? </span>
                                        <Link to="/inscription" className="text-teal fw-bold text-decoration-none">S'inscrire</Link>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Connexion;
