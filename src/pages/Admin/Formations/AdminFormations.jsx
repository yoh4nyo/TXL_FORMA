import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../api/client';
import './AdminFormations.css';

const CATEGORIES = ['Bureautique', 'Réseaux & Télécommunications', 'Cybersécurité', 'Administration Système', 'Conduite de Projet', 'Développement Front', 'Développement Back'];

const emptyFormation = {
    nom: '',
    description: '',
    prix: '',
    categorie: '',
    apprentissages: '',
};

const AdminFormations = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedFormation, setSelectedFormation] = useState(null);
    const [formations, setFormations] = useState([]);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [createForm, setCreateForm] = useState(emptyFormation);
    const [editForm, setEditForm] = useState(emptyFormation);

    const totalFormations = useMemo(() => formations.length, [formations]);
    const totalVentes = stats?.totalVentes ?? 0;

    useEffect(() => {
        fetchFormations();
        fetchStats();
    }, []);

    const fetchFormations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiClient.get('/formation');
            setFormations(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("Impossible de charger les formations.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const data = await apiClient.get('/stats/dashboard');
            setStats(data);
        } catch (err) {
            // stats non bloquantes pour la page
        }
    };

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => {
        setShowAddModal(false);
        setCreateForm(emptyFormation);
    };

    const handleShowEdit = (formation) => {
        setSelectedFormation(formation);
        const apprentissagesStr = Array.isArray(formation.apprentissages) ? formation.apprentissages.join(', ') : '';
        setEditForm({ ...emptyFormation, ...formation, prix: formation?.prix ?? '', apprentissages: apprentissagesStr });
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedFormation(null);
        setEditForm(emptyFormation);
    };

    const handleCreateFormation = async (event) => {
        event.preventDefault();
        try {
            const apprentissages = createForm.apprentissages.split(',').map(item => item.trim()).filter(item => item !== '');
            await apiClient.post('/formation', { ...createForm, prix: Number(createForm.prix || 0), apprentissages });
            await fetchFormations();
            handleCloseAdd();
        } catch (err) {
            setError("La création a échoué. Vérifiez les champs obligatoires.");
        }
    };

    const handleUpdateFormation = async (event) => {
        event.preventDefault();
        if (!selectedFormation) return;
        try {
            const apprentissages = typeof editForm.apprentissages === 'string' 
                ? editForm.apprentissages.split(',').map(item => item.trim()).filter(item => item !== '')
                : editForm.apprentissages;
            await apiClient.put(`/formation/${selectedFormation.id}`, { ...editForm, prix: Number(editForm.prix || 0), apprentissages });
            await fetchFormations();
            handleCloseEdit();
        } catch (err) {
            setError("La mise à jour a échoué.");
        }
    };

    const handleDeleteFormation = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
            return;
        }
        try {
            await apiClient.delete(`/formation/${id}`);
            setFormations((prev) => prev.filter((f) => f.id !== id));
            setSuccess("Formation supprimée avec succès.");
            setError(null);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError("Impossible de supprimer cette formation.");
            setSuccess(null);
        }
    };

    const handleChange = (setter) => (event) => {
        const { name, value } = event.target;
        setter((prev) => ({ ...prev, [name]: value }));
    };

    const formatPrice = (value) => {
        if (value === undefined || value === null || value === '') return 'N/A';
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(value));
    };

    return (
        <Container fluid className="admin-formations p-0">
            <div className="mb-4">
                <h2 className="fw-bold text-dark-teal mb-1">
                    <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 40, height: 40 }}>
                        <FontAwesomeIcon icon={faBook} size="sm" />
                    </div>
                    Dashboard formations
                </h2>
                <p className="text-muted ms-5 ps-2">Gérer les formations</p>
            </div>

            <Row className="g-4 mb-4">
                <Col md={6}>
                    <Card className="border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de formations</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{totalFormations}</h2>
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
                                <h6 className="text-muted mb-2 fw-bold">Nombre de formations vendues</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{totalVentes}</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faBook} />
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
                            <FontAwesomeIcon icon={faBook} size="xs" />
                        </div>
                        Liste des formations
                    </h4>
                    <div className="d-flex gap-3">
                        <Button variant="dark-teal" className="rounded-2 px-3 fw-bold" onClick={handleShowAdd}>
                            Ajouter une formation
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">Nom</th>
                                <th className="py-3 text-muted border-0">Catégorie</th>
                                <th className="py-3 text-muted border-0">Prix</th>
                                <th className="py-3 text-muted border-0">Apprentissages</th>
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
                            ) : formations.length === 0 ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={6}>
                                        Aucune formation disponible.
                                    </td>
                                </tr>
                            ) : (
                                formations.map((formation) => (
                                    <tr key={formation.id} className="border-bottom">
                                        <td className="ps-4 py-3 fw-bold text-dark">{formation.nom}</td>
                                        <td className="py-3 text-muted">{formation.categorie || 'N/A'}</td>
                                        <td className="py-3 fw-bold text-muted">{formatPrice(formation.prix)}</td>
                                        <td className="py-3 text-muted">
                                            {Array.isArray(formation.apprentissages) && formation.apprentissages.length > 0 ? (
                                                <div className="d-flex flex-wrap gap-1">
                                                    {formation.apprentissages.map((app, idx) => (
                                                        <Badge key={idx} bg="light" text="dark" className="fw-normal">
                                                            {app.substring(0, 20)}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                        <td className="pe-4 py-3 text-end">
                                            <div className="d-flex justify-content-end gap-3">
                                                <Button variant="link" className="p-0 text-muted" onClick={() => navigate(`/admin/formations/${formation.id}`)}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Button>
                                                <Button variant="link" className="p-0 text-muted" onClick={() => handleShowEdit(formation)}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Button>
                                                <Button variant="link" className="p-0 text-danger" onClick={() => handleDeleteFormation(formation.id)}>
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
                    <Modal.Title>Ajouter une formation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateFormation}>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom <span className="text-red">*</span></Form.Label>
                            <Form.Control name="nom" value={createForm.nom} onChange={handleChange(setCreateForm)} type="text" placeholder="Nom de la formation" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Description</Form.Label>
                            <Form.Control as="textarea" rows={2} name="description" value={createForm.description} onChange={handleChange(setCreateForm)} placeholder="Description de la formation" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Catégorie</Form.Label>
                            <Form.Select name="categorie" value={createForm.categorie} onChange={handleChange(setCreateForm)} className="form-control-custom">
                                <option value="">-- Sélectionner une catégorie --</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Prix (€)</Form.Label>
                            <Form.Control name="prix" value={createForm.prix} onChange={handleChange(setCreateForm)} type="number" placeholder="0" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Apprentissages (séparés par des virgules)</Form.Label>
                            <Form.Control as="textarea" rows={3} name="apprentissages" value={createForm.apprentissages} onChange={handleChange(setCreateForm)} placeholder="Ex: JavaScript, React, Node.js" className="form-control-custom" />
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
                    <Modal.Title>Modifier la formation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateFormation}>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom <span className="text-red">*</span></Form.Label>
                            <Form.Control name="nom" value={editForm.nom} onChange={handleChange(setEditForm)} type="text" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Description</Form.Label>
                            <Form.Control as="textarea" rows={2} name="description" value={editForm.description} onChange={handleChange(setEditForm)} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Catégorie</Form.Label>
                            <Form.Select name="categorie" value={editForm.categorie} onChange={handleChange(setEditForm)} className="form-control-custom">
                                <option value="">-- Sélectionner une catégorie --</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Prix (€)</Form.Label>
                            <Form.Control name="prix" value={editForm.prix} onChange={handleChange(setEditForm)} type="number" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Apprentissages (séparés par des virgules)</Form.Label>
                            <Form.Control as="textarea" rows={3} name="apprentissages" value={editForm.apprentissages} onChange={handleChange(setEditForm)} className="form-control-custom" />
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

export default AdminFormations;
