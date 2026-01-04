import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faArrowLeft, faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { apiClient } from '../../api/client';
import '../Admin/Formations/AdminFormations.css';

const FormateurSeanceParticipants = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formateurId, seanceId, sessionId } = useParams();
    const [participants, setParticipants] = useState([]);
    const [seance, setSeance] = useState(null);
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [canModifyNotes, setCanModifyNotes] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [editNote, setEditNote] = useState('');
    
    const showNotes = location.state?.showNotes || false;

    useEffect(() => {
        if (showNotes && sessionId) {
            fetchSession();
        } else if (seanceId) {
            fetchSeance();
        }
    }, [seanceId, sessionId, showNotes]);

    useEffect(() => {
        if (session && showNotes) {
            checkModificationPeriod();
            fetchParticipants();
        } else if (seance && !showNotes) {
            fetchParticipants();
        }
    }, [session, seance, showNotes]);

    const fetchSession = async () => {
        try {
            const data = await apiClient.get(`/session/${sessionId}`);
            setSession(data);
        } catch (err) {
            setError("Impossible de charger la session.");
        }
    };

    const fetchSeance = async () => {
        try {
            const data = await apiClient.get(`/seance/${seanceId}`);
            setSeance(data);
            if (data.session) {
                setSession(data.session);
            }
        } catch (err) {
            setError("Impossible de charger la séance.");
        }
    };

    const fetchParticipants = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (showNotes && sessionId) {
                const data = await apiClient.get(`/session_eleve/session/${sessionId}`);
                setParticipants(Array.isArray(data) ? data : []);
            } else if (seanceId) {
                const data = await apiClient.get(`/seance_eleve/seance/${seanceId}`);
                setParticipants(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            setError("Impossible de charger les participants.");
        } finally {
            setIsLoading(false);
        }
    };

    const checkModificationPeriod = () => {
        if (!session || !session.date_start || !session.date_end) {
            setCanModifyNotes(false);
            return;
        }

        const now = new Date();
        const dateStart = new Date(session.date_start);
        const dateEnd = new Date(session.date_end);

        setCanModifyNotes(now >= dateStart && now <= dateEnd);
    };

    const handleShowEdit = (participant) => {
        setSelectedParticipant(participant);
        setEditNote(participant.note || '');
        setShowEditModal(true);
    };

    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedParticipant(null);
        setEditNote('');
    };

    const handleUpdateNote = async (event) => {
        event.preventDefault();
        if (!selectedParticipant) return;

        try {
            await apiClient.put(`/session_eleve/${selectedParticipant.id}`, {
                ...selectedParticipant,
                note: Number(editNote),
                eleve: { id: selectedParticipant.eleve.id },
                session: { id: sessionId }
            });
            setSuccess('Note modifiée avec succès');
            setTimeout(() => setSuccess(null), 3000);
            await fetchParticipants();
            handleCloseEdit();
        } catch (err) {
            setError("La modification de la note a échoué.");
        }
    };

    const getModificationMessage = () => {
        if (!session || !session.date_start || !session.date_end) return '';
        
        const now = new Date();
        const dateStart = new Date(session.date_start);
        const dateEnd = new Date(session.date_end);

        if (now < dateStart) {
            return `La modification des notes sera possible à partir du ${dateStart.toLocaleDateString('fr-FR')}`;
        } else if (now > dateEnd) {
            return `La période de modification des notes est terminée depuis le ${dateEnd.toLocaleDateString('fr-FR')}`;
        }
        return '';
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
                        {showNotes ? `Session #${sessionId} – Gestion des notes` : `Séance ${seance ? `#${seance.id}` : '—'} – Participants`}
                    </h2>
                    <p className="text-muted ms-5 ps-4 mt-2">{showNotes ? 'Gérer les notes des participants' : 'Liste des participants de la séance'}</p>
                </div>
            </div>

            <Row className="g-4 mb-5">
                <Col md={showNotes ? 6 : 4}>
                    <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
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
                {showNotes && session && (
                    <Col md={6}>
                        <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Période de modification des notes</h6>
                                <p className="mb-1 small">
                                    <strong>Début:</strong> {session.date_start || '-'}
                                    <span className="mx-2">|</span>
                                    <strong>Fin:</strong> {session.date_end || '-'}
                                </p>
                                {!canModifyNotes && getModificationMessage() && (
                                    <Alert variant="warning" className="mb-0 mt-2 py-2 small">
                                        {getModificationMessage()}
                                    </Alert>
                                )}
                                {canModifyNotes && (
                                    <Alert variant="success" className="mb-0 mt-2 py-2 small">
                                        Vous pouvez modifier les notes des participants
                                    </Alert>
                                )}
                            </div>
                        </Card>
                    </Col>
                )}
            </Row>

            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
            {success && <Alert variant="success" className="mb-3">{success}</Alert>}

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h4 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faBook} size="xs" />
                        </div>
                        Liste des participants ({participants.length})
                    </h4>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">Nom</th>
                                <th className="py-3 text-muted border-0">Prénom</th>
                                <th className="py-3 text-muted border-0 text-center">Statut</th>
                                {showNotes ? (
                                    <>
                                        <th className="py-3 text-muted border-0 text-center">Note</th>
                                        <th className="py-3 text-muted border-0 text-center">Actions</th>
                                    </>
                                ) : (
                                    <th className="py-3 text-muted border-0 text-center">Signature</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={showNotes ? 5 : 4}>
                                        <Spinner animation="border" role="status" />
                                    </td>
                                </tr>
                            ) : participants.length === 0 ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={showNotes ? 5 : 4}>
                                        Aucun participant.
                                    </td>
                                </tr>
                            ) : (
                                participants.map((participant) => (
                                    <tr key={participant.id} className="border-bottom">
                                        <td className="ps-4 py-3 fw-bold text-dark">{participant.eleve?.nom || '—'}</td>
                                        <td className="py-3 text-dark">{participant.eleve?.prenom || '—'}</td>
                                        <td className="py-3 text-center text-muted">{participant.statut || '—'}</td>
                                        {showNotes ? (
                                            <>
                                                <td className="py-3 text-center fw-bold text-dark-teal">
                                                    {participant.note !== null && participant.note !== undefined ? participant.note : '—'}
                                                </td>
                                                <td className="py-3 text-center">
                                                    <Button 
                                                        variant="link"
                                                        className="p-0 text-muted"
                                                        onClick={() => handleShowEdit(participant)}
                                                        disabled={!canModifyNotes}
                                                    >
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </Button>
                                                </td>
                                            </>
                                        ) : (
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
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showEditModal} onHide={handleCloseEdit} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold text-dark-teal">Modifier la note</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-3">
                    {selectedParticipant && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Participant</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={`${selectedParticipant.eleve.prenom} ${selectedParticipant.eleve.nom}`}
                                    disabled
                                    className="border-2"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Note (0-20)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    min="0"
                                    max="20"
                                    step="0.5"
                                    value={editNote}
                                    onChange={(e) => setEditNote(e.target.value)}
                                    className="border-2"
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0">
                    <Button variant="outline-secondary" onClick={handleCloseEdit} className="px-4">
                        Annuler
                    </Button>
                    <Button onClick={handleUpdateNote} className="px-4 bg-dark-teal border-0 text-white">
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default FormateurSeanceParticipants;