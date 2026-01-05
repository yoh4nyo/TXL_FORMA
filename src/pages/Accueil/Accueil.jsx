import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge, Carousel, Form } from 'react-bootstrap';
import heroImage from '../../assets/hero_photo_accueil.jpg';
import virtualRoomImage from '../../assets/photo_3d.png';
import cyberImage from '../../assets/cyber.jpg';
import devFrontImage from '../../assets/front_end.png';
import projetImage from '../../assets/conduite_projet.jpg';
import { apiClient } from '../../api/client';
import './Accueil.css';
import Modele3D from '../../components/Modele3D/Modele3D';

const homeFeatures = [
    { num: 1, title: 'Choisissez votre parcours', desc: 'Identifiez la formation qui correspond à vos ambitions parmi notre large catalogue.' },
    { num: 2, title: 'Inscrivez-vous en ligne', desc: 'Créez votre compte, choisissez votre session et validez votre inscription en quelques clics.' },
    { num: 3, title: 'Apprenez avec des experts', desc: 'Suivez des cours pratiques dispensés par des professionnels reconnus dans leur domaine.' },
    { num: 4, title: 'Obtenez votre certification', desc: 'Validez vos acquis et boostez votre carrière avec une certification reconnue.' },
];

function Accueil() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleFindFormation = () => {
        if (selectedCategory) {
            navigate('/nos-formations', { state: { selectedDomain: selectedCategory } });
        } else {
            navigate('/nos-formations');
        }
    };



    const [recentFormations, setRecentFormations] = useState([]);

    useEffect(() => {
        const fetchRecentFormations = async () => {
            try {
                const data = await apiClient.get('/formation');
                if (Array.isArray(data)) {
                    // Prends les 3 dernières formations ou les 3 premières
                    setRecentFormations(data.slice(0, 3));
                }
            } catch (err) {
                console.error("Erreur lors du chargement des formations pour l'accueil:", err);
            }
        };

        fetchRecentFormations();
    }, []);

    const getFormationImage = (category) => {
        if (!category) return heroImage;
        const normalized = category.toLowerCase();
        if (normalized.includes('cyber') || normalized.includes('sécurité')) return cyberImage;
        if (normalized.includes('front') || normalized.includes('web') || normalized.includes('développement')) return devFrontImage;
        if (normalized.includes('projet') || normalized.includes('gestion')) return projetImage;
        return heroImage; // Default fallback
    };

    const getBadgeInfo = (index) => {
        const badges = [
            { text: 'Populaire', color: 'danger' },
            { text: 'Nouveau', color: 'success' },
            { text: 'Meilleure Vente', color: 'warning' }
        ];
        return badges[index % badges.length];
    };

    return (
        <div className="accueil">
            <section className="hero-section">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="hero-content">
                            <h1 className="hero-title">
                                Formez-vous aujourd'hui,<br />
                                <span className="text-primary">réussissez demain</span>
                            </h1>
                            <p className="hero-description">
                                Développez vos compétences avec nos formations professionnelles de qualité. Des programmes adaptés à tous les niveaux pour vous accompagner vers la réussite.
                            </p>
                            <div className="hero-buttons">
                                <Form.Select
                                    className="hero-dropdown"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">Sélectionnez une formation</option>
                                    <option value="Réseaux et télécoms">Réseaux et télécoms</option>
                                    <option value="Administration système">Administration système</option>
                                    <option value="Développement Front">Développement Front</option>
                                    <option value="Développement Back">Développement Back</option>
                                    <option value="Bureautique">Bureautique</option>
                                    <option value="Cybersécurité">Cybersécurité</option>
                                    <option value="Conduite de projets">Conduite de projets</option>
                                </Form.Select>
                                <Button className="btn-primary-custom" onClick={handleFindFormation}>
                                    Trouver ma formation ▸
                                </Button>
                            </div>
                        </Col>

                        <Col lg={6} className="hero-image-container">
                            <div className="hero-image-wrapper">
                                <img
                                    src={heroImage}
                                    alt="Formation"
                                    className="hero-image"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Section fonctionnalités */}
            <section className="section features-section">
                <Container fluid>
                    <p className="section-subtitle section-subtitle-dark mb-2">Le processus</p>
                    <h2 className="section-title">Comment ça fonctionne ?</h2>

                    <div className="features-wrapper">
                        <div className="features-deco-left">
                            <div className="deco-square deco-square-1"></div>
                            <div className="deco-square deco-square-2"></div>
                            <div className="deco-square deco-square-5"></div>
                            <div className="deco-square deco-square-7"></div>
                        </div>

                        <div className="features-content">
                            <div className="features-grid">
                                {homeFeatures.map((feature) => (
                                    <Card key={feature.num} className="feature-card">
                                        <Card.Body>
                                            <h5 className="feature-title">
                                                <span className="number-badge">{feature.num}</span>
                                                {feature.title}
                                            </h5>
                                            <p className="feature-desc">{feature.desc}</p>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="features-deco-right">
                            <div className="deco-square deco-square-3"></div>
                            <div className="deco-square deco-square-4"></div>
                            <div className="deco-square deco-square-6"></div>
                            <div className="deco-square deco-square-8"></div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="section formations-section">
                <Container>
                    <p className="section-subtitle section-subtitle-dark text-center mb-2">Explorer nos formations</p>
                    <h2 className="section-title text-center">Les formations que tout le monde s'arrache</h2>
                    <p className="section-description text-center text-muted mb-5">
                        Découvrez les programmes les plus demandés, choisis par ceux qui veulent aller vite et loin.
                    </p>

                    <Row className="justify-content-center">
                        {recentFormations.length > 0 ? (
                            recentFormations.map((formation, index) => {
                                const badgeInfo = getBadgeInfo(index);
                                return (
                                    <Col lg={4} md={6} sm={12} key={formation.id} className="mb-4 d-flex align-items-stretch">
                                        <Card className="formation-card w-100" onClick={() => navigate(`/formation/${formation.id}`)} style={{ cursor: 'pointer' }}>
                                            <div className="formation-image-wrapper">
                                                <Card.Img variant="top" src={getFormationImage(formation.categorie)} alt={formation.nom} style={{ height: '220px', objectFit: 'cover' }} />
                                                <Badge className={`formation-badge badge-${badgeInfo.color}`}>
                                                    {badgeInfo.text}
                                                </Badge>
                                            </div>
                                            <Card.Body>
                                                <h5 className="formation-title mt-2 mb-3" style={{ fontSize: '1.25rem' }}>{formation.nom}</h5>
                                                <div className="formation-meta mb-3">
                                                    <Badge className="me-2 p-2 badge-teal-soft">
                                                        <i className="bi bi-tag me-1"></i>
                                                        {formation.categorie}
                                                    </Badge>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                    <div className="formation-price fw-bold" style={{ fontSize: '1.5rem', color: '#0E5555' }}>{formation.prix}€</div>
                                                    <Button variant="light" className="rounded-pill px-4 btn-outline-teal" onClick={(e) => { e.stopPropagation(); navigate(`/formation/${formation.id}`); }}>
                                                        Voir
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                        ) : (
                            <div className="text-center">
                                <p>Chargement des formations...</p>
                            </div>
                        )}
                    </Row>

                    <div className="text-center mt-4">
                        <Button className="btn-primary-custom" onClick={() => navigate('/nos-formations')}>
                            Voir toutes nos formations
                        </Button>
                    </div>
                </Container>
            </section>

            <section className="section virtual-section">
                <Container>
                    <h2 className="section-title mb-5">Visitez nos salles de formation</h2>

                    <div className="virtual-room-wrapper" style={{ height: '600px', position: 'relative' }}>
                        <Modele3D />
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Accueil;
