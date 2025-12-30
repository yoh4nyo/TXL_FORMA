import React from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../Admin/Dashboard/AdminDashboard.css'; 

const FormateurProfil = () => {
    // Données utilisateur fictives pour le formateur spécifique
    const formateur = {
        firstName: 'Yohan',
        lastName: 'SOM',
        email: 'yohan.som@gmail.com',
        role: 'Formateur',
        speciality: 'Réseaux et Sécurité',
        joinDate: '15/05/2023',
        description: 'Expert en réseaux informatiques et cybersécurité avec 10 ans d\'expérience.'
    };

    const stats = [
        {
            id: 1,
            label: "Mes Formations",
            value: "8",
            icon: faBook,
            color: "#0E5555"
        }
    ];

    return (
        <div className="admin-dashboard">
            {/* En-tête */}
            <div className="dashboard-header mb-5">
                <div className="d-flex align-items-center mb-2">
                    <div className="dashboard-icon-wrapper me-3 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faUser} className="text-white" size="lg" />
                    </div>
                    <h2 className="dashboard-title fw-bold text-dark-teal mb-0">Mon Profil</h2>
                </div>
                <p className="text-muted ms-5 ps-3">Gérez vos informations personnelles</p>
            </div>

            {/* Statistiques */}
            <Row className="g-4 mb-5">
                {stats.map((stat) => (
                    <Col lg={4} md={6} key={stat.id}>
                        <Card className="stat-card border-0 shadow-sm h-100">
                            <Card.Body className="d-flex justify-content-between align-items-center p-4">
                                <div>
                                    <h6 className="stat-label text-muted fw-bold mb-2">{stat.label}</h6>
                                    <h3 className="stat-value fw-bold text-dark-teal mb-0">{stat.value}</h3>
                                </div>
                                <div className="stat-icon-box rounded-3 d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={stat.icon} className="stat-icon text-white fs-4" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Carte détails profil */}
            <Card className="border-0 shadow-sm rounded-4">
                <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold text-dark-teal mb-0">Mes Informations</h4>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-custom text-muted fw-bold">Nom</Form.Label>
                                    <Form.Control type="text" defaultValue={formateur.lastName} readOnly className="form-control-custom bg-light border-0" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-custom text-muted fw-bold">Prénom</Form.Label>
                                    <Form.Control type="text" defaultValue={formateur.firstName} readOnly className="form-control-custom bg-light border-0" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-custom text-muted fw-bold">Email</Form.Label>
                                    <Form.Control type="email" defaultValue={formateur.email} readOnly className="form-control-custom bg-light border-0" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <h5 className="fw-bold text-dark-teal mt-4 mb-3">Sécurité</h5>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-custom text-muted fw-bold">Nouveau mot de passe</Form.Label>
                                    <Form.Control type="password" placeholder="••••••••" className="form-control-custom bg-light border-0" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-custom text-muted fw-bold">Confirmer le mot de passe</Form.Label>
                                    <Form.Control type="password" placeholder="••••••••" className="form-control-custom bg-light border-0" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                            <button type="button" className="btn btn-outline-danger d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faTrash} />
                                <span>Supprimer son compte</span>
                            </button>
                            <button type="button" className="btn btn-dark-teal px-4 fw-bold">
                                Modifier
                            </button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default FormateurProfil;
