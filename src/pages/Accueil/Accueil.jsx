import { useRef } from 'react';
import { Container, Row, Col, Button, Card, Badge, Carousel, Form } from 'react-bootstrap';
import './Accueil.css';

function Accueil() {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };
    const features = [
        {
            num: 1,
            title: "Trouvez votre formation",
            desc: "Utilisez notre catalogue pour trouver la formation qui correspond à vos objectifs professionnels."
        },
        {
            num: 2,
            title: "Inscription simplifiée",
            desc: "Un formulaire rapide avec une validation immédiate, vous êtes prêt à rejoindre la salle. De notre côté on en fait plus rien."
        },
        {
            num: 3,
            title: "Formation en présentiel",
            desc: "Retrouvez-vous dans nos salles équipées avec le groupe convivial dans les meilleures conditions d'apprentissage."
        },
        {
            num: 4,
            title: "Objectif atteint !",
            desc: "Profitez de vos nouvelles compétences acquises et d'une attestation qui permet de les valoriser dans votre domaine."
        }
    ];

    const formations = [
        {
            id: 1,
            image: "https://placehold.co/400x250/0D9488/FFFFFF?text=Réseaux+VLAN",
            title: "Réseau et télécoms : VLAN",
            badge: "Best-seller",
            badgeColor: "primary",
            level: "Intermédiaire",
            price: "315€"
        },
        {
            id: 2,
            image: "https://placehold.co/400x250/1E293B/FFFFFF?text=Linux+Admin",
            title: "Administration système : Linux",
            badge: "Très demandé",
            badgeColor: "purple",
            level: "Intermédiaire",
            price: "290€"
        },
        {
            id: 3,
            image: "https://placehold.co/400x250/DD2726/FFFFFF?text=Angular",
            title: "Développement Front : Angular",
            badge: "Best-seller",
            badgeColor: "primary",
            level: "Débutant",
            price: "230€"
        }
    ];

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
                                <Form.Select className="hero-dropdown">
                                    <option>Sélectionnez une formation</option>
                                    <option value="1">Réseau et télécoms : VLAN</option>
                                    <option value="2">Administration système : Linux</option>
                                    <option value="3">Développement Front : Angular</option>
                                </Form.Select>
                                <Button className="btn-primary-custom">
                                    Trouver ma formation ▸
                                </Button>
                            </div>
                        </Col>

                        <Col lg={6} className="hero-image-container">
                            <div className="hero-image-wrapper">
                                <img
                                    src="https://placehold.co/500x400/F9FAFB/374151?text=Formation+Photo"
                                    alt="Formation"
                                    className="hero-image"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Section Fonctionnalités */}
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
                                <Card className="feature-card">
                                    <Card.Body>
                                        <h5 className="feature-title">
                                            <span className="number-badge">1</span>
                                            Trouvez votre formation
                                        </h5>
                                        <p className="feature-desc">Parcourez notre catalogue et trouvez la formation qui correspond à vos objectifs professionnels.</p>
                                    </Card.Body>
                                </Card>
                                <Card className="feature-card">
                                    <Card.Body>
                                        <h5 className="feature-title">
                                            <span className="number-badge">2</span>
                                            Inscription simplifiée
                                        </h5>
                                        <p className="feature-desc">Un formulaire rapide, une confirmation instantanée : vous êtes prêt à rejoindre la salle. On s'occupe du reste</p>
                                    </Card.Body>
                                </Card>
                                <Card className="feature-card">
                                    <Card.Body>
                                        <h5 className="feature-title">
                                            <span className="number-badge">3</span>
                                            Formation en présentiel
                                        </h5>
                                        <p className="feature-desc">Participez à des sessions interactives, échangez avec le groupe et progressez dans une ambiance stimulante</p>
                                    </Card.Body>
                                </Card>
                                <Card className="feature-card">
                                    <Card.Body>
                                        <h5 className="feature-title">
                                            <span className="number-badge">4</span>
                                            Objectif atteint !
                                        </h5>
                                        <p className="feature-desc">Vous repartez avec des compétences solides et une attestation officielle pour booster votre carrière !</p>
                                    </Card.Body>
                                </Card>
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

                    <div className="formations-carousel">
                        <button className="carousel-arrow carousel-arrow-left" onClick={scrollLeft}>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <div className="formations-scroll-wrapper" ref={scrollRef}>
                            <div className="formations-scroll">
                                {formations.map((formation) => (
                                    <Card key={formation.id} className="formation-card">
                                        <div className="formation-image-wrapper">
                                            <Card.Img variant="top" src={formation.image} alt={formation.title} />
                                            <Badge className={`formation-badge badge-${formation.badgeColor}`}>
                                                {formation.badge}
                                            </Badge>
                                        </div>
                                        <Card.Body>
                                            <h5 className="formation-title">{formation.title}</h5>
                                            <div className="formation-meta">
                                                <Badge bg="light" text="dark" className="me-2">
                                                    <i className="bi bi-bar-chart me-1"></i>
                                                    {formation.level}
                                                </Badge>
                                            </div>
                                            <div className="formation-price">{formation.price}</div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <button className="carousel-arrow carousel-arrow-right" onClick={scrollRight}>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <Button className="btn-primary-custom">
                            Voir toutes nos formations
                        </Button>
                    </div>
                </Container>
            </section>

            <section className="section virtual-section">
                <Container>
                    <h2 className="section-title mb-5">Visitez nos salles de formation</h2>

                    <div className="virtual-room-wrapper">
                        <div className="virtual-room-content">
                            <h3 className="virtual-room-title">Intégration Salle virtuelle en 3D</h3>
                            <div className="virtual-room-placeholder">
                                <img
                                    src="https://placehold.co/1200x400/1E293B/5EEAD4?text=Visite+Virtuelle+3D"
                                    alt="Salle virtuelle 3D"
                                    className="virtual-room-image"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Accueil;
