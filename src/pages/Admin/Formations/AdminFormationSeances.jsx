import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPen, faTrash, faUser, faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../../api/client';
import './AdminFormations.css';

const emptySeance = { date: '', horaire: '', duree: '' };

const AdminFormationSeances = () => {
    const navigate = useNavigate();
    const { id: sessionId } = useParams();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSeance, setSelectedSeance] = useState(null);
    const [seances, setSeances] = useState([]);
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [createForm, setCreateForm] = useState(emptySeance);
    const [editForm, setEditForm] = useState(emptySeance);

    useEffect(() => {
        fetchSession();
        fetchSeances();
    }, [sessionId]);

    const fetchSession = async () => {
        try {
            const data = await apiClient.get(`/session/${sessionId}`);
            setSession(data);
        } catch (err) {
            setError("Impossible de charger la session.");
        }
    };

    const fetchSeances = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiClient.get(`/seance/session/${sessionId}`);
            const seancesList = Array.isArray(data) ? data : [];
            const sorted = [...seancesList].sort((a, b) => {
                const dateA = a?.date ? new Date(a.date) : null;
                const dateB = b?.date ? new Date(b.date) : null;
                if (!dateA && !dateB) return 0;
                if (!dateA) return 1;
                if (!dateB) return -1;
                if (dateA.getTime() !== dateB.getTime()) return dateA - dateB;
                const timeA = a?.horaire || '';
                const timeB = b?.horaire || '';
                return timeA.localeCompare(timeB);
            });
            setSeances(sorted);
        } catch (err) {
            setError("Impossible de charger les séances.");
        } finally {
            setIsLoading(false);
        }
    };

    const totalDuree = useMemo(() => seances.reduce((total, s) => total + Number(s.duree || 0), 0), [seances]);

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => {
        setShowAddModal(false);
        setCreateForm(emptySeance);
    };

    const handleShowEdit = (seance) => {
        setSelectedSeance(seance);
        setEditForm({ ...emptySeance, ...seance });
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedSeance(null);
        setEditForm(emptySeance);
    };

    const handleChange = (setter) => (event) => {
        const { name, value } = event.target;
        setter((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateSeance = async (event) => {
        event.preventDefault();

        if (session && createForm.date) {
            if (session.date_start && createForm.date < session.date_start) {
                setError("La date de la séance doit être après la date de début de la session (" + session.date_start + ").");
                return;
            }
            if (session.date_end && createForm.date > session.date_end) {
                setError("La date de la séance doit être avant la date de fin de la session (" + session.date_end + ").");
                return;
            }
        }

        try {
            await apiClient.post('/seance', {
                ...createForm,
                session: { id: Number(sessionId) },
                duree: Number(createForm.duree || 0),
            });
            await fetchSeances();
            handleCloseAdd();
        } catch (err) {
            setError(err.response?.data?.message || "La création de la séance a échoué.");
        }
    };

    const handleUpdateSeance = async (event) => {
        event.preventDefault();
        if (!selectedSeance) return;

        if (session && editForm.date) {
            if (session.date_start && editForm.date < session.date_start) {
                setError("La date de la séance doit être après la date de début de la session (" + session.date_start + ").");
                return;
            }
            if (session.date_end && editForm.date > session.date_end) {
                setError("La date de la séance doit être avant la date de fin de la session (" + session.date_end + ").");
                return;
            }
        }

        try {
            await apiClient.put(`/seance/${selectedSeance.id}`, {
                ...editForm,
                session: { id: Number(sessionId) },
                duree: Number(editForm.duree || 0),
            });
            await fetchSeances();
            handleCloseEdit();
        } catch (err) {
            setError(err.response?.data?.message || "La mise à jour de la séance a échoué.");
        }
    };

    const handleDeleteSeance = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette séance ?")) {
            return;
        }
        try {
            await apiClient.delete(`/seance/${id}`);
            setSeances((prev) => prev.filter((s) => s.id !== id));
            setSuccess("Séance supprimée avec succès.");
            setError(null);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError("Impossible de supprimer cette séance.");
            setSuccess(null);
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
                        {session ? `Session #${session.id} – Séances` : 'Séances'}
                    </h2>
                    <p className="text-muted ms-5 ps-4 mt-2">Liste des séances pour cette session</p>
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
                                <h6 className="text-muted mb-2 fw-bold">Durée totale (h)</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{totalDuree}</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Error Modal - Softened */}
            <Modal show={!!error} onHide={() => setError(null)} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold text-danger">
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" style={{ transform: 'rotate(180deg)' }} />
                        Attention
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center pt-0 pb-4 px-4">
                    <div className="mb-3">
                        <div className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 text-danger rounded-circle" style={{ width: 60, height: 60 }}>
                            <FontAwesomeIcon icon={faArrowLeft} size="lg" style={{ transform: 'rotate(180deg)' }} />
                        </div>
                    </div>
                    <h5 className="fw-bold mb-3">Une erreur est survenue</h5>
                    <p className="mb-0 text-muted">{error}</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center border-0 pt-0 pb-4">
                    <Button variant="outline-danger" onClick={() => setError(null)} className="px-4 rounded-pill">
                        Compris
                    </Button>
                </Modal.Footer>
            </Modal>

            {success && (
                <Alert variant="success" className="mb-3">
                    {success}
                </Alert>
            )}

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h4 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faBook} size="xs" />
                        </div>
                        Liste des séances
                    </h4>
                    <div className="d-flex gap-3">
                        <Button variant="dark-teal" className="rounded-2 px-3 fw-bold" onClick={handleShowAdd}>
                            Ajouter une séance
                        </Button>
                    </div>
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
                                    <td className="text-center py-4" colSpan={5}>
                                        <Spinner animation="border" role="status" />
                                    </td>
                                </tr>
                            ) : seances.length === 0 ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={5}>
                                        Aucune séance pour cette session.
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
                                                <Button variant="link" className="p-0 text-muted" onClick={() => navigate(`/admin/seances/${seance.id}`)}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Button>
                                                <Button variant="link" className="p-0 text-muted" onClick={() => handleShowEdit(seance)}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Button>
                                                <Button variant="link" className="p-0 text-danger" onClick={() => handleDeleteSeance(seance.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
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
                    <Modal.Title>Ajouter une séance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateSeance}>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date <span className="text-red">*</span></Form.Label>
                            <Form.Control name="date" value={createForm.date} onChange={handleChange(setCreateForm)} type="date" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Horaire <span className="text-red">*</span></Form.Label>
                            <Form.Control name="horaire" value={createForm.horaire} onChange={handleChange(setCreateForm)} type="time" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Durée (heures)</Form.Label>
                            <Form.Control name="duree" value={createForm.duree} onChange={handleChange(setCreateForm)} type="number" placeholder="2" className="form-control-custom" />
                        </Form.Group>

                        <div className="text-center">
                            <Button className="btn-modal-action" type="submit">
                                Ajouter
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEdit} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Modifier une séance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateSeance}>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date <span className="text-red">*</span></Form.Label>
                            <Form.Control name="date" value={editForm.date} onChange={handleChange(setEditForm)} type="date" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Horaire <span className="text-red">*</span></Form.Label>
                            <Form.Control name="horaire" value={editForm.horaire} onChange={handleChange(setEditForm)} type="time" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Durée (heures)</Form.Label>
                            <Form.Control name="duree" value={editForm.duree} onChange={handleChange(setEditForm)} type="number" className="form-control-custom" />
                        </Form.Group>

                        <div className="text-center">
                            <Button className="btn-modal-action" type="submit">
                                Modifier
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminFormationSeances;
