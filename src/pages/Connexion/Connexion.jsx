import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Connexion.css';

function Connexion() {
    const [showPassword, setShowPassword] = useState(false);
    const [identifiant, setIdentifiant] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const from = location.state?.from || null;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!identifiant || !password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        setLoading(true);

        try {
            const userData = await login(identifiant, password);
            
            if (from) {
                navigate(from);
            } else {
                if (userData.role === 'ROLE_ADMIN') {
                    navigate('/admin/dashboard');
                } else if (userData.role === 'ROLE_INTERVENANT') {
                    navigate(`/formateur/${userData.id}`);
                } else if (userData.role === 'ROLE_ELEVE') {
                    navigate(`/profil/${userData.id}`);
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error('Erreur de connexion:', err);
            setError(err.message || 'Identifiant ou mot de passe incorrect');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="connexion-page">
            <Container fluid className="h-100 p-0">
                <Row className="h-100 g-0 justify-content-center align-items-center">
                    <Col xs={12} md={8} lg={6} xl={4} className="d-flex align-items-center justify-content-center bg-light-blue p-4">
                        <Card className="connexion-card border-0 p-4 p-md-5 bg-white shadow-lg w-100" style={{ maxWidth: '500px' }}>
                            <Card.Body>
                                <div className="mb-5">
                                    <h1 className="fw-bold text-dark-teal mb-2">Bon retour !</h1>
                                    <p className="text-muted">Entrez vos coordonnées pour vous connecter.</p>
                                </div>

                                <Form onSubmit={handleLogin}>
                                    {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
                                    
                                    <Form.Group className="mb-4" controlId="identifiant">
                                        <Form.Label className="fw-bold small">Identifiant</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Entrez votre identifiant" 
                                            className="bg-white border-0 shadow-sm"
                                            value={identifiant}
                                            onChange={(e) => setIdentifiant(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label className="fw-bold small">Mot de passe</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="bg-white border-0 shadow-sm pe-5"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
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

                                    <Button 
                                        variant="dark-teal" 
                                        size="lg" 
                                        type="submit" 
                                        className="w-100 mb-4 rounded-3 fw-bold btn-connexion-submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Connexion en cours...' : 'Connexion'}
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
