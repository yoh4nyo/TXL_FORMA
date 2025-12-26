import { Container, Row, Col, Form, Button, Card, Accordion, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faClock, faUserGraduate, faStar, faUndo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './NosFormations.css';

function NosFormations() {
    const navigate = useNavigate();

    const stats = [
        { number: "150+", label: "Formations disponibles" },
        { number: "12K+", label: "Personnes formées" },
        { number: "95%", label: "Taux de satisfaction" },
        { number: "50+", label: "Formateurs experts" }
    ];

    const courses = [
        {
            id: 1,
            title: "VLAN",
            category: "Réseaux et cybersécurité",
            description: "Gérer itérativement le cycle de vie d'une solution VLAN",
            students: "100 étudiants",
            rating: "4.8 (256 avis)",
            duration: "130 Heures",
            schedule: "3 Mois",
            price: "29,99€",
            instructor: "Yohan SOM",
            role: "Formateur CEO DE TXL FORMA",
            image: "https://img.freepik.com/free-photo/network-technician-working-server-room_1098-18182.jpg?t=st=1735032000~exp=1735035600~hmac=abcdef",
            instructorImg: "https://placehold.co/50x50/0E5555/ffffff?text=YS"
        },
        {
            id: 2,
            title: "Symfony",
            category: "Développement Back",
            description: "Maîtrisez Symfony pour créer des projets web performants",
            students: "24 étudiants",
            rating: "5.0 (3 avis)",
            duration: "60 Heures",
            schedule: "2 Mois",
            price: "29,99€",
            instructor: "Mathias RAKOTOMAVO",
            role: "Formateur CTO DE TXL FORMA",
            badgeColor: "success",
            image: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg?t=st=1735032000~exp=1735035600~hmac=abcdef",
            instructorImg: "https://placehold.co/50x50/198754/ffffff?text=MR"
        },
        {
            id: 3,
            title: "Angular",
            category: "Développement Front",
            description: "Apprenez à créer des applications web modernes avec Angular",
            students: "87 étudiants",
            rating: "4.7 (37 avis)",
            duration: "170 Heures",
            schedule: "2 Mois",
            price: "29,99€",
            instructor: "Alexandre LOPIRE",
            role: "Formateur CACAO DE TXL FORMA",
            image: "https://img.freepik.com/free-photo/ui-ux-representations-with-laptop_23-2150201871.jpg?t=st=1735032000~exp=1735035600~hmac=abcdef",
            instructorImg: "https://placehold.co/50x50/dc3545/ffffff?text=AL"
        },
        {
            id: 4,
            title: "Windows server",
            category: "Administration système",
            description: "Apprenez à administrer Windows Server efficacement",
            students: "87 étudiants",
            rating: "4.7 (37 avis)",
            duration: "130 Heures",
            schedule: "3 Mois",
            price: "29,99€",
            instructor: "Yannis CAMUIN",
            role: "Formateur CFA DE TXL FORMA",
            image: "https://img.freepik.com/free-photo/server-room-datacenter_1203-9118.jpg?t=st=1735032000~exp=1735035600~hmac=abcdef",
            instructorImg: "https://placehold.co/50x50/0d6efd/ffffff?text=YC"
        }
    ];

    return (
        <div className="nos-formations-page">
            <section className="nf-hero">
                <Container className="text-center text-white nf-hero-content">
                    <h1 className="nf-hero-title mb-3">
                        Trouvez la formation <span className="text-teal-light">faite pour vous</span>
                    </h1>
                    <p className="nf-hero-subtitle mb-5">
                        Explorez nos 150+ formations et trouvez celle qui correspond à vos objectifs. Que vous soyez débutant ou confirmé, nous avons un programme pour vous.
                    </p>
                </Container>
            </section>

            <div className="nf-stats-bar-wrapper">
                <Container>
                    <div className="nf-stats-bar bg-white rounded-4 shadow-sm p-4 d-flex justify-content-between align-items-center flex-wrap">
                        {stats.map((stat, idx) => (
                            <div className="nf-stat-item text-center flex-grow-1" key={idx}>
                                <h3 className="fw-bold text-teal mb-0">{stat.number}</h3>
                                <p className="text-muted small mb-0">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            <section className="nf-content-section section">
                <Container>
                    <Row>
                        <Col lg={3} className="mb-4">
                            <div className="nf-search-box mb-4">
                                <div className="position-relative">
                                    <Form.Control type="text" placeholder="Rechercher une formation..." className="nf-search-input" />
                                    <FontAwesomeIcon icon={faSearch} className="nf-search-icon text-muted" />
                                </div>
                            </div>

                            <div className="nf-filters-card bg-white rounded-4 shadow-sm p-3">
                                <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                                    <FontAwesomeIcon icon={faFilter} className="text-teal me-2" />
                                    <h5 className="fw-bold mb-0">Filtres</h5>
                                </div>

                                <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen flush className="filters-accordion">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Domaines</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Check type="checkbox" label="Toutes nos formations" className="mb-2 small" defaultChecked />
                                            <Form.Check type="checkbox" label="Réseaux" className="mb-2 small" />
                                            <Form.Check type="checkbox" label="Développement" className="mb-2 small" />
                                            <Form.Check type="checkbox" label="Système" className="mb-2 small" />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Durée</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Check type="checkbox" label="Toutes durées" className="mb-2 small" defaultChecked />
                                            <Form.Check type="checkbox" label="Courte (< 1 mois)" className="mb-2 small" />
                                            <Form.Check type="checkbox" label="Longue (> 3 mois)" className="mb-2 small" />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Heures</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Check type="checkbox" label="Toutes heures" className="mb-2 small" defaultChecked />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                                <Button variant="teal" className="w-100 mt-3 btn-reset-filters">
                                    <FontAwesomeIcon icon={faUndo} className="me-2" /> Réinitialiser
                                </Button>
                            </div>
                        </Col>

                        <Col lg={9}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold mb-0">Nos formations</h4>
                                <p className="text-muted small mb-0">4 formations disponibles</p>
                            </div>

                            <div className="nf-courses-list d-flex flex-column gap-4">
                                {courses.map((course) => (
                                    <Card className="nf-course-card border-0 shadow-sm rounded-4 overflow-hidden" key={course.id}>
                                        <Row className="g-0 h-100">
                                            <Col md={4} className="position-relative">
                                                <div className="nf-card-img h-100" style={{ backgroundImage: `url(${course.image})` }}></div>
                                                <Badge className="nf-category-badge position-absolute top-0 start-0 m-3">{course.category}</Badge>
                                            </Col>
                                            <Col md={8}>
                                                <Card.Body className="h-100 d-flex flex-column p-4">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <h3 className="fw-bold mb-0">{course.title}</h3>
                                                        <Badge bg="white" text="dark" className="border shadow-sm p-2 rounded-3">
                                                            <FontAwesomeIcon icon={faStar} className="text-warning me-1" /> {course.rating}
                                                        </Badge>
                                                    </div>

                                                    <p className="text-muted mb-3 flex-grow-1">{course.description}</p>

                                                    <div className="d-flex align-items-center gap-4 mb-4 text-muted small">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <FontAwesomeIcon icon={faUserGraduate} /> {course.students}
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <FontAwesomeIcon icon={faClock} /> {course.duration}
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <i className="bi bi-calendar"></i> {course.schedule}
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                                        <div className="d-flex align-items-center">
                                                            <img src={course.instructorImg} alt={course.instructor} className="rounded-circle me-3" width="40" height="40" />
                                                            <div>
                                                                <p className="fw-bold mb-0 small">{course.instructor}</p>
                                                                <p className="text-muted extra-small mb-0">{course.role}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-end">
                                                            <h4 className="fw-bold text-teal mb-0">{course.price}</h4>
                                                            <p className="text-muted extra-small mb-1">par formation</p>
                                                            <Button variant="dark-teal" className="btn-discover rounded-3">Découvrir</Button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Section CTA Expert */}
            <section className="nf-expert-cta bg-dark-teal text-white py-5 mt-5">
                <Container className="text-center">
                    <h2 className="fw-bold mb-3">Vous êtes expert dans votre domaine ?</h2>
                    <h3 className="text-teal-light mb-4">Partagez votre savoir !</h3>
                    <p className="mb-4 opacity-75" style={{ maxWidth: '700px', margin: '0 auto' }}>
                        Rejoignez notre équipe de formateurs passionnés et transformez la vie de milliers d'apprenants.
                        Rémunération attractive et outils professionnels à votre disposition.
                    </p>
                    <Button variant="light" className="btn-lg px-5 rounded-pill text-teal fw-bold" onClick={() => navigate('/devenir-formateur')}>
                        <i className="bi bi-person-plus me-2"></i>
                        Devenir formateur
                    </Button>

                    <Row className="mt-5 justify-content-center gap-5">
                        <Col xs="auto">
                            <h4 className="fw-bold text-teal-light mb-0">50+</h4>
                            <p className="small opacity-75">Formateurs actifs</p>
                        </Col>
                        <Col xs="auto">
                            <h4 className="fw-bold text-teal-light mb-0">12K+</h4>
                            <p className="small opacity-75">Personnes formées</p>
                        </Col>
                        <Col xs="auto">
                            <h4 className="fw-bold text-teal-light mb-0">95%</h4>
                            <p className="small opacity-75">Taux de satisfaction</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default NosFormations;
