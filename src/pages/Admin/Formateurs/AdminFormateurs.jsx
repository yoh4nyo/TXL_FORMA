import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faPen, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { adminFormateurs } from '../../../data/mockData';
import '../Formations/AdminFormations.css';

const AdminFormateurs = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedFormateur, setSelectedFormateur] = useState(null);

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => setShowAddModal(false);

    const handleShowEdit = (formateur) => {
        setSelectedFormateur(formateur);
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedFormateur(null);
    };

    return (
        <Container fluid className="admin-formations p-0">
            {/* Header */}
            <div className="mb-4">
                <h2 className="fw-bold text-dark-teal mb-0">
                    <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 40, height: 40 }}>
                        <FontAwesomeIcon icon={faChalkboardTeacher} size="sm" />
                    </div>
                    Dashboard - Formateurs
                </h2>
                <p className="text-muted ms-5 ps-4 mt-2">Liste de tout les formateurs du sites</p>
            </div>

            {/* Stats Cards */}
            <Row className="g-4 mb-5">
                <Col md={12}>
                    <Card className="border-0 shadow-sm rounded-4 p-3 ps-4" style={{ maxWidth: '500px' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de formateurs</h6>
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
                            <FontAwesomeIcon icon={faChalkboardTeacher} size="xs" />
                        </div>
                        Liste des formateurs
                    </h4>
                    <div className="d-flex gap-3">
                        <Button variant="outline-dark" className="rounded-2 px-3 fw-bold">
                            Exporter
                        </Button>
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
                                <th className="py-3 text-muted border-0 text-center">Formations</th>
                                <th className="py-3 text-muted border-0">Inscription</th>
                                <th className="pe-4 py-3 text-muted border-0 text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminFormateurs.map((formateur) => (
                                <tr key={formateur.id} className="border-bottom">
                                    <td className="ps-4 py-3 fw-bold text-dark">
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle bg-dark-teal text-white d-flex align-items-center justify-content-center me-2" style={{ width: 30, height: 30, fontSize: '0.8rem' }}>
                                                YS
                                            </div>
                                            {formateur.lastName}
                                        </div>
                                    </td>
                                    <td className="py-3 text-muted text-decoration-underline text-dark">{formateur.email}</td>
                                    <td className="py-3 text-center">
                                        <Badge bg="primary" className="rounded-pill px-3 py-2 fw-normal opacity-50 text-blue-custom" style={{ minWidth: '40px', backgroundColor: '#7b96d4 !important', color: '#fff' }}>
                                            {formateur.formationsCount}
                                        </Badge>
                                    </td>
                                    <td className="py-3 text-muted">{formateur.inscriptionDate}</td>
                                    <td className="pe-4 py-3 text-end">
                                        <div className="d-flex justify-content-end gap-3">
                                            <Button variant="link" className="p-0 text-muted" onClick={() => handleShowEdit(formateur)}>
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

            {/* Modal Ajouter Formateur */}
            <Modal show={showAddModal} onHide={handleCloseAdd} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold text-dark" style={{ fontSize: '2rem' }}>Ajouter un formateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" placeholder="" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Prénom <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" placeholder="" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">E-mail <span className="text-red">*</span></Form.Label>
                            <Form.Control type="email" placeholder="" className="form-control-custom" />
                        </Form.Group>

                        <div className="text-center">
                            <Button className="btn-modal-action" onClick={handleCloseAdd}>
                                Ajouter
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal Modifier Formateur */}
            <Modal show={showEditModal} onHide={handleCloseEdit} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold text-dark" style={{ fontSize: '2rem' }}>Modifier un formateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" defaultValue={selectedFormateur?.lastName} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Prénom <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" defaultValue="Yohan" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="form-label-custom">E-mail <span className="text-red">*</span></Form.Label>
                            <Form.Control type="email" defaultValue={selectedFormateur?.email} className="form-control-custom" />
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

export default AdminFormateurs;
