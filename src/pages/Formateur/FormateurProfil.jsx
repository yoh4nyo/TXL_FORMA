import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { apiClient } from '../../api/client';
import '../Admin/Dashboard/AdminDashboard.css'; 

const FormateurProfil = () => {
    const { formateurId } = useParams();
    const [formateur, setFormateur] = useState(null);
    const [formationCount, setFormationCount] = useState(0);
    const [nbSeance, setNbSeance] = useState(0);
    const [nbHeure, setNbHeure] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        mail: '',
        metier: '',
        identifiant: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (formateurId) {
            fetchFormateur();
            fetchFormationCount();
            fetchSeanceStats();
        }
    }, [formateurId]);

    const fetchFormateur = async () => {
        setIsLoading(true);
        try {
            const data = await apiClient.get(`/intervenant/${formateurId}`);
            setFormateur(data);
            setFormData({
                nom: data.nom || '',
                prenom: data.prenom || '',
                mail: data.mail || '',
                metier: data.metier || '',
                identifiant: data.identifiant || '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            console.error("Erreur:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFormationCount = async () => {
        try {
            const data = await apiClient.get(`/formation/intervenant/${formateurId}`);
            setFormationCount(Array.isArray(data) ? data.length : 0);
        } catch (err) {
            console.error("Erreur:", err);
        }
    };

    const fetchSeanceStats = async () => {
        try {
            const count = await apiClient.get(`/seance/intervenant/${formateurId}/count`);
            const heures = await apiClient.get(`/seance/intervenant/${formateurId}/heures`);
            
            setNbSeance(count || 0);
            setNbHeure(heures || 0);
        } catch (err) {
            console.error("Erreur:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const updateData = {
                nom: formData.nom,
                prenom: formData.prenom,
                mail: formData.mail,
                metier: formData.metier,
                identifiant: formData.identifiant,
                role: 'ROLE_INTERVENANT'
            };
            if (formData.newPassword) {
                if (formData.newPassword !== formData.confirmPassword) {
                    alert('Les mots de passe ne correspondent pas');
                    return;
                }
                updateData.password = formData.newPassword;
            }
            await apiClient.put(`/intervenant/${formateurId}`, updateData);
            alert('Profil modifié avec succès');
            setIsEditing(false);
            fetchFormateur();
        } catch (err) {
            alert('Erreur lors de la modification');
        }
    };

    const stats = [
        {
            id: 1,
            label: "Mes Formations",
            value: formationCount,
            icon: faBook,
            color: "#0E5555"
        },
        {
            id: 2,
            label: "Séances",
            value: nbSeance,
            icon: faBook,
            color: "#0E5555"
        },
        {
            id: 3,
            label: "Heures",
            value: nbHeure,
            icon: faBook,
            color: "#0E5555"
        }
    ];

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header mb-5">
                <div className="d-flex align-items-center mb-2">
                    <div className="dashboard-icon-wrapper me-3 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faUser} className="text-white" size="lg" />
                    </div>
                    <h2 className="dashboard-title fw-bold text-dark-teal mb-0">Mon Profil</h2>
                </div>
                <p className="text-muted ms-5 ps-3">Gérez vos informations personnelles</p>
            </div>

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

            <Card className="border-0 shadow-sm rounded-4">
                <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold text-dark-teal mb-0">Mes Informations</h4>
                </Card.Header>
                <Card.Body className="p-4">
                    {isLoading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" role="status" />
                        </div>
                    ) : formateur ? (
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-custom text-muted fw-bold">Nom</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="nom"
                                        value={formData.nom} 
                                        onChange={handleInputChange}
                                        readOnly={!isEditing}
                                        className={`form-control-custom ${!isEditing ? 'bg-light border-0' : ''}`}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-custom text-muted fw-bold">Prénom</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="prenom"
                                        value={formData.prenom} 
                                        onChange={handleInputChange}
                                        readOnly={!isEditing}
                                        className={`form-control-custom ${!isEditing ? 'bg-light border-0' : ''}`}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-custom text-muted fw-bold">Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        name="mail"
                                        value={formData.mail} 
                                        onChange={handleInputChange}
                                        readOnly={!isEditing}
                                        className={`form-control-custom w-100 ${!isEditing ? 'bg-light border-0' : ''}`}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-custom text-muted fw-bold">Identifiant</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="identifiant"
                                        value={formData.identifiant} 
                                        onChange={handleInputChange}
                                        readOnly={!isEditing}
                                        className={`form-control-custom ${!isEditing ? 'bg-light border-0' : ''}`}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="form-label-custom text-muted fw-bold">Métier</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="metier"
                                        value={formData.metier} 
                                        onChange={handleInputChange}
                                        readOnly={!isEditing}
                                        className={`form-control-custom ${!isEditing ? 'bg-light border-0' : ''}`}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {isEditing && (
                            <>
                                <h5 className="fw-bold text-dark-teal mt-4 mb-3">Sécurité</h5>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="form-label-custom text-muted fw-bold">Nouveau mot de passe</Form.Label>
                                            <Form.Control 
                                                type="password" 
                                                name="newPassword"
                                                placeholder="••••••••"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                className="form-control-custom"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="form-label-custom text-muted fw-bold">Confirmer le mot de passe</Form.Label>
                                            <Form.Control 
                                                type="password" 
                                                name="confirmPassword"
                                                placeholder="••••••••"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className="form-control-custom"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                                    <div className="d-flex gap-2">
                                        <Button variant="outline-secondary" onClick={() => {
                                            setIsEditing(false);
                                            fetchFormateur();
                                        }} className="px-4 fw-bold">
                                            Annuler
                                        </Button>
                                        <Button variant="dark-teal" onClick={handleSaveChanges} className="px-4 fw-bold">
                                            Enregistrer
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}

                        {!isEditing && (
                            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                                <Button variant="dark-teal" onClick={() => setIsEditing(true)} className="px-4 fw-bold">
                                    Modifier
                                </Button>
                            </div>
                        )}
                    </Form>
                    ) : (
                        <p className="text-muted">Aucune donnée disponible</p>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default FormateurProfil;
