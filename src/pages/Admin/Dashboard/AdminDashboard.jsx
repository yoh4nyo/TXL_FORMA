import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faAward, faCoins, faUsers, faShoppingCart, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const stats = [
        {
            id: 1,
            label: "Nombre de formations",
            value: "1.189",
            icon: faBook,
            color: "#0E5555"
        },
        {
            id: 2,
            label: "Certificats délivrés",
            value: "500",
            icon: faAward,
            color: "#0E5555"
        },
        {
            id: 3,
            label: "Argent généré",
            value: "1 000 000€",
            icon: faCoins,
            color: "#0E5555"
        },
        {
            id: 4,
            label: "Total utilisateur",
            value: "1.189",
            icon: faUsers,
            color: "#0E5555"
        },
        {
            id: 5,
            label: "Nombre de formations vendues",
            value: "500",
            icon: faShoppingCart, // Utilisation du panier pour les ventes
            color: "#0E5555"
        },
        {
            id: 6,
            label: "Nombre de formateurs",
            value: "500",
            icon: faChalkboardTeacher,
            color: "#0E5555"
        }
    ];

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header mb-5">
                <div className="d-flex align-items-center mb-2">
                    <div className="dashboard-icon-wrapper me-3 d-flex align-items-center justify-content-center">
                        <i className="bi bi-grid-1x2-fill text-white" style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <h2 className="dashboard-title fw-bold text-dark-teal mb-0">Dashboard Récapitulatif</h2>
                </div>
                <p className="text-muted ms-5 ps-3">Vue d'ensemble sur tout le site</p>
            </div>

            <Row className="g-4">
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
        </div>
    );
};

export default AdminDashboard;
