import { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Accordion, Badge, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faClock, faUserGraduate, faStar, faUndo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './NosFormations.css';
import { apiClient } from '../../api/client';

function NosFormations() {
    const navigate = useNavigate();
    const location = useLocation();

    const [formations, setFormations] = useState([]);
    const [formateurs, setFormateurs] = useState([]);
    const [eleves, setEleves] = useState([]);
    const [formationStats, setFormationStats] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDomains, setSelectedDomains] = useState(['all']);
    const [selectedDurations, setSelectedDurations] = useState(['all']);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchFormations();
        fetchFormateurs();
        fetchEleves();
    }, []);

    useEffect(() => {
        if (location.state?.searchTerm) {
            setSearchTerm(location.state.searchTerm);
            setCurrentPage(1);
        }
        if (location.state?.selectedDomain) {
            setSelectedDomains([location.state.selectedDomain]);
            setCurrentPage(1);
        }
    }, [location.state]);

    useEffect(() => {
        if (formations.length > 0) {
            fetchFormationStats();
        }
    }, [formations]);

    const fetchFormations = async () => {
        setIsLoading(true);
        try {
            const data = await apiClient.get('/formation');
            setFormations(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Erreur lors du chargement des formations:", err);
            setFormations([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFormateurs = async () => {
        try {
            const data = await apiClient.get('/intervenant');
            setFormateurs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Erreur lors du chargement des formateurs:", err);
            setFormateurs([]);
        }
    };

    const fetchEleves = async () => {
        try {
            const data = await apiClient.get('/eleve');
            setEleves(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Erreur lors du chargement des élèves:", err);
            setEleves([]);
        }
    };

    const fetchFormationStats = async () => {
        const stats = {};
        for (const formation of formations) {
            try {
                const sessions = await apiClient.get(`/session/formation/${formation.id}`);
                let totalEleves = 0;
                let totalHeures = 0;

                for (const session of (Array.isArray(sessions) ? sessions : [])) {
                    try {
                        const sessionEleves = await apiClient.get(`/session_eleve/session/${session.id}`);
                        totalEleves += Array.isArray(sessionEleves) ? sessionEleves.length : 0;

                        const seances = await apiClient.get(`/seance/session/${session.id}`);
                        totalHeures += (Array.isArray(seances) ? seances : []).reduce((sum, seance) => sum + (seance.duree || 0), 0);
                    } catch (err) {
                        console.error(`Erreur stats session ${session.id}:`, err);
                    }
                }

                stats[formation.id] = {
                    students: totalEleves,
                    hours: totalHeures
                };
            } catch (err) {
                console.error(`Erreur stats formation ${formation.id}:`, err);
                stats[formation.id] = { students: 0, hours: 0 };
            }
        }
        setFormationStats(stats);
    };

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
        setSearchTerm('');
    };

    const getFormationImage = (categorie) => {
        const images = {
            "Réseaux et télécoms": "/assets/reseau_telecom.jpg",
            "Administration système": "/assets/administration_sys.jpg",
            "Développement Front": "/assets/front_end.png",
            "Développement Back": "/assets/back_end.png",
            "Bureautique": "/assets/bureautique.jpg",
            "Cybersécurité": "/assets/cyber.jpg",
            "Conduite de projets": "/assets/conduite_projet.jpg"
        };
        return images[categorie] || "/assets/reseau_telecom.jpg";
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
        { number: `${formations.length}`, label: "Formations disponibles" },
        { number: `${eleves.length}`, label: "Personnes formées" },
        { number: "95%", label: "Taux de satisfaction" },
        { number: `${formateurs.length}`, label: "Formateurs experts" }
    ];

    const filteredCourses = useMemo(() => {
        return formations.filter(formation => {
            const normalizedCategorie = formation.categorie?.toLowerCase().trim() || '';
            const domainMatch = selectedDomains.includes('all') || selectedDomains.some(domain => {
                const normalizedDomain = domain.toLowerCase().trim();
                return normalizedCategorie.includes(normalizedDomain) || normalizedDomain.includes(normalizedCategorie);
            });
            const searchMatch = searchTerm === '' || formation.nom.toLowerCase().includes(searchTerm.toLowerCase());
            return domainMatch && searchMatch;
        });
    }, [selectedDomains, formations, searchTerm]);

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
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Rechercher une formation..." 
                                        className="nf-search-input"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                    <FontAwesomeIcon icon={faSearch} className="nf-search-icon text-muted" />
                                </div>
                            </div>

                            <div className="nf-filters-card bg-white rounded-4 shadow-sm p-3">
                                <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                                    <FontAwesomeIcon icon={faFilter} className="text-teal me-2" />
                                    <h5 className="fw-bold mb-0">Filtres</h5>
                                </div>

                                <Accordion defaultActiveKey={['0']} alwaysOpen flush className="filters-accordion">
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
                                </Accordion>

                                <Button className="w-100 mt-3 rounded-4 fw-bold btn-outline-teal" onClick={handleReset}>
                                    <FontAwesomeIcon icon={faUndo} className="me-2" /> Réinitialiser
                                </Button>
                            </div>
                        </Col>

                        <Col lg={9}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold text-teal mb-0">Nos formations</h4>
                                <p className="text-muted small mb-0">{formations.length} formations disponibles</p>
                            </div>

                            {isLoading ? (
                                <div className="text-center py-5">
                                    <Spinner animation="border" variant="primary" />
                                    <p className="text-muted mt-3">Chargement des formations...</p>
                                </div>
                            ) : currentCourses.length === 0 ? (
                                <div className="text-center py-5">
                                    <p className="text-muted">Aucune formation disponible</p>
                                </div>
                            ) : (
                                <div className="nf-courses-list d-flex flex-column gap-4">
                                    {currentCourses.map((formation) => {
                                        const stats = formationStats[formation.id] || { students: 0, hours: 0 };
                                        return (
                                            <Card className="nf-course-card border-0 shadow-sm rounded-4 overflow-hidden" key={formation.id}>
                                                <Row className="g-0 h-100">
                                                    <Col md={4} className="position-relative">
                                                        <div className="nf-card-img h-100" style={{ 
                                                            backgroundImage: `url(${getFormationImage(formation.categorie)})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center'
                                                        }}></div>
                                                        <Badge className="nf-category-badge position-absolute top-0 start-0 m-3">{formation.categorie}</Badge>
                                                    </Col>
                                                    <Col md={8}>
                                                        <Card.Body className="h-100 d-flex flex-column p-4">
                                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                                <h3 className="fw-bold mb-0">{formation.nom}</h3>
                                                            </div>

                                                            <p className="text-muted mb-3 flex-grow-1">{formation.description || 'Formation complète et professionnelle'}</p>

                                                            <div className="d-flex align-items-center gap-4 mb-4 text-muted small">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <FontAwesomeIcon icon={faUserGraduate} /> {stats.students} étudiants
                                                                </div>
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <FontAwesomeIcon icon={faClock} /> {stats.hours}h
                                                                </div>
                                                            </div>

                                                            <div className="d-flex justify-content-between align-items-center mt-auto">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="rounded-circle bg-dark-teal text-white d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
                                                                        <FontAwesomeIcon icon={faUserGraduate} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="fw-bold mb-0 small">Formation professionnelle</p>
                                                                        <p className="text-muted extra-small mb-0">Certifiante</p>
                                                                    </div>
                                                                </div>
                                                                <div className="text-end">
                                                                    <h4 className="fw-bold text-teal mb-0">{formation.prix}€</h4>
                                                                    <p className="text-muted extra-small mb-1">par formation</p>
                                                                    <Button variant="dark-teal" className="btn-discover rounded-3" onClick={() => navigate(`/formation/${formation.id}`)}>Découvrir</Button>
                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        );
                                    })}
                                </div>
                            )}
                        </Col>
                    </Row>

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
                </Container>
            </section>

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
                            <h4 className="fw-bold text-teal-light mb-0">{formateurs.length}</h4>
                            <p className="small opacity-75">Formateurs actifs</p>
                        </Col>
                        <Col xs="auto">
                            <h4 className="fw-bold text-teal-light mb-0">{eleves.length}</h4>
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
