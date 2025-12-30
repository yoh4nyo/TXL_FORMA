import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faPen, faTrash, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { adminFormationSeances } from '../../../data/mockData';
import './AdminFormations.css'; // Réutilisation des styles

const AdminFormationSeances = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSeance, setSelectedSeance] = useState(null);

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => setShowAddModal(false);

    const handleShowEdit = (seance) => {
        setSelectedSeance(seance);
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedSeance(null);
    };

    return (
        <Container fluid className="admin-formations p-0">
            {/* Header */}
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
                        Formation VLAN #145 – Session 1 : Les Séances
                    </h2>
                    <p className="text-muted ms-5 ps-4 mt-2">Liste des séances pour la session 1</p>
                </div>
            </div>

            <Row className="g-4 mb-5">
                <Col md={6}>
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
                <Col md={6}>
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

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h4 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faBook} size="xs" />
                        </div>
                        Liste des séances
                    </h4>
                    <div className="d-flex gap-3">
                        <Button variant="outline-dark" className="rounded-2 px-3 fw-bold">
                            Exporter
                        </Button>
                        <Button variant="dark-teal" className="rounded-2 px-3 fw-bold" onClick={handleShowAdd}>
                            Ajouter une séance
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">Nom</th>
                                <th className="py-3 text-muted border-0">Date</th>
                                <th className="py-3 text-muted border-0 text-center">Nombre de place total</th>
                                <th className="py-3 text-muted border-0 text-center">Nombre de place restantes</th>
                                <th className="py-3 text-muted border-0 text-center">Heure début</th>
                                <th className="py-3 text-muted border-0 text-center">Heure fin</th>
                                <th className="pe-4 py-3 text-muted border-0 text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminFormationSeances.map((seance) => (
                                <tr key={seance.id} className="border-bottom">
                                    <td className="ps-4 py-3 fw-bold text-dark">{seance.name}</td>
                                    <td className="py-3 text-muted">{seance.date}</td>
                                    <td className="py-3 text-muted text-center">{seance.totalPlaces}</td>
                                    <td className="py-3 text-muted text-center">{seance.remainingPlaces}</td>
                                    <td className="py-3 text-center">
                                        <Badge bg="primary" className="rounded-pill px-3 py-2 fw-normal opacity-75 text-white" style={{ minWidth: '80px' }}>
                                            {seance.startTime}
                                        </Badge>
                                    </td>
                                    <td className="py-3 text-center">
                                        <Badge bg="success" className="rounded-pill px-3 py-2 fw-normal opacity-75 text-white" style={{ minWidth: '80px' }}>
                                            {seance.endTime}
                                        </Badge>
                                    </td>
                                    <td className="pe-4 py-3 text-end">
                                        <div className="d-flex justify-content-end gap-3">
                                            <Button variant="link" className="p-0 text-muted" onClick={() => navigate(`/admin/seances/${seance.id}`)}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
                                            <Button variant="link" className="p-0 text-muted" onClick={() => handleShowEdit(seance)}>
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

            {/* Modal ajouter séance */}
            <Modal show={showAddModal} onHide={handleCloseAdd} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une séance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom de la séance <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" placeholder="Session 1" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nombre de place total <span className="text-red">*</span></Form.Label>
                            <Form.Control type="number" placeholder="50" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Heure de début <span className="text-red">*</span></Form.Label>
                            <Form.Control type="time" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Heure de fin <span className="text-red">*</span></Form.Label>
                            <Form.Control type="time" className="form-control-custom" />
                        </Form.Group>

                        <div className="text-center">
                            <Button className="btn-modal-action" onClick={handleCloseAdd}>
                                Ajouter
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal modifier séance */}
            <Modal show={showEditModal} onHide={handleCloseEdit} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Modifier une séance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom de la séance <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" defaultValue={selectedSeance?.name} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Date <span className="text-red">*</span></Form.Label>
                            <Form.Control type="date" defaultValue={selectedSeance?.date ? selectedSeance.date.split('/').reverse().join('-') : ''} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nombre de place total <span className="text-red">*</span></Form.Label>
                            <Form.Control type="number" defaultValue={selectedSeance?.totalPlaces} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Heure de début <span className="text-red">*</span></Form.Label>
                            <Form.Control type="time" defaultValue={selectedSeance?.startTime} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">Heure de fin <span className="text-red">*</span></Form.Label>
                            <Form.Control type="time" defaultValue={selectedSeance?.endTime} className="form-control-custom" />
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

export default AdminFormationSeances;
