import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { adminFormationsList } from '../../../data/mockData';
import './AdminFormations.css';

const AdminFormations = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedFormation, setSelectedFormation] = useState(null);

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => setShowAddModal(false);

    const handleShowEdit = (formation) => {
        setSelectedFormation(formation);
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedFormation(null);
    };
    return (
        <Container fluid className="admin-formations p-0">
            {/* Header */}
            <div className="mb-4">
                <h2 className="fw-bold text-dark-teal mb-1">
                    <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 40, height: 40 }}>
                        <FontAwesomeIcon icon={faBook} size="sm" />
                    </div>
                    Dashboard formations
                </h2>
                <p className="text-muted ms-5 ps-2">Gérer les formations</p>
            </div>

            <Row className="g-4 mb-5">
                <Col md={6}>
                    <Card className="border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de formations</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">1.189</h2>
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
                                <h2 className="text-dark-teal fw-bold mb-0">500</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faBook} />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h4 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faBook} size="xs" />
                        </div>
                        Liste des formations
                    </h4>
                    <div className="d-flex gap-3">
                        <Button variant="outline-dark" className="rounded-2 px-3 fw-bold">
                            Exporter
                        </Button>
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
                                <th className="py-3 text-muted border-0 text-center">Nombre de sessions</th>
                                <th className="py-3 text-muted border-0 text-center">Nombre de séances</th>
                                <th className="py-3 text-muted border-0 text-center">Date début</th>
                                <th className="py-3 text-muted border-0 text-center">Date fin</th>
                                <th className="py-3 text-muted border-0">Prix</th>
                                <th className="pe-4 py-3 text-muted border-0 text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminFormationsList.map((formation) => (
                                <tr key={formation.id} className="border-bottom">
                                    <td className="ps-4 py-3 fw-bold text-dark">{formation.name}</td>
                                    <td className="py-3 text-muted text-center">{formation.sessions}</td>
                                    <td className="py-3 text-muted text-center">{formation.seances}</td>
                                    <td className="py-3 text-center">
                                        <Badge bg="primary" className="rounded-pill px-3 py-2 fw-normal opacity-75 text-white">
                                            {formation.startDate}
                                        </Badge>
                                    </td>
                                    <td className="py-3 text-center">
                                        <Badge bg="success" className="rounded-pill px-3 py-2 fw-normal opacity-75 text-white">
                                            {formation.endDate}
                                        </Badge>
                                    </td>
                                    <td className="py-3 fw-bold text-muted">{formation.price}</td>
                                    <td className="pe-4 py-3 text-end">
                                        <div className="d-flex justify-content-end gap-3">
                                            <Button variant="link" className="p-0 text-muted" onClick={() => navigate(`/admin/formations/${formation.id}`)}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
                                            <Button variant="link" className="p-0 text-muted" onClick={() => handleShowEdit(formation)}>
                                                <FontAwesomeIcon icon={faPen} />
                                            </Button>
                                            <Button variant="link" className="p-0 text-danger">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
                { /* Pagination */ }
            </Card>

            {/* Modal Ajouter */}
            <Modal show={showAddModal} onHide={handleCloseAdd} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une formation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom de la formation <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" placeholder="Nom de la formation" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nombre de sessions <span className="text-red">*</span></Form.Label>
                            <Form.Control type="number" placeholder="Nombre de sessions" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date de début <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date de fin <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Prix <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" placeholder="Prix" className="form-control-custom" />
                        </Form.Group>

                        <div className="text-center">
                            <Button className="btn-modal-action" onClick={handleCloseAdd}>
                                Ajouter
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal Modifier */}
            <Modal show={showEditModal} onHide={handleCloseEdit} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Modifier la formation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom de la formation <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" defaultValue={selectedFormation?.name} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nombre de sessions <span className="text-red">*</span></Form.Label>
                            <Form.Control type="number" defaultValue={selectedFormation?.sessions} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date de début <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" defaultValue={selectedFormation?.startDate} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date de fin <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" defaultValue={selectedFormation?.endDate} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Prix <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" defaultValue={selectedFormation?.price} className="form-control-custom" />
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

export default AdminFormations;
