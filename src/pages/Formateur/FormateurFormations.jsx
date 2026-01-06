import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../api/client';
import '../../components/MenuAdmin/MenuAdmin.css';
import '../Admin/Formations/AdminFormations.css';

const FormateurFormations = () => {
    const navigate = useNavigate();
    const { formateurId } = useParams();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedFormation, setSelectedFormation] = useState(null);
    const [formations, setFormations] = useState([]);
    const [sessions, setSessions] = useState({});
    const [seancesDurations, setSeancesDurations] = useState({});
    const [formateur, setFormateur] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (formateurId) {
            fetchFormateur();
            fetchFormations();
        }
    }, [formateurId]);

    const fetchFormateur = async () => {
        try {
            const data = await apiClient.get(`/intervenant/${formateurId}`);
            setFormateur(data);
        } catch (err) {
            console.error("Erreur formateur:", err);
        }
    };

    const fetchFormations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 1. Récupérer toutes les formations
            const data = await apiClient.get(`/formation/intervenant/${formateurId}`);
            const formationsArray = Array.isArray(data) ? data : [];
            setFormations(formationsArray);

            // 2. Récupérer les sessions pour chaque formation en PARALLÈLE
            const sessionsPromises = formationsArray.map(async (formation) => {
                try {
                    const formationSessions = await apiClient.get(`/session/formation/${formation.id}`);
                    return {
                        formationId: formation.id,
                        sessions: Array.isArray(formationSessions) ? formationSessions : []
                    };
                } catch (err) {
                    console.error(`Erreur sessions pour formation ${formation.id}`, err);
                    return { formationId: formation.id, sessions: [] };
                }
            });

            const sessionsResults = await Promise.all(sessionsPromises);

            const sessionsData = {};
            sessionsResults.forEach(result => {
                sessionsData[result.formationId] = result.sessions;
            });
            setSessions(sessionsData);

            // 3. Récupérer les durées (séances) pour TOUTES les sessions en PARALLÈLE
            const allSessions = sessionsResults.flatMap(r => r.sessions);

            const seancesPromises = allSessions.map(async (session) => {
                try {
                    const seances = await apiClient.get(`/seance/session/${session.id}`);
                    const seancesArray = Array.isArray(seances) ? seances : [];
                    const duration = seancesArray.reduce((sum, seance) => sum + (seance.duree || 0), 0);
                    return { sessionId: session.id, duration: duration, formationId: session.formation.id };
                } catch (err) {
                    return { sessionId: session.id, duration: 0, formationId: session.formation ? session.formation.id : null };
                }
            });

            const seancesResults = await Promise.all(seancesPromises);

            // Agréger les durées par formation
            const durationsData = {};
            formationsArray.forEach(f => durationsData[f.id] = 0); // Init à 0

            // On doit faire le lien session -> formation. 
            // Heureusement l'objet session contient souvent "formation": {id: ...} ou on peut le retrouver via notre map précédente

            // Optimisation : On recrée le lien via sessionsData qu'on vient de construire
            sessionsResults.forEach(formationGroup => {
                let totalFormationDuration = 0;
                formationGroup.sessions.forEach(session => {
                    // Trouver la durée de cette session spécifique dans seancesResults
                    const sessionResult = seancesResults.find(r => r.sessionId === session.id);
                    if (sessionResult) {
                        totalFormationDuration += sessionResult.duration;
                    }
                });
                durationsData[formationGroup.formationId] = totalFormationDuration;
            });

            setSeancesDurations(durationsData);

        } catch (err) {
            console.error("Erreur générale chargement formations:", err);
            setError("Impossible de charger les formations.");
        } finally {
            setIsLoading(false);
        }
    };

    const getFormationStatus = (formationId) => {
        const formationSessions = sessions[formationId] || [];
        if (formationSessions.length === 0) return null;

        const now = new Date();

        let hasNotStarted = false;
        let hasInProgress = false;
        let allFinished = true;

        for (const session of formationSessions) {
            const dateStart = new Date(session.date_start);
            const dateEnd = new Date(session.date_end);

            if (now < dateStart) {
                hasNotStarted = true;
                allFinished = false;
            } else if (now >= dateStart && now <= dateEnd) {
                hasInProgress = true;
                allFinished = false;
            }
        }

        if (hasInProgress) {
            return { text: 'En cours', variant: 'success' };
        } else if (hasNotStarted) {
            return { text: 'Pas commencé', variant: 'secondary' };
        } else if (allFinished) {
            return { text: 'Terminé', variant: 'dark' };
        }
        return null;
    };

    const formateurCount = useMemo(() => formations.length, [formations]);

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => setShowAddModal(false);

    const handleShowEdit = (formation) => {
        setSelectedFormation(formation);
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedFormation(null);
    };

    return (
        <Container fluid className="admin-formations p-0">
            <div className="mb-4">
                <h2 className="fw-bold text-dark-teal mb-0">
                    <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 40, height: 40 }}>
                        <FontAwesomeIcon icon={faBook} size="sm" />
                    </div>
                    Dashboard formations
                </h2>
                <p className="text-muted ms-5 ps-4 mt-2">Gérer les formations</p>
            </div>

            <Row className="g-4 mb-5">
                <Col md={6}>
                    <Card className="border-0 shadow-sm rounded-4 p-3 ps-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Intervenant</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{formateur ? `${formateur.prenom} ${formateur.nom}` : '—'}</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faBook} />
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="border-0 shadow-sm rounded-4 p-3 ps-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de formations</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{formateurCount}</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faBook} />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h4 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faBook} size="xs" />
                        </div>
                        Liste des formations ({formations.length})
                    </h4>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">ID</th>
                                <th className="py-3 text-muted border-0">Nom</th>
                                <th className="py-3 text-muted border-0 text-center">Catégorie</th>
                                <th className="py-3 text-muted border-0 text-center">Durée (h)</th>
                                <th className="py-3 text-muted border-0 text-center">Prix</th>
                                <th className="py-3 text-muted border-0 text-center">Statut</th>
                                <th className="pe-4 py-3 text-muted border-0 text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={7}>
                                        <Spinner animation="border" role="status" />
                                    </td>
                                </tr>
                            ) : formations.length === 0 ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={7}>
                                        Aucune formation assignée.
                                    </td>
                                </tr>
                            ) : (
                                formations.map((formation) => {
                                    const status = getFormationStatus(formation.id);
                                    const totalDuration = seancesDurations[formation.id] || 0;
                                    return (
                                        <tr key={formation.id} className="border-bottom">
                                            <td className="ps-4 py-3 fw-bold text-dark">#{formation.id}</td>
                                            <td className="py-3 text-dark">{formation.nom || '—'}</td>
                                            <td className="py-3 text-center text-muted">{formation.categorie || '—'}</td>
                                            <td className="py-3 text-center text-muted">{totalDuration + 'h' || '—'}</td>
                                            <td className="py-3 text-center text-dark fw-bold">{formation.prix || '—'}€</td>
                                            <td className="py-3 text-center">
                                                {status ? (
                                                    <Badge bg={status.variant} className="px-3 py-2">
                                                        {status.text}
                                                    </Badge>
                                                ) : '—'}
                                            </td>
                                            <td className="pe-4 py-3 text-end">
                                                <div className="d-flex justify-content-end gap-3">
                                                    <Button variant="link" className="p-0 text-muted" onClick={() => navigate(`/formateur/${formateurId}/formations/${formation.id}`)}>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showAddModal} onHide={handleCloseAdd} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold text-dark" style={{ fontSize: '2rem' }}>Ajouter une formation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted">Les formations doivent être créées par un administrateur.</p>
                </Modal.Body>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEdit} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold text-dark" style={{ fontSize: '2rem' }}>Modifier une formation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted">Les formations doivent être modifiées par un administrateur.</p>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default FormateurFormations;
