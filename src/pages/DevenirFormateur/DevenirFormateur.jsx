
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChalkboardTeacher, faHandHoldingUsd, faLifeRing, faUserGraduate, faLaptopCode, faUsers, faFileAlt, faComments, faVideo, faIdCard } from '@fortawesome/free-solid-svg-icons';
import './DevenirFormateur.css';

function DevenirFormateur() {
    const benefits = [
        {
            icon: faChalkboardTeacher,
            title: "Impact",
            text: "Transformez la carrière de milliers d'apprenants en partageant votre expertise."
        },
        {
            icon: faHandHoldingUsd,
            title: "Rémunération",
            text: "Bénéficiez d'une rémunération attractive et de bonus basés sur la satisfaction."
        },
        {
            icon: faLifeRing,
            title: "Soutien",
            text: "Accès complet à des outils pédagogiques, ressources et une équipe dédiée."
        }
    ];

    const requirements = [
        {
            icon: faUserGraduate,
            title: "Pédagogie et Passion",
            text: "Capacité à transmettre vos connaissances et avoir de la passion pour l'enseignement."
        },
        {
            icon: faLaptopCode,
            title: "Expertise Solide",
            text: "Un niveau d'expérience prouvé dans votre domaine avec des réalisations concrètes."
        },
        {
            icon: faUsers,
            title: "Qualités Humaines",
            text: "Professionnalisme, écoute active et bienveillance envers les apprenants."
        },
        {
            icon: faCheckCircle,
            title: "Disponibilité",
            text: "Un engagement à créer et animer un certain volume de formations de qualité."
        }
    ];

    const processSteps = [
        {
            number: "1",
            icon: faFileAlt,
            title: "Soumission de votre candidature",
            text: "Remplissez notre formulaire en ligne avec votre CV, lettre de motivation et portfolio."
        },
        {
            number: "2",
            icon: faComments,
            title: "Évaluation de l'expertise",
            text: "Entretien technique et revue de vos travaux avec nos RH."
        },
        {
            number: "3",
            icon: faVideo,
            title: "Test pédagogique",
            text: "Micro-leçon ou session de simulation avec notre équipe pédagogique."
        },
        {
            number: "4",
            icon: faIdCard,
            title: "Intégration et formation",
            text: "Formation aux outils, à la plateforme et à la méthodologie de l'organisme."
        }
    ];

    const experts = [
        { name: "Alexandre BRASSEUR", role: "Développement Frontend", since: "6 ans chez TXL FORMA", students: "8 500 élèves", img: "https://placehold.co/150x150/0E5555/ffffff?text=AB" },
        { name: "Mathias RAKOTOMAVO", role: "Développement Backend", since: "5 ans chez TXL FORMA", students: "7 200 élèves", img: "https://placehold.co/150x150/0E5555/ffffff?text=MR" },
        { name: "Yannis CAMELIN", role: "Administration Réseaux", since: "7 ans chez TXL FORMA", students: "6 800 élèves", img: "https://placehold.co/150x150/0E5555/ffffff?text=YC" },
        { name: "Marie DUPONT", role: "Design UI/UX", since: "4 ans chez TXL FORMA", students: "5 400 élèves", img: "https://placehold.co/150x150/0E5555/ffffff?text=MD" },
        { name: "Thomas BERNARD", role: "Infrastructure DevOps", since: "5 ans chez TXL FORMA", students: "6 100 élèves", img: "https://placehold.co/150x150/0E5555/ffffff?text=TB" },
    ];

    return (
        <div className="devenir-formateur-page">
            <section className="df-hero">
                <Container className="text-center text-white df-hero-content">
                    <h1 className="df-hero-title mb-3">
                        Devenir <span className="text-teal-light">formateur</span>
                    </h1>
                    <p className="df-hero-subtitle mb-4">
                        Partagez votre expertise et transformez la vie de milliers d'apprenants.
                        Rejoignez une communauté de plus de 50 formateurs passionnés.
                    </p>
                </Container>
            </section>

            <section className="df-section bg-white text-center">
                <Container>
                    <h2 className="section-title mb-5">Pourquoi nous rejoindre ?</h2>
                    <p className="text-muted mb-5 section-subtitle">Devenez formateur et transformez votre expertise en succès pour nos apprenants.</p>
                    <Row className="g-4 justify-content-center">
                        {benefits.map((benefit, idx) => (
                            <Col md={4} key={idx}>
                                <Card className="df-card h-100 border-0 shadow-sm p-3">
                                    <div className="df-icon-wrapper mb-3 mx-auto">
                                        <FontAwesomeIcon icon={benefit.icon} className="df-icon" />
                                    </div>
                                    <Card.Body>
                                        <Card.Title className="fw-bold mb-3">{benefit.title}</Card.Title>
                                        <Card.Text className="text-muted small">
                                            {benefit.text}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <section className="df-section bg-light-blue text-center">
                <Container>
                    <h2 className="section-title mb-5">Qui recherchons nous ?</h2>
                    <Row className="g-4 justify-content-center">
                        {requirements.map((req, idx) => (
                            <Col md={6} key={idx}>
                                <div className="df-req-card bg-white p-4 rounded-4 shadow-sm d-flex align-items-start text-start h-100">
                                    <div className="df-req-icon-box me-3">
                                        <FontAwesomeIcon icon={req.icon} className="text-white" />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-2">{req.title}</h5>
                                        <p className="text-muted small mb-0">{req.text}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <section className="df-section bg-white text-center">
                <Container>
                    <h2 className="section-title mb-2">Le processus de candidature</h2>
                    <p className="text-muted mb-5 section-subtitle">Un parcours simple et transparent en 4 étapes.</p>

                    <div className="process-timeline position-relative">
                        <div className="timeline-line"></div>

                        {processSteps.map((step, idx) => (
                            <div className="timeline-item mb-5 position-relative" key={idx}>
                                <div className="timeline-number-box">{step.number}</div>
                                <div className="timeline-content p-4 rounded-4 shadow-sm bg-white mx-auto">
                                    <div className="d-flex align-items-center mb-2 justify-content-center justify-content-md-start">
                                        <h5 className="fw-bold mb-0 me-2">{step.title}</h5>
                                        <FontAwesomeIcon icon={step.icon} className="text-teal-light" />
                                    </div>
                                    <p className="text-muted small mb-0 text-center text-md-start">
                                        {step.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="df-section bg-white text-center pt-0">
                <Container>
                    <h2 className="section-title mb-2">Rejoignez plus de 500 formateurs experts</h2>
                    <p className="text-muted mb-5 section-subtitle">Ils ont choisi de partager leur passion avec TXL FORMA</p>

                    <Row className="g-4 justify-content-center">
                        {experts.map((expert, idx) => (
                            <Col xs={6} md={3} lg={2} key={idx} className="d-flex justify-content-center">
                                <Card className="expert-card border-0 text-center h-100 w-100">
                                    <div className="expert-img-wrapper mx-auto mb-3">
                                        <img src={expert.img} alt={expert.name} className="expert-img rounded-circle img-fluid" />
                                    </div>
                                    <Card.Body className="p-0">
                                        <h6 className="fw-bold mb-1">{expert.name}</h6>
                                        <p className="text-teal small fw-bold mb-1">{expert.role}</p>
                                        <p className="text-muted extra-small mb-0">🕒 {expert.since}</p>
                                        <p className="text-muted extra-small mb-0">👥 {expert.students}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default DevenirFormateur;
