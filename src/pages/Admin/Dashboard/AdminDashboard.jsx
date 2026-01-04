import { useEffect, useState } from 'react';
import { Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faBook, faChalkboardTeacher, faCoins, faShoppingCart, faUsers } from '@fortawesome/free-solid-svg-icons';
import { apiClient } from '../../../api/client';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const cardDefinitions = [
        { id: 'formations', label: 'Nombre de formations', key: 'totalFormations', icon: faBook, color: '#0E5555' },
        { id: 'certificats', label: 'Certificats délivrés', key: 'totalCertificats', icon: faAward, color: '#0E5555' },
        { id: 'ca', label: 'Argent généré', key: 'chiffreAffaireTotal', icon: faCoins, color: '#0E5555' },
        { id: 'users', label: 'Total utilisateur', key: 'totalUsersEleves', icon: faUsers, color: '#0E5555' },
        { id: 'ventes', label: 'Nombre de formations vendues', key: 'totalVentes', icon: faShoppingCart, color: '#0E5555' },
        { id: 'formateurs', label: 'Nombre de formateurs', key: 'totalIntervenants', icon: faChalkboardTeacher, color: '#0E5555' },
    ];

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await apiClient.get('/stats/dashboard');
                setStats(data);
            } catch (err) {
                setError('Impossible de charger les statistiques.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatValue = (key) => {
        if (!stats) return '...';
        const value = stats[key];
        if (value === undefined || value === null) return 'N/A';
        if (key === 'chiffreAffaireTotal') {
            return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
        }
        return value;
    };

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

            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}

            <Row className="g-4">
                {cardDefinitions.map((stat) => (
                    <Col lg={4} md={6} key={stat.id}>
                        <Card className="stat-card border-0 shadow-sm h-100">
                            <Card.Body className="d-flex justify-content-between align-items-center p-4">
                                <div>
                                    <h6 className="stat-label text-muted fw-bold mb-2">{stat.label}</h6>
                                    <h3 className="stat-value fw-bold text-dark-teal mb-0">
                                        {isLoading ? <Spinner size="sm" animation="border" role="status" /> : formatValue(stat.key)}
                                    </h3>
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
