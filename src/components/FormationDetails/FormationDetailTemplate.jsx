import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar, faCheck, faClock, faDesktop, faHeadset, faCertificate, faFileAlt, faUsers
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './FormationDetailTemplate.css';
import BookingModal from './BookingModal';

const FormationDetailTemplate = ({ formation }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    // Scroll en haut au montage
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!formation) return <div>Chargement...</div>;

    return (
        <div className="formation-details-page">
            {/* Section Héro */}
            <div className="formation-hero">
                <Container>
                    <div className="breadcrumb-custom mb-3">
                        <a href="/">Accueil</a> <span>&gt;</span>
                        <a href="/nos-formations">Nos formations</a> <span>&gt;</span>
                        <span className="text-white">{formation.title}</span>
                    </div>
                    <div className="hero-badge mb-3">
                        <FontAwesomeIcon icon={faDesktop} className="me-2" />
                        {formation.category}
                    </div>
                    <h1 className="display-3 fw-bold mb-3">{formation.title}</h1>
                    <p className="lead mb-4" style={{ maxWidth: '800px' }}>
                        {formation.description}
                    </p>
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center me-4">
                            <span className="fw-bold me-2">{formation.students} étudiants</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="rating-stars me-2">
                                <FontAwesomeIcon icon={faStar} /> {formation.rating}
                            </span>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-5">
                <Row>
                    {/* Colonne Contenu Principal */}
                    <Col lg={8}>
                        {/* Ce que vous allez apprendre */}
                        <div className="learning-box shadow-sm">
                            <h3 className="fw-bold text-dark-teal mb-4">
                                <FontAwesomeIcon icon={faCheck} className="me-2" />
                                Ce que vous allez apprendre
                            </h3>
                            <Row>
                                {formation.objectives.map((obj, index) => (
                                    <Col md={6} key={index}>
                                        <div className="check-list-item">
                                            <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                            <div>{obj}</div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        {/* Contenu du cours */}
                        <div className="mb-5">
                            <h3 className="fw-bold text-dark-teal mb-4">
                                <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                                Contenu de la formation
                            </h3>
                            <Accordion defaultActiveKey="0" className="custom-accordion">
                                {formation.modules.map((module, index) => (
                                    <Accordion.Item eventKey={index.toString()} key={module.id || index}>
                                        <Accordion.Header>
                                            <div className="d-flex justify-content-between w-100 me-3">
                                                <span className="fw-bold">
                                                    <span className="badge bg-dark-teal me-3">{index + 1}</span>
                                                    {module.title}
                                                </span>
                                                <span className="lesson-count">{module.duration} • {module.lessons} leçons</span>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="text-muted small">
                                                {module.content || "Contenu détaillé du module (Liste des leçons...)"}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                            <div className="mt-3 text-dark-teal fw-bold small">
                                {formation.totalHours} de formation • {formation.totalLessons} leçons au total
                            </div>
                        </div>

                        {/* Avis */}
                        <div className="mb-5">
                            <h3 className="fw-bold text-dark-teal mb-4">
                                <FontAwesomeIcon icon={faStar} className="me-2" />
                                Avis des étudiants
                            </h3>
                            {formation.reviews.map((review) => (
                                <div className="review-item" key={review.id}>
                                    <div className="d-flex mb-2">
                                        <div className="avatar-placeholder me-3">
                                            {review.user.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="fw-bold text-dark">{review.user}</div>
                                            <div className="text-muted small">{review.date}</div>
                                        </div>
                                        <div className="ms-auto rating-stars">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <FontAwesomeIcon key={i} icon={faStar} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="mb-0 text-muted">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </Col>

                    {/* Colonne Latérale */}
                    <Col lg={4}>
                        <div className="sidebar-sticky">
                            {/* Carte d'inscription */}
                            <Card className="price-card mb-4">
                                <Card.Img variant="top" src={formation.image} style={{ height: '200px', objectFit: 'cover' }} />
                                <Card.Body className="p-4">
                                    <div className="mb-3">
                                        <span className="price-value">{formation.price}</span>
                                        <span className="price-original">{formation.originalPrice || '99.99€'}</span>
                                    </div>
                                    <div className="text-danger small fw-bold mb-4">Offre limitée !</div>

                                    <Button variant="dark-teal" size="lg" className="w-100 mb-4 fw-bold rounded-pill" onClick={handleShow}>
                                        Choisir une date
                                    </Button>

                                    <hr className="my-4" />

                                    <div className="mb-4">
                                        <h6 className="fw-bold mb-3 small">Cette formation inclut :</h6>
                                        <div className="feature-list-item">
                                            <FontAwesomeIcon icon={faClock} className="feature-icon" />
                                            {formation.totalHours} de cours
                                        </div>
                                        <div className="feature-list-item">
                                            <FontAwesomeIcon icon={faDesktop} className="feature-icon" />
                                            Matériels à disposition
                                        </div>
                                        <div className="feature-list-item">
                                            <FontAwesomeIcon icon={faHeadset} className="feature-icon" />
                                            Support du formateur
                                        </div>
                                        <div className="feature-list-item">
                                            <FontAwesomeIcon icon={faCertificate} className="feature-icon" />
                                            Certificat de fin de formation
                                        </div>
                                    </div>

                                    <div className="bg-light p-3 rounded-3 text-center small text-success fw-bold">
                                        <FontAwesomeIcon icon={faCheck} className="me-2" />
                                        Garantie satisfait ou remboursé 30 jours
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Carte Formateur */}
                            <Card className="instructor-card p-4">
                                <h5 className="fw-bold text-dark-teal mb-4">
                                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                                    Votre formateur
                                </h5>
                                <div className="d-flex">
                                    <img src={formation.instructorImg} alt="Formateur" className="instructor-avatar me-3" />
                                    <div>
                                        <div className="fw-bold text-dark">{formation.instructorName}</div>
                                        <div className="text-muted small mb-2">{formation.instructorRole}</div>
                                        <div className="d-flex align-items-center small text-warning">
                                            <FontAwesomeIcon icon={faStar} className="me-1" />
                                            {formation.rating} note moyenne
                                        </div>
                                        <div className="small text-muted">
                                            {formation.instructorStudents} étudiants
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>


            <BookingModal
                show={showModal}
                handleClose={handleClose}
                formationTitle={formation.title}
                formationPrice={formation.price}
            />
        </div >
    );
};

export default FormationDetailTemplate;
