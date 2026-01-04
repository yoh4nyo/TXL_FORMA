
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { apiClient } from '../../api/client';
import './Inscription.css';

function Inscription() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        mail: '',
        identifiant: '',
        mdp: '',
        adresse: '',
        terms: false
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.terms) {
            setError('Vous devez accepter les Conditions Générales d\'Utilisation');
            return;
        }

        if (!formData.nom || !formData.prenom || !formData.mail || !formData.identifiant || !formData.mdp) {
            setError('Veuillez remplir tous les champs obligatoires');
            return;
        }

        setIsLoading(true);

        try {
            const [admins, eleves, intervenants] = await Promise.all([
                apiClient.get('/admin').catch(() => []),
                apiClient.get('/eleve').catch(() => []),
                apiClient.get('/intervenant').catch(() => [])
            ]);

            const allUsers = [...admins, ...eleves, ...intervenants];

            const emailExists = allUsers.some(user => user.mail === formData.mail);
            if (emailExists) {
                setError('Cette adresse email est déjà utilisée');
                setIsLoading(false);
                return;
            }

            const identifiantExists = allUsers.some(user => user.identifiant === formData.identifiant);
            if (identifiantExists) {
                setError('Cet identifiant est déjà utilisé');
                setIsLoading(false);
                return;
            }

            const eleveData = {
                nom: formData.nom,
                prenom: formData.prenom,
                mail: formData.mail,
                identifiant: formData.identifiant,
                password: formData.mdp,
                adresse: formData.adresse,
                role: 'ROLE_ELEVE'
            };

            await apiClient.post('/eleve', eleveData);
            alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
            navigate('/connexion');
        } catch (err) {
            console.error('Erreur lors de l\'inscription:', err);
            setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
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
                                    {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
                                    
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="nom">
                                                <Form.Label className="fw-bold small">Nom</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Votre nom" 
                                                    className="bg-white border-0 shadow-sm" 
                                                    name="nom"
                                                    value={formData.nom}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="prenom">
                                                <Form.Label className="fw-bold small">Prénom</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Votre prénom" 
                                                    className="bg-white border-0 shadow-sm" 
                                                    name="prenom"
                                                    value={formData.prenom}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label className="fw-bold small">Adresse mail</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="exemple@email.com" 
                                            className="bg-white border-0 shadow-sm" 
                                            name="mail"
                                            value={formData.mail}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="adresse">
                                        <Form.Label className="fw-bold small">Adresse</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Votre adresse" 
                                            className="bg-white border-0 shadow-sm" 
                                            name="adresse"
                                            value={formData.adresse}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="identifiant">
                                        <Form.Label className="fw-bold small">Identifiant</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Choisissez un identifiant" 
                                            className="bg-white border-0 shadow-sm" 
                                            name="identifiant"
                                            value={formData.identifiant}
                                            onChange={handleChange}
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
                                                name="mdp"
                                                value={formData.mdp}
                                                onChange={handleChange}
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

                                    <Form.Group className="mb-4" controlId="terms">
                                        <Form.Check 
                                            type="checkbox" 
                                            label={<span className="small text-muted">J'accepte les <a href="#" className="text-teal text-decoration-none">Conditions Générales d'Utilisation</a></span>}
                                            name="terms"
                                            checked={formData.terms}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Button 
                                        variant="dark-teal" 
                                        size="lg" 
                                        type="submit" 
                                        className="w-100 mb-4 rounded-3 fw-bold btn-inscription-submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
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
