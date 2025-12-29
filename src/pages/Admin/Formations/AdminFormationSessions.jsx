import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faPen, faTrash, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { adminFormationSessions } from '../../../data/mockData';
import './AdminFormations.css';

const AdminFormationSessions = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => setShowAddModal(false);

    const handleShowEdit = (session) => {
        setSelectedSession(session);
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedSession(null);
    };

    return (
        <Container fluid className="admin-formations p-0">
            {/* Header */}
            <div className="mb-4">
                <div className="mb-3">
                    <Button variant="link" className="p-0 text-dark text-decoration-none d-inline-flex align-items-center" onClick={() => navigate('/admin/formations')}>
                        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                        <span className="ms-2 fw-bold">Retour</span>
                    </Button>
                </div>
                <div>
                    <h2 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 40, height: 40 }}>
                            <FontAwesomeIcon icon={faBook} size="sm" />
                        </div>
                        Formation VLAN #145 – Sessions
                    </h2>
                    <p className="text-muted ms-5 ps-4 mt-2">Liste des sessions de la formation VLAN #145</p>
                </div>
            </div>

            {/* Stats Cards */}
            <Row className="g-4 mb-5">
                <Col md={4}>
                    <Card className="border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de sessions</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">5</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faBook} />
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de séances</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">100</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faBook} />
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de candidat</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">240</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Table Card */}
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h4 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faBook} size="xs" />
                        </div>
                        Liste des sessions
                    </h4>
                    <div className="d-flex gap-3">
                        <Button variant="outline-dark" className="rounded-2 px-3 fw-bold">
                            Exporter
                        </Button>
                        <Button variant="dark-teal" className="rounded-2 px-3 fw-bold" onClick={handleShowAdd}>
                            Ajouter une session
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">Nom</th>
                                <th className="py-3 text-muted border-0 text-center">Nombre de séances</th>
                                <th className="py-3 text-muted border-0 text-center">Nombre de place total</th>
                                <th className="py-3 text-muted border-0 text-center">Nombre de place restantes</th>
                                <th className="py-3 text-muted border-0 text-center">Date début</th>
                                <th className="py-3 text-muted border-0 text-center">Date fin</th>
                                <th className="pe-4 py-3 text-muted border-0 text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminFormationSessions.map((session) => (
                                <tr key={session.id} className="border-bottom">
                                    <td className="ps-4 py-3 fw-bold text-dark">{session.name}</td>
                                    <td className="py-3 text-muted text-center">{session.seances}</td>
                                    <td className="py-3 text-muted text-center">{session.totalPlaces}</td>
                                    <td className="py-3 text-muted text-center">{session.remainingPlaces}</td>
                                    <td className="py-3 text-center">
                                        <Badge bg="primary" className="rounded-pill px-3 py-2 fw-normal opacity-75 text-white">
                                            {session.startDate}
                                        </Badge>
                                    </td>
                                    <td className="py-3 text-center">
                                        <Badge bg="success" className="rounded-pill px-3 py-2 fw-normal opacity-75 text-white">
                                            {session.endDate}
                                        </Badge>
                                    </td>
                                    <td className="pe-4 py-3 text-end">
                                        <div className="d-flex justify-content-end gap-3">
                                            <Button variant="link" className="p-0 text-muted" onClick={() => navigate(`/admin/sessions/${session.id}`)}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
                                            <Button variant="link" className="p-0 text-muted" onClick={() => handleShowEdit(session)}>
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
            </Card>

            {/* Modal Ajouter Session */}
            <Modal show={showAddModal} onHide={handleCloseAdd} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom de la session <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" placeholder="Session 1" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nombre de séances <span className="text-red">*</span></Form.Label>
                            <Form.Control type="number" placeholder="5" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date de début <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Date de fin <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" className="form-control-custom" />
                        </Form.Group>

                        <div className="text-center">
                            <Button className="btn-modal-action" onClick={handleCloseAdd}>
                                Ajouter
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal Modifier Session */}
            <Modal show={showEditModal} onHide={handleCloseEdit} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Modifier la session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom de la session <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" defaultValue={selectedSession?.name} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date de début <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" defaultValue={selectedSession?.startDate} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Date de fin <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" defaultValue={selectedSession?.endDate} className="form-control-custom" />
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

export default AdminFormationSessions;
