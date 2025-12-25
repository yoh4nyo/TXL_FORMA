import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faAward, faCalendarAlt, faUser, faBook, faMedal, faClock, faPencilAlt, faCog, faArrowLeft, faCheckCircle, faEye, faLock, faBell, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Profil.css';

function Profil() {
    const [activeTab, setActiveTab] = useState('profil');

    // Données utilisateur factices
    const user = {
        firstName: "Yohan",
        lastName: "SOM",
        email: "yohan.som@gmail.com",
        displayEmail: "yohan.som77@gmail.com",
        phone: "+33 7 85 56 23 45",
        address: "17 rue des coliberts, 77185 Lognes",
        memberSince: "2 décembre 2021",
        stats: {
            formations: 3,
            certificates: 1,
            hours: "500h"
        },
        image: "https://placehold.co/150x150/e0e0e0/333333?text=YS"
    };

    const activeFormations = [
        {
            id: 1,
            title: "VLAN",
            category: "Réseaux et Internet",
            supervisor: "M. RAKOTOMAVO",
            progress: 33,
            inscrit: "24/09/2005",
            lastCourse: "il y a 5 jours",
            image: "https://img.freepik.com/free-photo/network-technician-working-server-room_1098-18182.jpg?t=st=1735032000~exp=1735035600~hmac=abcdef",
            status: "En cours"
        },
        {
            id: 2,
            title: "VLAN",
            category: "Réseaux et Internet",
            supervisor: "M. RAKOTOMAVO",
            progress: 59,
            inscrit: "24/09/2000",
            lastCourse: "il y a 5 jours",
            image: "https://img.freepik.com/free-photo/network-technician-working-server-room_1098-18182.jpg?t=st=1735032000~exp=1735035600~hmac=abcdef",
            status: "En cours"
        }
    ];

    const completedFormations = [
        {
            id: 3,
            title: "VLAN",
            category: "Réseaux et Internet",
            supervisor: "M. RAKOTOMAVO",
            progress: 100,
            inscrit: "24/09/2000",
            lastCourse: "il y a 5 jours",
            image: "https://img.freepik.com/free-photo/network-technician-working-server-room_1098-18182.jpg?t=st=1735032000~exp=1735035600~hmac=abcdef",
            status: "Terminée"
        }
    ];

    return (
        <div className="profil-page">
            {/* Section En-tête */}
            <div className="profil-header text-white">
                <Container>
                    <Link to="/" className="text-white text-decoration-none mb-4 d-inline-block small fw-bold">
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                        Retour
                    </Link>

                    <div className="d-flex align-items-center gap-4 profil-header-content">
                        <div className="profil-avatar-wrapper">
                            <img src={user.image} alt={user.firstName} className="profil-avatar rounded-circle border-4 border-white" />
                        </div>
                        <div>
                            <h1 className="fw-bold mb-1">{user.firstName} {user.lastName}</h1>
                            <p className="mb-3 opacity-75 small text-decoration-underline">{user.email}</p>

                            <div className="d-flex gap-4 text-small opacity-90">
                                <span><FontAwesomeIcon icon={faBook} className="me-2" /> {user.stats.formations} Formations</span>
                                <span><FontAwesomeIcon icon={faAward} className="me-2" /> {user.stats.certificates} Certificat</span>
                                <span><FontAwesomeIcon icon={faCalendarAlt} className="me-2" /> Membre depuis le {user.memberSince}</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Onglets de navigation */}
            <div className="profil-nav-tabs bg-white shadow-sm mb-5">
                <Container className="d-flex justify-content-center gap-2 gap-md-5 py-3">
                    <Button
                        variant={activeTab === 'profil' ? "dark-teal" : "link"}
                        className={`nav-tab-btn ${activeTab === 'profil' ? 'active rounded-pill px-4 fw-bold' : 'text-muted text-decoration-none px-3'}`}
                        onClick={() => setActiveTab('profil')}
                    >
                        <FontAwesomeIcon icon={faUser} className="me-2" /> Profil
                    </Button>
                    <Button
                        variant={activeTab === 'formations' ? "dark-teal" : "link"}
                        className={`nav-tab-btn ${activeTab === 'formations' ? 'active rounded-pill px-4 fw-bold' : 'text-muted text-decoration-none px-3'}`}
                        onClick={() => setActiveTab('formations')}
                    >
                        <FontAwesomeIcon icon={faBook} className="me-2" /> Mes formations
                    </Button>
                    <Button
                        variant={activeTab === 'certificats' ? "dark-teal" : "link"}
                        className={`nav-tab-btn ${activeTab === 'certificats' ? 'active rounded-pill px-4 fw-bold' : 'text-muted text-decoration-none px-3'}`}
                        onClick={() => setActiveTab('certificats')}
                    >
                        <FontAwesomeIcon icon={faAward} className="me-2" /> Mes certificats
                    </Button>
                    <Button
                        variant={activeTab === 'parametres' ? "dark-teal" : "link"}
                        className={`nav-tab-btn ${activeTab === 'parametres' ? 'active rounded-pill px-4 fw-bold' : 'text-muted text-decoration-none px-3'}`}
                        onClick={() => setActiveTab('parametres')}
                    >
                        <FontAwesomeIcon icon={faCog} className="me-2" /> Paramètres
                    </Button>
                </Container>
            </div>

            <Container className="pb-5">
                {activeTab === 'profil' && (
                    <>
                        {/* Section Informations personnelles */}
                        <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold mb-0 text-dark-teal">
                                    <div className="icon-box-small d-inline-flex align-items-center justify-content-center me-2 text-white bg-dark-teal rounded-2" style={{ width: 32, height: 32 }}>
                                        <i className="bi bi-send-fill" style={{ fontSize: '0.9rem' }}></i>
                                    </div>
                                    Informations personnelles
                                </h4>
                                <Button variant="light" className="text-muted fw-bold btn-modifier shadow-sm">
                                    <FontAwesomeIcon icon={faPencilAlt} className="me-2" /> Modifier
                                </Button>
                            </div>

                            <Form>
                                <Row className="g-4">
                                    <Col md={6}>
                                        <Form.Group controlId="nom">
                                            <Form.Label className="small fw-bold">Nom</Form.Label>
                                            <Form.Control type="text" value={user.lastName} readOnly className="form-control-profil bg-light" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="prenom">
                                            <Form.Label className="small fw-bold">Prénom</Form.Label>
                                            <Form.Control type="text" value={user.firstName} readOnly className="form-control-profil bg-light" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="telephone">
                                            <Form.Label className="small fw-bold">Téléphone</Form.Label>
                                            <Form.Control type="text" value={user.phone} readOnly className="form-control-profil bg-light" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="email">
                                            <Form.Label className="small fw-bold">E-mail</Form.Label>
                                            <Form.Control type="email" value={user.displayEmail} readOnly className="form-control-profil bg-light" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group controlId="adresse">
                                            <Form.Label className="small fw-bold">Adresse</Form.Label>
                                            <Form.Control type="text" value={user.address} readOnly className="form-control-profil bg-light" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>

                        {/* Cartes Statistiques en bas */}
                        <Row className="g-4">
                            <Col md={4}>
                                <Card className="border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3 h-100">
                                    <div className="stat-icon-box bg-teal-light-opacity text-teal p-3 rounded-3">
                                        <FontAwesomeIcon icon={faBook} size="lg" />
                                    </div>
                                    <div>
                                        <h3 className="fw-bold mb-0">{user.stats.formations}</h3>
                                        <p className="text-muted small mb-0 fw-bold">Formations inscrits</p>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3 h-100">
                                    <div className="stat-icon-box bg-teal-light-opacity text-teal p-3 rounded-3">
                                        <FontAwesomeIcon icon={faAward} size="lg" />
                                    </div>
                                    <div>
                                        <h3 className="fw-bold mb-0">{user.stats.certificates}</h3>
                                        <p className="text-muted small mb-0 fw-bold">Certificat obtenu</p>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3 h-100">
                                    <div className="stat-icon-box bg-teal-light-opacity text-teal p-3 rounded-3">
                                        <FontAwesomeIcon icon={faClock} size="lg" />
                                    </div>
                                    <div>
                                        <h3 className="fw-bold mb-0">{user.stats.hours}</h3>
                                        <p className="text-muted small mb-0 fw-bold">Heures de formation</p>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}

                {activeTab === 'formations' && (
                    <>
                        <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5">
                            <h4 className="fw-bold mb-4 text-dark-teal">
                                <FontAwesomeIcon icon={faBook} className="me-2" />
                                Formations en cours
                            </h4>
                            {activeFormations.map((formation) => (
                                <div key={formation.id} className="formation-list-item mb-5 pb-4 border-bottom last-no-border">
                                    <Row className="align-items-center g-4">
                                        <Col md={3} lg={2}>
                                            <div className="formation-img-wrapper rounded-3 overflow-hidden shadow-sm">
                                                <img src={formation.image} alt={formation.title} className="img-fluid w-100 h-100 object-fit-cover" />
                                            </div>
                                        </Col>
                                        <Col md={9} lg={10}>
                                            <div className="d-flex justify-content-between mb-2">
                                                <div>
                                                    <h5 className="fw-bold mb-1">{formation.title}</h5>
                                                    <p className="text-teal small mb-1 fw-bold">{formation.category}</p>
                                                    <p className="text-muted extra-small mb-2">Supervisé par {formation.supervisor}</p>
                                                </div>
                                                <Badge bg="primary" className="h-auto align-self-start py-2 px-3 rounded-pill bg-light-blue text-teal border-0">
                                                    {formation.status}
                                                </Badge>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="small fw-bold">Progression :</span>
                                                <span className="fw-bold small">{formation.progress}%</span>
                                            </div>
                                            <ProgressBar now={formation.progress} variant="teal" className="rounded-pill mb-3" style={{ height: '8px', backgroundColor: '#e9ecef' }} />

                                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                                <div className="text-muted extra-small">
                                                    Inscrit le {formation.inscrit} <span className="mx-2">-</span> Dernier cours : {formation.lastCourse}
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <Button variant="dark-teal" className="btn-sm px-3 rounded-3">
                                                        Signer
                                                    </Button>
                                                    <Button variant="dark-teal" className="btn-sm px-3 rounded-3">
                                                        <FontAwesomeIcon icon={faEye} className="me-2" />
                                                        Voir les séances
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </Card>

                        <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5">
                            <h4 className="fw-bold mb-4 text-dark-teal">
                                <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                                Formations terminées
                            </h4>
                            {completedFormations.map((formation) => (
                                <div key={formation.id} className="formation-list-item">
                                    <Row className="align-items-center g-4">
                                        <Col md={3} lg={2}>
                                            <div className="formation-img-wrapper rounded-3 overflow-hidden shadow-sm">
                                                <img src={formation.image} alt={formation.title} className="img-fluid w-100 h-100 object-fit-cover" />
                                            </div>
                                        </Col>
                                        <Col md={9} lg={10}>
                                            <div className="d-flex justify-content-between mb-2">
                                                <div>
                                                    <h5 className="fw-bold mb-1">{formation.title}</h5>
                                                    <p className="text-teal small mb-1 fw-bold">{formation.category}</p>
                                                    <p className="text-muted extra-small mb-2">Supervisé par {formation.supervisor}</p>
                                                </div>
                                                <Badge bg="success" className="h-auto align-self-start py-2 px-4 rounded-pill">
                                                    Finish
                                                </Badge>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="small fw-bold">Progression :</span>
                                                <span className="fw-bold small">{formation.progress}%</span>
                                            </div>
                                            <ProgressBar now={formation.progress} variant="teal" className="rounded-pill mb-3" style={{ height: '8px', backgroundColor: '#e9ecef' }} />

                                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                                <div className="text-muted extra-small">
                                                    Inscrit le {formation.inscrit} <span className="mx-2">-</span> Dernier cours : {formation.lastCourse}
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <Button variant="dark-teal" className="btn-sm px-3 rounded-3">
                                                        Voir mon certificat
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </Card>
                    </>
                )}

                {activeTab === 'certificats' && (
                    <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5">
                        <h4 className="fw-bold mb-4 text-dark-teal">
                            <div className="icon-box-small d-inline-flex align-items-center justify-content-center me-2 text-white bg-dark-teal rounded-2" style={{ width: 32, height: 32 }}>
                                <FontAwesomeIcon icon={faAward} style={{ fontSize: '0.9rem' }} />
                            </div>
                            Mes certificats
                        </h4>

                        <Row className="g-4">
                            {[
                                { id: 1, title: "React et Typescript", type: "Développement web", date: "30 octobre 2024", ref: "CERT-2024", formateur: "Yohan Som", color: "#F7DF1E" },
                                { id: 2, title: "VLAN", type: "Réseau et télécom", date: "26 octobre 2025", ref: "CERT-2025", formateur: "Yanis Camelin", color: "#E34F26" },
                                { id: 3, title: "React et Typescript", type: "Développement web", date: "30 octobre 2024", ref: "CERT-2024", formateur: "Yohan Som", color: "#F7DF1E" },
                                { id: 4, title: "React et Typescript", type: "Développement web", date: "30 octobre 2024", ref: "CERT-2024", formateur: "Yohan Som", color: "#F7DF1E" }
                            ].map((cert) => (
                                <Col lg={6} key={cert.id}>
                                    <div className="cert-card border rounded-4 p-4 bg-white shadow-sm h-100 d-flex flex-column">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="rounded-3 d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, backgroundColor: cert.color + '20', color: cert.color }}>
                                                <i className="bi bi-globe" style={{ fontSize: '1.5rem' }}></i>
                                            </div>
                                            <div>
                                                <h6 className="fw-bold mb-1">{cert.title}</h6>
                                                <p className="text-muted extra-small mb-0">{cert.type}</p>
                                            </div>
                                        </div>

                                        <div className="bg-light-blue rounded-3 p-3 mb-4 flex-grow-1">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-teal small fw-bold">Certificat ID</span>
                                                <span className="small text-muted">{cert.ref}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-teal small fw-bold">Date d'obtention</span>
                                                <span className="small text-muted">{cert.date}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span className="text-teal small fw-bold">Formateur</span>
                                                <span className="small text-muted">{cert.formateur}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex gap-3 mt-auto">
                                            <Button variant="dark-teal" className="flex-grow-1 rounded-3">
                                                <i className="bi bi-download me-2"></i> Télécharger
                                            </Button>
                                            <Button variant="outline-dark" className="flex-grow-1 rounded-3">
                                                <FontAwesomeIcon icon={faEye} className="me-2" /> Aperçu
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                )}

                {activeTab === 'parametres' && (
                    <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5">
                        <h4 className="fw-bold mb-4 text-dark-teal">
                            <div className="icon-box-small d-inline-flex align-items-center justify-content-center me-2 text-white bg-dark-teal rounded-2" style={{ width: 32, height: 32 }}>
                                <FontAwesomeIcon icon={faCog} style={{ fontSize: '0.9rem' }} />
                            </div>
                            Paramètres du compte
                        </h4>

                        <Row className="g-5">
                            <Col md={6}>
                                <div className="mb-4">
                                    <h5 className="fw-bold text-teal mb-3">
                                        <FontAwesomeIcon icon={faLock} className="me-2" />
                                        Sécurité
                                    </h5>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="currentPassword">
                                            <Form.Label className="small fw-bold">Mot de passe actuel</Form.Label>
                                            <Form.Control type="password" placeholder="••••••••" className="form-control-profil bg-light" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="newPassword">
                                            <Form.Label className="small fw-bold">Nouveau mot de passe</Form.Label>
                                            <Form.Control type="password" placeholder="••••••••" className="form-control-profil bg-light" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="confirmPassword">
                                            <Form.Label className="small fw-bold">Confirmer le mot de passe</Form.Label>
                                            <Form.Control type="password" placeholder="••••••••" className="form-control-profil bg-light" />
                                        </Form.Group>
                                        <Button variant="dark-teal" className="rounded-3 px-4">
                                            Mettre à jour
                                        </Button>
                                    </Form>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="mb-4">
                                    <h5 className="fw-bold text-teal mb-3">
                                        <FontAwesomeIcon icon={faBell} className="me-2" />
                                        Notifications
                                    </h5>
                                    <div className="bg-light-blue p-4 rounded-4">
                                        <Form.Check
                                            type="switch"
                                            id="notif-email"
                                            label="Recevoir des emails promotionnels"
                                            defaultChecked
                                            className="mb-3 fw-bold small text-dark-teal"
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="notif-course"
                                            label="Notifications de progression des cours"
                                            defaultChecked
                                            className="mb-3 fw-bold small text-dark-teal"
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="notif-new"
                                            label="M'avertir des nouvelles formations"
                                            className="mb-3 fw-bold small text-dark-teal"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h5 className="fw-bold text-teal mb-3">
                                        <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                                        Confidentialité
                                    </h5>
                                    <div className="d-flex gap-2">
                                        <Button variant="outline-danger" className="rounded-3 btn-sm">
                                            Supprimer mon compte
                                        </Button>
                                        <Button variant="outline-dark" className="rounded-3 btn-sm">
                                            Politique de confidentialité
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                )}
            </Container>
        </div>
    );
}

export default Profil;
