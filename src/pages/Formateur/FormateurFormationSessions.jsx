import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faPen, faTrash, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../api/client';
import '../Admin/Formations/AdminFormations.css';

const FormateurFormationSessions = () => {
    const navigate = useNavigate();
    const { formateurId, formationId } = useParams();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [seances, setSeances] = useState([]);
    const [formation, setFormation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (formationId && formateurId) {
            fetchFormation();
            fetchSessions();
            fetchAllSeances();
        }
    }, [formationId, formateurId]);

    const fetchFormation = async () => {
        try {
            const data = await apiClient.get(`/formation/${formationId}`);
            setFormation(data);
        } catch (err) {
            setError("Impossible de charger la formation.");
        }
    };

    const fetchSessions = async () => {
        setIsLoading(true);
        try {
            const data = await apiClient.get(`/session/formation/${formationId}`);
            setSessions(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("Impossible de charger les sessions.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllSeances = async () => {
        try {
            const data = await apiClient.get('/seance');
            setSeances(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Erreur chargement séances:", err);
        }
    };

    const seancesBySession = useMemo(() => {
        return seances.reduce((acc, seance) => {
            const sessionId = seance.session?.id;
            if (!sessionId) return acc;
            acc[sessionId] = (acc[sessionId] || 0) + 1;
            return acc;
        }, {});
    }, [seances]);

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => setShowAddModal(false);

    const handleShowEdit = (session) => {
        setSelectedSession(session);
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedSession(null);
    };

    return (
        <Container fluid className="admin-formations p-0">
            <div className="mb-4">
                <div className="mb-3">
                    <Button variant="link" className="p-0 text-dark text-decoration-none d-inline-flex align-items-center" onClick={() => navigate(`/formateur/${formateurId}/formations`)}>
                        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                        <span className="ms-2 fw-bold">Retour</span>
                    </Button>
                </div>
                <div>
                    <h2 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 40, height: 40 }}>
                            <FontAwesomeIcon icon={faBook} size="sm" />
                        </div>
                        {formation?.nom || 'Formation'} – Sessions
                    </h2>
                    <p className="text-muted ms-5 ps-4 mt-2">Liste des sessions de la formation</p>
                </div>
            </div>

            <Row className="g-4 mb-5">
                <Col md={6}>
                    <Card className="border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de sessions</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{sessions.length}</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faBook} />
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre total de places</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{sessions.reduce((sum, s) => sum + Number(s.nbPlace || 0), 0)}</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faUser} />
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
                        Liste des sessions ({sessions.length})
                    </h4>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">ID</th>
                                <th className="py-3 text-muted border-0 text-center">Séances</th>
                                <th className="py-3 text-muted border-0 text-center">Places</th>
                                <th className="py-3 text-muted border-0 text-center">Restantes</th>
                                <th className="py-3 text-muted border-0 text-center">Début</th>
                                <th className="py-3 text-muted border-0 text-center">Fin</th>
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
                            ) : sessions.length === 0 ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={7}>
                                        Aucune session pour cette formation.
                                    </td>
                                </tr>
                            ) : (
                                sessions.map((session) => (
                                    <tr key={session.id} className="border-bottom">
                                        <td className="ps-4 py-3 fw-bold text-dark">#{session.id}</td>
                                        <td className="py-3 text-muted text-center">{seancesBySession[session.id] || 0}</td>
                                        <td className="py-3 text-muted text-center">{session.nbPlace || '—'}</td>
                                        <td className="py-3 text-muted text-center">{session.nbPlaceRestant || '—'}</td>
                                        <td className="py-3 text-center">
                                            <Badge bg="primary" className="rounded-pill px-3 py-2 fw-normal opacity-75 text-white">
                                                {session.date_start || '—'}
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-center">
                                            <Badge bg="success" className="rounded-pill px-3 py-2 fw-normal opacity-75 text-white">
                                                {session.date_end || '—'}
                                            </Badge>
                                        </td>
                                        <td className="pe-4 py-3 text-end">
                                            <div className="d-flex justify-content-end gap-3">
                                                <Button variant="link" className="p-0 text-muted" onClick={() => navigate(`/formateur/${formateurId}/sessions/${session.id}`)}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showAddModal} onHide={handleCloseAdd} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom de la session <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" placeholder="Session 1" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nombre de séances <span className="text-red">*</span></Form.Label>
                            <Form.Control type="number" placeholder="5" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date de début <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Date de fin <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" className="form-control-custom" />
                        </Form.Group>

                        <div className="text-center">
                            <Button className="btn-modal-action" onClick={handleCloseAdd}>
                                Ajouter
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEdit} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Modifier la session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom de la session <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" defaultValue={selectedSession?.name} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date de début <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" defaultValue={selectedSession?.startDate} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Date de fin <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" defaultValue={selectedSession?.endDate} className="form-control-custom" />
                        </Form.Group>

                        <div className="text-center">
                            <Button className="btn-modal-action" onClick={handleCloseEdit}>
                                Modifier
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default FormateurFormationSessions;
