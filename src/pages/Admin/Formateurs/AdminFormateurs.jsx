import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faPen, faTrash, faUser, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../api/client';
import '../Formations/AdminFormations.css';

const emptyFormateur = {
    nom: '',
    prenom: '',
    mail: '',
    metier: '',
    nbSeance: 0,
    nbHeure: 0,
    identifiant: '',
    password: '',
    role: 'ROLE_INTERVENANT',
};

const AdminFormateurs = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedFormateur, setSelectedFormateur] = useState(null);
    const [formateurs, setFormateurs] = useState([]);
    const [createForm, setCreateForm] = useState(emptyFormateur);
    const [editForm, setEditForm] = useState(emptyFormateur);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchFormateurs();
    }, []);

    const fetchFormateurs = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiClient.get('/intervenant');
            const formateursList = Array.isArray(data) ? data : [];
            
            const enrichedFormateurs = await Promise.all(
                formateursList.map(async (formateur) => {
                    try {
                        const nbSeance = await apiClient.get(`/seance/intervenant/${formateur.id}/count`);
                        const nbHeure = await apiClient.get(`/seance/intervenant/${formateur.id}/heures`);
                        return { ...formateur, nbSeance, nbHeure: nbHeure || 0 };
                    } catch {
                        return { ...formateur, nbSeance: 0, nbHeure: 0 };
                    }
                })
            );
            
            setFormateurs(enrichedFormateurs);
        } catch (err) {
            setError("Impossible de charger les formateurs.");
        } finally {
            setIsLoading(false);
        }
    };

    const formateurCount = useMemo(() => formateurs.length, [formateurs]);
    const totalHeures = useMemo(() => formateurs.reduce((total, f) => total + Number(f.nbHeure || 0), 0), [formateurs]);

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => {
        setShowAddModal(false);
        setCreateForm(emptyFormateur);
    };

    const handleShowEdit = (formateur) => {
        setSelectedFormateur(formateur);
        setEditForm({ ...emptyFormateur, ...formateur, password: '' });
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedFormateur(null);
        setEditForm(emptyFormateur);
    };

    const handleChange = (setter) => (event) => {
        const { name, value } = event.target;
        setter((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateFormateur = async (event) => {
        event.preventDefault();
        try {
            await apiClient.post('/intervenant', {
                ...createForm,
                nbSeance: 0,
                nbHeure: 0,
                role: 'ROLE_INTERVENANT',
            });
            await fetchFormateurs();
            handleCloseAdd();
        } catch (err) {
            setError("La création du formateur a échoué.");
        }
    };

    const handleUpdateFormateur = async (event) => {
        event.preventDefault();
        if (!selectedFormateur) return;
        try {
            const payload = {
                ...editForm,
                nbSeance: 0,
                nbHeure: 0,
                role: 'ROLE_INTERVENANT',
            };
            if (!payload.password) {
                delete payload.password;
            }
            await apiClient.put(`/intervenant/${selectedFormateur.id}`, payload);
            await fetchFormateurs();
            handleCloseEdit();
            setSuccess("Formateur modifié avec succès.");
            setError(null);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError("La mise à jour du formateur a échoué.");
            setSuccess(null);
        }
    };

    const handleDeleteFormateur = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce formateur ?")) {
            return;
        }
        try {
            await apiClient.delete(`/intervenant/${id}`);
            setFormateurs((prev) => prev.filter((f) => f.id !== id));
            setSuccess("Formateur supprimé avec succès.");
            setError(null);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError("Impossible de supprimer ce formateur.");
            setSuccess(null);
        }
    };

    const handleViewFormations = (formateurId) => {
        navigate(`/admin/formateurs/${formateurId}/formations`);
    };

    return (
        <Container fluid className="admin-formations p-0">
            <div className="mb-4">
                <h2 className="fw-bold text-dark-teal mb-0">
                    <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 40, height: 40 }}>
                        <FontAwesomeIcon icon={faChalkboardTeacher} size="sm" />
                    </div>
                    Dashboard - Formateurs
                </h2>
                <p className="text-muted ms-5 ps-4 mt-2">Liste de tous les formateurs</p>
            </div>

            <Row className="g-4 mb-5">
                <Col md={6}>
                    <Card className="border-0 shadow-sm rounded-4 p-3 ps-4" style={{ maxWidth: '500px' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de formateurs</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{formateurCount}</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="border-0 shadow-sm rounded-4 p-3 ps-4" style={{ maxWidth: '500px' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Heures déclarées</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{totalHeures}</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faChalkboardTeacher} />
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

            {success && (
                <Alert variant="success" className="mb-3">
                    {success}
                </Alert>
            )}

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h4 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faChalkboardTeacher} size="xs" />
                        </div>
                        Liste des formateurs
                    </h4>
                    <div className="d-flex gap-3">
                        <Button variant="dark-teal" className="rounded-2 px-3 fw-bold" onClick={handleShowAdd}>
                            Ajouter un formateur
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">Nom</th>
                                <th className="py-3 text-muted border-0">Email</th>
                                <th className="py-3 text-muted border-0">Métier</th>
                                <th className="py-3 text-muted border-0 text-center">Heures</th>
                                <th className="py-3 text-muted border-0 text-center">Séances</th>
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
                            ) : formateurs.length === 0 ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={7}>
                                        Aucun formateur trouvé.
                                    </td>
                                </tr>
                            ) : (
                                formateurs.map((formateur) => (
                                    <tr key={formateur.id} className="border-bottom">
                                        <td className="ps-4 py-3 fw-bold text-dark">{`${formateur.prenom || ''} ${formateur.nom || ''}`.trim()}</td>
                                        <td className="py-3 text-muted text-decoration-underline text-dark">{formateur.mail || '—'}</td>
                                        <td className="py-3 text-muted">{formateur.metier || '—'}</td>
                                        <td className="py-3 text-center text-muted">{formateur.nbHeure ?? '—'}</td>
                                        <td className="py-3 text-center text-muted">{formateur.nbSeance ?? '—'}</td>
                                        <td className="pe-4 py-3 text-end">
                                            <div className="d-flex justify-content-end gap-3">
                                                <Button variant="link" className="p-0 text-muted" onClick={() => handleViewFormations(formateur.id)}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Button>
                                                <Button variant="link" className="p-0 text-muted" onClick={() => handleShowEdit(formateur)}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Button>
                                                <Button variant="link" className="p-0 text-danger" onClick={() => handleDeleteFormateur(formateur.id)}>
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
                    <Modal.Title className="fw-bold text-dark" style={{ fontSize: '2rem' }}>Ajouter un formateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateFormateur}>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom <span className="text-red">*</span></Form.Label>
                            <Form.Control name="nom" value={createForm.nom} onChange={handleChange(setCreateForm)} type="text" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Prénom <span className="text-red">*</span></Form.Label>
                            <Form.Control name="prenom" value={createForm.prenom} onChange={handleChange(setCreateForm)} type="text" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">E-mail</Form.Label>
                            <Form.Control name="mail" value={createForm.mail} onChange={handleChange(setCreateForm)} type="email" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Métier</Form.Label>
                            <Form.Control name="metier" value={createForm.metier} onChange={handleChange(setCreateForm)} type="text" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Identifiant <span className="text-red">*</span></Form.Label>
                            <Form.Control name="identifiant" value={createForm.identifiant} onChange={handleChange(setCreateForm)} type="text" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Mot de passe <span className="text-red">*</span></Form.Label>
                            <Form.Control name="password" value={createForm.password} onChange={handleChange(setCreateForm)} type="password" className="form-control-custom" required />
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
                    <Modal.Title className="fw-bold text-dark" style={{ fontSize: '2rem' }}>Modifier un formateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateFormateur}>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom <span className="text-red">*</span></Form.Label>
                            <Form.Control name="nom" value={editForm.nom} onChange={handleChange(setEditForm)} type="text" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Prénom <span className="text-red">*</span></Form.Label>
                            <Form.Control name="prenom" value={editForm.prenom} onChange={handleChange(setEditForm)} type="text" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">E-mail</Form.Label>
                            <Form.Control name="mail" value={editForm.mail} onChange={handleChange(setEditForm)} type="email" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Métier</Form.Label>
                            <Form.Control name="metier" value={editForm.metier} onChange={handleChange(setEditForm)} type="text" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Identifiant <span className="text-red">*</span></Form.Label>
                            <Form.Control name="identifiant" value={editForm.identifiant} onChange={handleChange(setEditForm)} type="text" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Mot de passe</Form.Label>
                            <Form.Control name="password" value={editForm.password} onChange={handleChange(setEditForm)} type="password" placeholder="(laisser vide pour conserver)" className="form-control-custom" />
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

export default AdminFormateurs;
