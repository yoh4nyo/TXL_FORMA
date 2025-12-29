import { useRef } from 'react';
import { Container, Row, Col, Button, Card, Badge, Carousel, Form } from 'react-bootstrap';
import { homeFeatures, homeFormations } from '../../data/mockData';
import heroImage from '../../assets/hero_photo_accueil.jpg';
import virtualRoomImage from '../../assets/photo_3d.png';
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
                                    <option value="1">Réseaux et télécoms</option>
                                    <option value="2">Administration système</option>
                                    <option value="3">Développement Front</option>
                                    <option value="4">Développement Back</option>
                                    <option value="5">Bureautique</option>
                                    <option value="6">Cybersécurité</option>
                                    <option value="7">Conduite de projets</option>
                                </Form.Select>
                                <Button className="btn-primary-custom">
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

                    <div className="formations-carousel">
                        <button className="carousel-arrow carousel-arrow-left" onClick={scrollLeft}>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <div className="formations-scroll-wrapper" ref={scrollRef}>
                            <div className="formations-scroll">
                                {homeFormations.map((formation) => (
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
                                                    <i className="bi bi-tag me-1"></i>
                                                    {formation.category}
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
                        <img
                            src={virtualRoomImage}
                            alt="Salle virtuelle 3D"
                            className="virtual-room-image"
                        />
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Accueil;
