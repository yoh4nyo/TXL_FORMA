import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Accordion, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faClock, faUserGraduate, faStar, faUndo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './NosFormations.css';
import { allCourses } from '../../data/mockData';

function NosFormations() {
    const navigate = useNavigate();

    const [selectedDomains, setSelectedDomains] = useState(['all']);
    const [selectedDurations, setSelectedDurations] = useState(['all']);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const courses = allCourses;

    const handleDomainChange = (domain) => {
        setCurrentPage(1);
        if (domain === 'all') {
            setSelectedDomains(['all']);
        } else {
            let newDomains = selectedDomains.filter(d => d !== 'all');
            if (newDomains.includes(domain)) {
                newDomains = newDomains.filter(d => d !== domain);
            } else {
                newDomains.push(domain);
            }

            if (newDomains.length === 0) {
                setSelectedDomains(['all']);
            } else {
                setSelectedDomains(newDomains);
            }
        }
    };

    const handleDurationChange = (duration) => {
        setCurrentPage(1);
        if (duration === 'all') {
            setSelectedDurations(['all']);
        } else {
            let newDurations = selectedDurations.filter(d => d !== 'all');
            if (newDurations.includes(duration)) {
                newDurations = newDurations.filter(d => d !== duration);
            } else {
                newDurations.push(duration);
            }

            if (newDurations.length === 0) {
                setSelectedDurations(['all']);
            } else {
                setSelectedDurations(newDurations);
            }
        }
    };

    const handleReset = () => {
        setSelectedDomains(['all']);
        setSelectedDurations(['all']);
    };

    const domainsList = [
        "Réseaux et télécoms",
        "Administration système",
        "Développement Front",
        "Développement Back",
        "Bureautique",
        "Cybersécurité",
        "Conduite de projets"
    ];

    const stats = [
        { number: "150+", label: "Formations disponibles" },
        { number: "12K+", label: "Personnes formées" },
        { number: "95%", label: "Taux de satisfaction" },
        { number: "50+", label: "Formateurs experts" }
    ];

    const filteredCourses = courses.filter(course => {
        const domainMatch = selectedDomains.includes('all') || selectedDomains.includes(course.category);
        return domainMatch;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

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
                                            <Form.Check
                                                type="checkbox"
                                                label="Toutes nos formations"
                                                className="mb-2 small"
                                                checked={selectedDomains.includes('all')}
                                                onChange={() => handleDomainChange('all')}
                                            />
                                            {domainsList.map((domain, index) => (
                                                <Form.Check
                                                    key={index}
                                                    type="checkbox"
                                                    label={domain}
                                                    className="mb-2 small"
                                                    checked={selectedDomains.includes(domain)}
                                                    onChange={() => handleDomainChange(domain)}
                                                />
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Durée</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Check
                                                type="checkbox"
                                                label="Toutes durées"
                                                className="mb-2 small"
                                                checked={selectedDurations.includes('all')}
                                                onChange={() => handleDurationChange('all')}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="Courte (< 1 mois)"
                                                className="mb-2 small"
                                                checked={selectedDurations.includes('Courte (< 1 mois)')}
                                                onChange={() => handleDurationChange('Courte (< 1 mois)')}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="Longue (> 3 mois)"
                                                className="mb-2 small"
                                                checked={selectedDurations.includes('Longue (> 3 mois)')}
                                                onChange={() => handleDurationChange('Longue (> 3 mois)')}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                                <Button className="w-100 mt-3 rounded-4 fw-bold btn-outline-teal" onClick={handleReset}>
                                    <FontAwesomeIcon icon={faUndo} className="me-2" /> Réinitialiser
                                </Button>
                            </div>
                        </Col>

                        <Col lg={9}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold text-teal mb-0">Nos formations</h4>
                                <p className="text-muted small mb-0">{courses.length} formations disponibles</p>
                            </div>

                            <div className="nf-courses-list d-flex flex-column gap-4">
                                {currentCourses.map((course) => (
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
                                                            <Button variant="dark-teal" className="btn-discover rounded-3" onClick={() => navigate(course.path)}>Découvrir</Button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="d-flex justify-content-center mt-5">
                                    <Button
                                        variant="outline-secondary"
                                        className="me-2 rounded-circle"
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        &lt;
                                    </Button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <Button
                                            key={i}
                                            variant={currentPage === i + 1 ? "dark-teal" : "outline-secondary"}
                                            className="mx-1 rounded-circle"
                                            onClick={() => paginate(i + 1)}
                                            style={{ width: '40px', height: '40px' }}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline-secondary"
                                        className="ms-2 rounded-circle"
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        &gt;
                                    </Button>
                                </div>
                            )}
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
