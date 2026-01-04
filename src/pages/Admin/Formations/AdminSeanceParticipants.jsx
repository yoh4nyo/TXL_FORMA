import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Spinner, Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../../api/client';
import './AdminFormations.css';

const AdminSeanceParticipants = () => {
    const navigate = useNavigate();
    const { id: seanceId } = useParams();
    const [seance, setSeance] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSeance();
        fetchParticipants();
    }, [seanceId]);

    const fetchSeance = async () => {
        try {
            const data = await apiClient.get(`/seance/${seanceId}`);
            setSeance(data);
        } catch (err) {
            setError("Impossible de charger la séance.");
        }
    };

    const fetchParticipants = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiClient.get(`/seance_eleve/seance/${seanceId}`);
            setParticipants(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("Impossible de charger les participants.");
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
                        Séance du {seance?.date || '...'} – Participants
                    </h2>
                    <p className="text-muted ms-5 ps-4 mt-2">Liste des participants inscrits à cette séance</p>
                </div>
            </div>

            <Row className="g-4 mb-5">
                <Col md={4}>
                    <Card className="border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de participants</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{participants.length}</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white p-4 border-0">
                    <h4 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faBook} size="xs" />
                        </div>
                        Participants ({participants.length})
                    </h4>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">Nom</th>
                                <th className="py-3 text-muted border-0">Prénom</th>
                                <th className="py-3 text-muted border-0 text-center">Statut</th>
                                <th className="py-3 text-muted border-0 text-center">Signature</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={4}>
                                        <Spinner animation="border" role="status" />
                                    </td>
                                </tr>
                            ) : participants.length === 0 ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={4}>
                                        Aucun participant inscrit.
                                    </td>
                                </tr>
                            ) : (
                                participants.map((participant) => (
                                    <tr key={participant.id} className="border-bottom">
                                        <td className="ps-4 py-3 fw-bold text-dark">{participant.eleve?.nom || '—'}</td>
                                        <td className="py-3 text-muted">{participant.eleve?.prenom || '—'}</td>
                                        <td className="py-3 text-center">{participant.statut || '—'}</td>
                                        <td className="py-3 text-center text-muted">
                                            {participant.signature ? (
                                                <img
                                                    src={participant.signature}
                                                    alt="Signature"
                                                    style={{ maxWidth: '100px', maxHeight: '50px', border: '1px solid #ddd', borderRadius: '4px' }}
                                                />
                                            ) : (
                                                '—'
                                            )}
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

export default AdminSeanceParticipants;
