import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Table, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBook, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../../api/client';
import '../Formations/AdminFormations.css';

const UserFormations = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUser();
        fetchUserSessions();
    }, [userId]);

    const fetchUser = async () => {
        try {
            const data = await apiClient.get(`/eleve/${userId}`);
            setUser(data);
        } catch (err) {
            setError("Impossible de charger l'élève.");
        }
    };

    const fetchUserSessions = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiClient.get(`/session/eleve/${userId}`);
            setSessions(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("Impossible de charger les sessions de l'élève.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container fluid className="admin-formations p-0">
            <div className="mb-4">
                <Button variant="link" className="p-0 text-dark-teal fw-bold mb-3" onClick={() => navigate('/admin/utilisateurs')}>
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Retour aux utilisateurs
                </Button>
                <h2 className="fw-bold text-dark-teal mb-0">
                    <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 40, height: 40 }}>
                        <FontAwesomeIcon icon={faBook} size="sm" />
                    </div>
                    Sessions de {user?.prenom} {user?.nom}
                </h2>
                <p className="text-muted ms-5 ps-4 mt-2">Liste des sessions auxquelles participe cet élève</p>
            </div>

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
                        Sessions ({sessions.length})
                    </h4>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">Formation</th>
                                <th className="py-3 text-muted border-0 text-center">Session</th>
                                <th className="py-3 text-muted border-0 text-center">Début</th>
                                <th className="py-3 text-muted border-0 text-center">Fin</th>
                                <th className="pe-4 py-3 text-muted border-0 text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={5}>
                                        <Spinner animation="border" role="status" />
                                    </td>
                                </tr>
                            ) : sessions.length === 0 ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={5}>
                                        Aucune session trouvée.
                                    </td>
                                </tr>
                            ) : (
                                sessions.map((session) => (
                                    <tr key={session.id} className="border-bottom">
                                        <td className="ps-4 py-3 fw-bold text-dark">{session.formation?.nom || '—'}</td>
                                        <td className="py-3 text-center">#{session.id}</td>
                                        <td className="py-3 text-center">{session.date_start || '—'}</td>
                                        <td className="py-3 text-center">{session.date_end || '—'}</td>
                                        <td className="pe-4 py-3 text-end">
                                            <Button variant="link" className="p-0 text-muted" onClick={() => navigate(`/admin/sessions/${session.id}`)}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
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

export default UserFormations;
