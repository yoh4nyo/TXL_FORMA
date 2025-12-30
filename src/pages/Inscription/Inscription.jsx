
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import './Inscription.css';

function Inscription() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/profil');
    };

    return (
        <div className="inscription-page">
            <Container fluid className="h-100 p-0">
                <Row className="h-100 g-0 justify-content-center align-items-center">
                    <Col xs={12} md={8} lg={6} xl={5} className="d-flex align-items-center justify-content-center bg-light-blue p-4">
                        <Card className="inscription-card border-0 p-4 p-md-5 bg-white shadow-lg w-100" style={{ maxWidth: '600px' }}>
                            <Card.Body>
                                <div className="mb-4">
                                    <h1 className="fw-bold text-dark-teal mb-2">Inscription</h1>
                                    <p className="text-muted">Créez votre compte pour commencer à apprendre.</p>
                                </div>

                                <Form onSubmit={handleRegister}>
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="nom">
                                                <Form.Label className="fw-bold small">Nom</Form.Label>
                                                <Form.Control type="text" placeholder="Votre nom" className="bg-white border-0 shadow-sm" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="prenom">
                                                <Form.Label className="fw-bold small">Prénom</Form.Label>
                                                <Form.Control type="text" placeholder="Votre prénom" className="bg-white border-0 shadow-sm" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label className="fw-bold small">Adresse mail</Form.Label>
                                        <Form.Control type="email" placeholder="exemple@email.com" className="bg-white border-0 shadow-sm" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="identifiant">
                                        <Form.Label className="fw-bold small">Identifiant</Form.Label>
                                        <Form.Control type="text" placeholder="Choisissez un identifiant" className="bg-white border-0 shadow-sm" />
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

                                    <Form.Group className="mb-4" controlId="terms">
                                        <Form.Check type="checkbox" label={<span className="small text-muted">J'accepte les <a href="#" className="text-teal text-decoration-none">Conditions Générales d'Utilisation</a></span>} />
                                    </Form.Group>

                                    <Button variant="dark-teal" size="lg" type="submit" className="w-100 mb-4 rounded-3 fw-bold btn-inscription-submit">
                                        S'inscrire
                                    </Button>

                                    <div className="text-center">
                                        <span className="text-muted">Vous avez déjà un compte ? </span>
                                        <Link to="/connexion" className="text-teal fw-bold text-decoration-none">Se connecter</Link>
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

export default Inscription;
