import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../api/client';
import '../Admin/Formations/AdminFormations.css';

const FormateurFormationSeances = () => {
    const navigate = useNavigate();
    const { formateurId, sessionId } = useParams();
    const [seances, setSeances] = useState([]);
    const [session, setSession] = useState(null);
    const [formation, setFormation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (sessionId) {
            fetchSession();
            fetchSeances();
        }
    }, [sessionId]);

    const fetchSession = async () => {
        try {
            const data = await apiClient.get(`/session/${sessionId}`);
            setSession(data);
            if (data.formation) {
                setFormation(data.formation);
            }
        } catch (err) {
            setError("Impossible de charger la session.");
        }
    };

    const fetchSeances = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiClient.get(`/seance/session/${sessionId}`);
            setSeances(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("Impossible de charger les séances.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container fluid className="admin-formations p-0">
            <div className="mb-4">
                <div className="mb-3">
                    <Button variant="link" className="p-0 text-dark text-decoration-none d-inline-flex align-items-center" onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                        <span className="ms-2 fw-bold">Retour</span>
                    </Button>
                </div>
                <div>
                    <h2 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 40, height: 40 }}>
                            <FontAwesomeIcon icon={faBook} size="sm" />
                        </div>
                        {formation ? `${formation.nom} #${formation.id}` : 'Formation'} – Session {session ? `#${session.id}` : '—'} : Les Séances
                    </h2>
                    <p className="text-muted ms-5 ps-4 mt-2">Liste des séances pour la session</p>
                </div>
            </div>

            <Row className="g-4 mb-5">
                <Col md={6}>
                    <Card className="border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de séances</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{seances.length}</h2>
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
                                <h6 className="text-muted mb-2 fw-bold">Durée totale</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{seances.reduce((sum, s) => sum + (s.duree || 0), 0)}h</h2>
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
                        Liste des séances ({seances.length})
                    </h4>
                    <Button 
                        size="sm"
                        onClick={() => navigate(`/formateur/${formateurId}/formation/${formation?.id}/session/${sessionId}/participants`, { state: { showNotes: true } })}
                        className="bg-dark-teal border-0 text-white"
                    >
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        Gérer les notes des participants
                    </Button>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">Séance</th>
                                <th className="py-3 text-muted border-0">Date</th>
                                <th className="py-3 text-muted border-0 text-center">Horaire</th>
                                <th className="py-3 text-muted border-0 text-center">Durée (h)</th>
                                <th className="pe-4 py-3 text-muted border-0 text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={6}>
                                        <Spinner animation="border" role="status" />
                                    </td>
                                </tr>
                            ) : seances.length === 0 ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={6}>
                                        Aucune séance.
                                    </td>
                                </tr>
                            ) : (
                                seances.map((seance) => (
                                    <tr key={seance.id} className="border-bottom">
                                        <td className="ps-4 py-3 fw-bold text-dark">Séance #{seance.id}</td>
                                        <td className="py-3 text-muted">{seance.date || '—'}</td>
                                        <td className="py-3 text-center">
                                            <Badge bg="primary" className="rounded-pill px-3 py-2 fw-normal opacity-75 text-white" style={{ minWidth: '80px' }}>
                                                {seance.horaire || '—'}
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-center">{seance.duree ?? '—'}</td>
                                        <td className="pe-4 py-3 text-end">
                                            <div className="d-flex justify-content-end gap-3">
                                                <Button variant="link" className="p-0 text-muted" onClick={() => navigate(`/formateur/${formateurId}/seances/${seance.id}`)}>
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
        </Container>
    );
};

export default FormateurFormationSeances;
