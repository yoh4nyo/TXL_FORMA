import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faPen, faTrash, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { adminSeanceParticipants } from '../../data/mockData';
import '../Admin/Formations/AdminFormations.css'; // Réutilisation des styles

const FormateurSeanceParticipants = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => setShowAddModal(false);

    const handleShowEdit = (participant) => {
        setSelectedParticipant(participant);
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedParticipant(null);
    };

    // Contenu fictif pour la signature - dans une vraie application, ce serait une URL d'image
    const SignaturePlaceholder = () => (
        <div className="bg-light border rounded-1 px-3 py-1 d-inline-block text-muted fst-italic" style={{ minWidth: '100px', textAlign: 'center' }}>
            Yohan
        </div>
    );

    return (
        <Container fluid className="admin-formations p-0">
            {/* En-tête */}
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
                        Formation VLAN #145 – Participants
                    </h2>
                    <p className="text-muted ms-5 ps-4 mt-2">Liste des participants de la séance 1</p>
                </div>
            </div>

            {/* Cartes Statistiques */}
            <Row className="g-4 mb-5">
                <Col md={4}>
                    <Card className="border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted mb-2 fw-bold">Nombre de participants</h6>
                                <h2 className="text-dark-teal fw-bold mb-0">240</h2>
                            </div>
                            <div className="stat-icon-square bg-dark-teal text-white rounded-3 d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Carte Tableau */}
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h4 className="fw-bold text-dark-teal mb-0">
                        <div className="d-inline-flex align-items-center justify-content-center bg-dark-teal text-white rounded-2 me-3" style={{ width: 32, height: 32 }}>
                            <FontAwesomeIcon icon={faBook} size="xs" />
                        </div>
                        Liste des participants de la séance 1
                    </h4>
                    <div className="d-flex gap-3">
                        <Button variant="outline-dark" className="rounded-2 px-3 fw-bold">
                            Exporter
                        </Button>
                        <Button variant="dark-teal" className="rounded-2 px-3 fw-bold" onClick={handleShowAdd}>
                            Ajouter un participant
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-muted border-0">Nom</th>
                                <th className="py-3 text-muted border-0">Prénom</th>
                                <th className="py-3 text-muted border-0">Note</th>
                                <th className="py-3 text-muted border-0 text-center">Présence</th>
                                <th className="pe-4 py-3 text-muted border-0 text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminSeanceParticipants.map((participant) => (
                                <tr key={participant.id} className="border-bottom">
                                    <td className="ps-4 py-3 fw-bold text-dark">{participant.lastName}</td>
                                    <td className="py-3 text-muted">{participant.firstName}</td>
                                    <td className="py-3 text-muted">{participant.note}</td>
                                    <td className="py-3 text-center">
                                        <SignaturePlaceholder />
                                    </td>
                                    <td className="pe-4 py-3 text-end">
                                        <div className="d-flex justify-content-end gap-3">
                                            <Button variant="link" className="p-0 text-muted" onClick={() => handleShowEdit(participant)}>
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

            {/* Modal Ajouter Participant */}
            <Modal show={showAddModal} onHide={handleCloseAdd} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold text-dark" style={{ fontSize: '2rem' }}>Ajouter un participant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom du participant <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" placeholder="" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Prénom du participant <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" placeholder="" className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Note du participant <span className="text-red">*</span></Form.Label>
                            <Form.Control type="number" placeholder="50" className="form-control-custom" max="20" min="0" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Check
                                type="checkbox"
                                id="presence-check"
                                label="Présent à la séance"
                                className="custom-checkbox"
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button className="btn-modal-action" onClick={handleCloseAdd}>
                                Ajouter
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal Modifier Participant */}
            <Modal show={showEditModal} onHide={handleCloseEdit} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold text-dark" style={{ fontSize: '2rem' }}>Modifier un participant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Nom du participant <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" defaultValue={selectedParticipant?.lastName} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Prénom du participant <span className="text-red">*</span></Form.Label>
                            <Form.Control type="text" defaultValue={selectedParticipant?.firstName} className="form-control-custom" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label-custom">Note du participant <span className="text-red">*</span></Form.Label>
                            <Form.Control type="number" defaultValue={selectedParticipant?.note} className="form-control-custom" max="20" min="0" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Check
                                type="checkbox"
                                id="presence-check-edit"
                                label="Présent à la séance"
                                defaultChecked={selectedParticipant?.presence}
                                className="custom-checkbox"
                            />
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

export default FormateurSeanceParticipants;
