import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Accordion, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck, faClock, faDesktop, faHeadset, faCertificate, faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';
import './FormationDetailTemplate.css';
import ModalReservation from './ModalReservation';

const FormationDetail = () => {
    const { formationId } = useParams();
    const navigate = useNavigate();
    const [formation, setFormation] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchFormationData();
    }, [formationId]);

    const fetchFormationData = async () => {
        setIsLoading(true);
        try {
            const formationData = await apiClient.get(`/formation/${formationId}`);
            setFormation(formationData);

            const sessionsData = await apiClient.get(`/session/formation/${formationId}`);
            const sessionsArray = Array.isArray(sessionsData) ? sessionsData : [];
            
            const sortedSessions = sessionsArray.sort((a, b) => {
                return new Date(a.date_start) - new Date(b.date_start);
            });
            
            setSessions(sortedSessions);

            let hours = 0;
            let students = 0;

            for (const session of sessionsArray) {
                try {
                    const seances = await apiClient.get(`/seance/session/${session.id}`);
                    const seancesArray = Array.isArray(seances) ? seances : [];
                    hours += seancesArray.reduce((sum, seance) => sum + (seance.duree || 0), 0);
                } catch (err) {
                    console.error(`Erreur séances session ${session.id}:`, err);
                }

                try {
                    const sessionEleves = await apiClient.get(`/session_eleve/session/${session.id}`);
                    students += Array.isArray(sessionEleves) ? sessionEleves.length : 0;
                } catch (err) {
                    console.error(`Erreur élèves session ${session.id}:`, err);
                }
            }

            setTotalHours(hours);
            setTotalStudents(students);
        } catch (err) {
            console.error("Erreur lors du chargement de la formation:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const getFormationImage = (categorie) => {
        const normalized = (categorie || '')
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();

        const imageMap = {
            'reseaux et telecoms': '/assets/reseau_telecom.jpg',
            'developpement front': '/assets/front_end.png',
            'developpement back': '/assets/back_end.png',
            'bureautique': '/assets/bureautique.jpg',
            'cybersecurite': '/assets/cyber.jpg',
            'conduite de projets': '/assets/conduite_projet.jpg'
        };

        if (imageMap[normalized]) {
            return imageMap[normalized];
        }

        if (
            normalized.includes('admin') ||
            normalized.includes('administration') ||
            normalized.includes('system') ||
            normalized.includes('syst') ||
            normalized.includes('sys')
        ) {
            return '/assets/administration_sys.jpg';
        }

        if (normalized.includes('reseau') || normalized.includes('telecom')) {
            return '/assets/reseau_telecom.jpg';
        }

        if (normalized.includes('front')) {
            return '/assets/front_end.png';
        }

        if (normalized.includes('back')) {
            return '/assets/back_end.png';
        }

        if (normalized.includes('projet') || normalized.includes('conduite')) {
            return '/assets/conduite_projet.jpg';
        }

        // Fallback to a generic existing image if no match
        return '/assets/formations.png';
    };

    if (isLoading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Chargement de la formation...</p>
            </Container>
        );
    }

    if (!formation) {
        return (
            <Container className="py-5 text-center">
                <p>Formation non trouvée</p>
            </Container>
        );
    }

    return (
        <div className="page-detail-formation">
            <div className="hero-formation">
                <Container>
                    <div className="fil-ariane mb-3">
                        <a href="/">Accueil</a> <span>&gt;</span>
                        <a href="/nos-formations">Nos formations</a> <span>&gt;</span>
                        <span className="text-white">{formation.nom}</span>
                    </div>
                    <div className="badge-hero mb-3">
                        <FontAwesomeIcon icon={faDesktop} className="me-2" />
                        {formation.categorie}
                    </div>
                    <h1 className="display-3 fw-bold mb-3">{formation.nom}</h1>
                    <p className="lead mb-4" style={{ maxWidth: '800px' }}>
                        {formation.description || 'Formation complète et professionnelle'}
                    </p>
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center me-4">
                            <span className="fw-bold me-2">{totalStudents} étudiants</span>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-5">
                <Row>
                    <Col lg={8}>
                        {formation.apprentissages && formation.apprentissages.length > 0 && (
                            <div className="boite-apprentissage shadow-sm mb-4">
                                <h3 className="fw-bold text-dark-teal mb-4">
                                    <FontAwesomeIcon icon={faCheck} className="me-2" />
                                    Ce que vous allez apprendre
                                </h3>
                                <Row>
                                    {formation.apprentissages.map((apprentissage, index) => (
                                        <Col md={6} key={index}>
                                            <div className="element-liste-coche">
                                                <FontAwesomeIcon icon={faCheck} className="icone-coche" />
                                                <div>{apprentissage}</div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}

                        <div className="boite-apprentissage shadow-sm">
                            <h3 className="fw-bold text-dark-teal mb-4">
                                <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                                À propos de cette formation
                            </h3>
                            <p className="text-muted">{formation.description || 'Formation complète qui vous permettra de maîtriser tous les aspects nécessaires.'}</p>
                            
                            <div className="mt-4">
                                <h5 className="fw-bold mb-3">Sessions disponibles</h5>
                                {sessions.length > 0 ? (
                                    <div className="list-group">
                                        {sessions.map((session) => (
                                            <div key={session.id} className="list-group-item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <div className="fw-bold">Session du {new Date(session.date_start).toLocaleDateString()} au {new Date(session.date_end).toLocaleDateString()}</div>
                                                        <div className="text-muted small">
                                                            {session.nbPlaceRestant || 0} places restantes
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted">Aucune session disponible pour le moment</p>
                                )}
                            </div>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <div className="sidebar-fixe">
                            <Card className="carte-prix mb-4">
                                <Card.Img 
                                    variant="top" 
                                    src={getFormationImage(formation.categorie)} 
                                    style={{ height: '200px', objectFit: 'cover' }} 
                                />
                                <Card.Body className="p-4">
                                    <div className="mb-3">
                                        <span className="valeur-prix">{formation.prix}€</span>
                                    </div>

                                    <Button variant="dark-teal" size="lg" className="w-100 mb-4 fw-bold rounded-pill" onClick={handleShow}>
                                        Choisir une session
                                    </Button>

                                    <hr className="my-4" />

                                    <div className="mb-4">
                                        <h6 className="fw-bold mb-3 small">Cette formation inclut :</h6>
                                        <div className="element-liste-fonctionnalite">
                                            <FontAwesomeIcon icon={faClock} className="icone-fonctionnalite" />
                                            {totalHours}h de cours
                                        </div>
                                        <div className="element-liste-fonctionnalite">
                                            <FontAwesomeIcon icon={faDesktop} className="icone-fonctionnalite" />
                                            Matériels à disposition
                                        </div>
                                        <div className="element-liste-fonctionnalite">
                                            <FontAwesomeIcon icon={faHeadset} className="icone-fonctionnalite" />
                                            Support du formateur
                                        </div>
                                        <div className="element-liste-fonctionnalite">
                                            <FontAwesomeIcon icon={faCertificate} className="icone-fonctionnalite" />
                                            Certificat de fin de formation
                                        </div>
                                    </div>

                                    <div className="bg-light p-3 rounded-3 text-center small text-success fw-bold">
                                        <FontAwesomeIcon icon={faCheck} className="me-2" />
                                        Garantie satisfait ou remboursé 30 jours
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>

            <ModalReservation
                show={showModal}
                handleClose={handleClose}
                formationTitle={formation.nom}
                formationPrice={formation.prix + '€'}
                sessions={sessions}
                formationId={formationId}
            />
        </div>
    );
};

export default FormationDetail;
