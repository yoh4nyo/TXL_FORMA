import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Table, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBook, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../../api/client';
import '../Formations/AdminFormations.css';

const FormateurFormations = () => {
    const navigate = useNavigate();
    const { formateurId } = useParams();
    const [formateur, setFormateur] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFormateur();
        fetchFormateurSessions();
    }, [formateurId]);

    const fetchFormateur = async () => {
        try {
            const data = await apiClient.get(`/intervenant/${formateurId}`);
            setFormateur(data);
        } catch (err) {
            setError("Impossible de charger le formateur.");
        }
    };

    const fetchFormateurSessions = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const allSessions = await apiClient.get('/session');
            const allSeances = await apiClient.get('/seance');
            
            const formateurSessions = [];
            allSessions.forEach(session => {
                if (session.intervenant && session.intervenant.id === parseInt(formateurId)) {
                    formateurSessions.push(session);
                }
            });
            
            const formateurSeances = allSeances.filter(s => s.intervenant && s.intervenant.id === parseInt(formateurId));
            
            formateurSeances.forEach(seance => {
                if (seance.session && seance.session.id) {
                    const session = allSessions.find(s => s.id === seance.session.id);
                    if (session && !formateurSessions.find(s => s.id === session.id)) {
                        formateurSessions.push(session);
                    }
                }
            });
            
            setSessions(formateurSessions);
        } catch (err) {
            setError("Impossible de charger les sessions du formateur.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container fluid className="admin-formations p-0">
            <div className="mb-4">
                <Button variant="link" className="p-0 text-dark-teal fw-bold mb-3" onClick={() => navigate('/admin/formateurs')}>
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Retour aux formateurs
                </Button>
                <h2 className="fw-bold text-dark-teal mb-0">
                    <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 40, height: 40 }}>
                        <FontAwesomeIcon icon={faBook} size="sm" />
                    </div>
                    Sessions de {formateur?.prenom} {formateur?.nom}
                </h2>
                <p className="text-muted ms-5 ps-4 mt-2">Liste des sessions qu'anime ce formateur</p>
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
                                <th className="ps-4 py-3 text-muted border-0">Session</th>
                                <th className="py-3 text-muted border-0">Formation</th>
                                <th className="py-3 text-muted border-0 text-center">Date début</th>
                                <th className="py-3 text-muted border-0 text-center">Date fin</th>
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
                                        <td className="ps-4 py-3 fw-bold text-dark">Session #{session.id}</td>
                                        <td className="py-3 text-muted">{session.formation?.nom || '—'}</td>
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

export default FormateurFormations;
