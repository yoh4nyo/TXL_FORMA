import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPen, faTrash, faUser, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../api/client';
import '../Formations/AdminFormations.css';

const emptyUser = { nom: '', prenom: '', mail: '', adresse: '', nbAbsence: 0, identifiant: '', password: '', role: 'ROLE_ELEVE' };

const AdminUsers = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [createForm, setCreateForm] = useState(emptyUser);
    const [editForm, setEditForm] = useState(emptyUser);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiClient.get('/eleve');
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("Impossible de charger les élèves.");
        } finally {
            setIsLoading(false);
        }
    };

    const usersCount = useMemo(() => users.length, [users]);
    const adminCount = useMemo(() => users.filter((u) => u.role === 'ROLE_ADMIN').length, [users]);

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => {
        setShowAddModal(false);
        setCreateForm(emptyUser);
    };

    const handleShowEdit = (user) => {
        setSelectedUser(user);
        setEditForm({ ...emptyUser, ...user, password: '' });
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedUser(null);
        setEditForm(emptyUser);
    };

    const handleChange = (setter) => (event) => {
        const { name, value } = event.target;
        setter((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateUser = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                ...createForm,
                nbAbsence: 0
            };
            await apiClient.post('/eleve', payload);
            await fetchUsers();
            handleCloseAdd();
        } catch (err) {
            setError("La création de l'élève a échoué.");
        }
    };

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        if (!selectedUser) return;
        try {
            const payload = {
                ...editForm,
                nbAbsence: 0
            };
            if (!payload.password) {
                delete payload.password;
            }
            await apiClient.put(`/eleve/${selectedUser.id}`, payload);
            await fetchUsers();
            handleCloseEdit();
        } catch (err) {
            setError("La mise à jour a échoué.");
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet élève ?")) {
            return;
        }
        try {
            await apiClient.delete(`/eleve/${id}`);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            setSuccess("Élève supprimé avec succès.");
            setError(null);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError("Impossible de supprimer cet élève.");
            setSuccess(null);
        }
    };

    const handleViewFormations = (userId) => {
        navigate(`/admin/utilisateurs/${userId}/formations`);
    };

    return (
        <Container fluid className="admin-formations p-0">
            <div className="mb-4">
                <h2 className="fw-bold text-dark-teal mb-0">
                    <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 40, height: 40 }}>
                        <FontAwesomeIcon icon={faUsers} size="sm" />
                    </div>
                    Dashboard - Utilisateurs
                </h2>
                <p className="text-muted ms-5 ps-4 mt-2">Liste de tous les comptes</p>
            </div>

            <Row className="g-4 mb-5">
                <Col md={6}>
                    <Card className="border-0 shadow-sm rounded-4 p-3 ps-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre d'utilisateurs</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">{usersCount}</h2>
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

            {success && (
                <Alert variant="success" className="mb-3">
                    {success}
                </Alert>
            )}

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h4 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faUsers} size="xs" />
                        </div>
                        Liste des utilisateurs
                    </h4>
                    <div className="d-flex gap-3">
                        <Button variant="dark-teal" className="rounded-2 px-3 fw-bold" onClick={handleShowAdd}>
                            Ajouter un utilisateur
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">Nom</th>
                                <th className="py-3 text-muted border-0">Prénom</th>
                                <th className="py-3 text-muted border-0">E-mail</th>
                                <th className="py-3 text-muted border-0">Identifiant</th>
                                <th className="py-3 text-muted border-0 text-center">Rôle</th>
                                <th className="pe-4 py-3 text-muted border-0 text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={4}>
                                        <Spinner animation="border" role="status" />
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td className="text-center py-4" colSpan={4}>
                                        Aucun utilisateur trouvé.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="border-bottom">
                                        <td className="ps-4 py-3 fw-bold text-dark">{user.nom || '—'}</td>
                                        <td className="py-3 text-muted">{user.prenom || '—'}</td>
                                        <td className="py-3 text-muted text-decoration-underline text-dark">{user.mail || '—'}</td>
                                        <td className="py-3 text-muted">{user.identifiant}</td>
                                        <td className="py-3 text-center">
                                            <Badge bg="secondary" className="text-uppercase">{user.role}</Badge>
                                        </td>
                                        <td className="pe-4 py-3 text-end">
                                            <div className="d-flex justify-content-end gap-3">
                                                <Button variant="link" className="p-0 text-muted" onClick={() => handleViewFormations(user.id)}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Button>
                                                <Button variant="link" className="p-0 text-muted" onClick={() => handleShowEdit(user)}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Button>
                                                <Button variant="link" className="p-0 text-danger" onClick={() => handleDeleteUser(user.id)}>
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
                    <Modal.Title className="fw-bold text-dark" style={{ fontSize: '2rem' }}>Ajouter un utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateUser}>
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
                            <Form.Label className="form-label-custom">Adresse</Form.Label>
                            <Form.Control name="adresse" value={createForm.adresse} onChange={handleChange(setCreateForm)} type="text" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Identifiant <span className="text-red">*</span></Form.Label>
                            <Form.Control name="identifiant" value={createForm.identifiant} onChange={handleChange(setCreateForm)} type="text" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-5">
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
                    <Modal.Title className="fw-bold text-dark" style={{ fontSize: '2rem' }}>Modifier un utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateUser}>
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
                            <Form.Label className="form-label-custom">Adresse</Form.Label>
                            <Form.Control name="adresse" value={editForm.adresse} onChange={handleChange(setEditForm)} type="text" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Identifiant <span className="text-red">*</span></Form.Label>
                            <Form.Control name="identifiant" value={editForm.identifiant} onChange={handleChange(setEditForm)} type="text" className="form-control-custom" required />
                        </Form.Group>

                        <Form.Group className="mb-5">
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

export default AdminUsers;
