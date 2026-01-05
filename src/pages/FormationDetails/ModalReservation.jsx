import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faUsers, faClock, faTimes, faChalkboardTeacher, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import './ModalReservation.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const ModalReservation = ({ show, handleClose, formationTitle, formationPrice, sessions, formationId }) => {
    const [selectedSession, setSelectedSession] = useState(null);
    const [error, setError] = useState('');
    const [sessionDetails, setSessionDetails] = useState({});
    const [showPayment, setShowPayment] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, user, isEleve } = useAuth();

    useEffect(() => {
        if (show && !isAuthenticated) {
            handleClose();
            navigate('/connexion', { state: { from: window.location.pathname } });
        }
    }, [show, isAuthenticated]);

    useEffect(() => {
        if (show && sessions.length > 0) {
            fetchSessionsDetails();
        }
    }, [show, sessions]);

    const fetchSessionsDetails = async () => {
        const details = {};
        for (const session of sessions) {
            try {
                const seances = await apiClient.get(`/seance/session/${session.id}`);
                const totalHours = Array.isArray(seances) ? seances.reduce((sum, s) => sum + (s.duree || 0), 0) : 0;
                
                let intervenant = null;
                if (session.intervenant?.id) {
                    try {
                        intervenant = await apiClient.get(`/intervenant/${session.intervenant.id}`);
                    } catch (err) {
                        console.error('Erreur intervenant:', err);
                    }
                }
                
                details[session.id] = {
                    seances: Array.isArray(seances) ? seances : [],
                    totalHours,
                    intervenant
                };
            } catch (err) {
                console.error(`Erreur détails session ${session.id}:`, err);
            }
        }
        setSessionDetails(details);
    };

    const checkActiveSession = async () => {
        if (!isEleve || !user?.id) return false;
        
        try {
            const sessionsEleve = await apiClient.get(`/session_eleve/eleve/${user.id}`);
            
            if (!Array.isArray(sessionsEleve)) return false;
            
            const now = new Date();
            for (const sessionEleve of sessionsEleve) {
                try {
                    const session = await apiClient.get(`/session/${sessionEleve.session.id}`);
                    const dateStart = new Date(session.date_start);
                    const dateEnd = new Date(session.date_end);
                    
                    if (now >= dateStart && now <= dateEnd) {
                    }
                } catch (err) {
                    console.error('Erreur vérification session:', err);
                }
            }
            return false;
        } catch (err) {
            console.error('Erreur vérification sessions actives:', err);
            return false;
        }
    };

    const handleSessionSelect = (sessionId) => {
        setSelectedSession(sessionId);
        setError('');
    };

    const handleConfirm = async () => {
        if (!selectedSession) return;
        
        const hasActiveSession = await checkActiveSession();
        if (hasActiveSession) {
            setError('Vous ne pouvez pas avoir deux sessions en cours en même temps. Veuillez terminer votre session actuelle avant de vous inscrire à une nouvelle.');
            return;
        }
        setShowPayment(true);
    };

    const handlePaymentSuccess = () => {
        setSuccess(true);
        setShowPayment(false);
        setTimeout(() => {
            handleClose();
            navigate('/profil');
        }, 2000);
    };

    const handlePaymentCancel = () => {
        setShowPayment(false);
    };

    const resetModal = () => {
        setSelectedSession(null);
        setError('');
        setShowPayment(false);
        setSuccess(false);
    };

    const onModalClose = () => {
        resetModal();
        handleClose();
    };

    const montantEnEuros = parseInt(formationPrice) || 0;

    return (
        <Modal show={show} onHide={onModalClose} centered size="lg" className="modal-reservation">
            <Modal.Header className="modal-header-custom border-0">
                <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        {showPayment && (
                            <Button 
                                variant="link" 
                                className="p-0 text-white text-decoration-none d-flex align-items-center"
                                onClick={handlePaymentCancel}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                                Retour
                            </Button>
                        )}
                        <Modal.Title className="fw-bold text-white fs-3">
                            {showPayment ? 'Paiement' : 'Choisir une session'}
                        </Modal.Title>
                        <FontAwesomeIcon icon={faTimes} className="text-white cursor-pointer" onClick={onModalClose} size="lg" style={{ cursor: 'pointer' }} />
                    </div>
                    <div className="text-white-50 fw-bold small">{formationTitle || 'FORMATION'}</div>
                </div>
            </Modal.Header>
            <Modal.Body className="bg-light p-4">
                {success && (
                    <Alert variant="success" className="mb-3">
                        <strong>Inscription réussie !</strong> Vous allez être redirigé vers votre profil...
                    </Alert>
                )}
                
                {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
                
                {showPayment ? (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            sessionId={selectedSession}
                            eleveId={user?.id}
                            montant={montantEnEuros}
                            onSuccess={handlePaymentSuccess}
                            onCancel={handlePaymentCancel}
                        />
                    </Elements>
                ) : (
                    <>
                        {sessions && sessions.length > 0 ? (
                    sessions.map((session) => {
                        const details = sessionDetails[session.id] || {};
                        return (
                            <div
                                key={session.id}
                                className={`session-card bg-white p-4 rounded-4 mb-4 shadow-sm ${selectedSession === session.id ? 'selected-session' : ''}`}
                                onClick={() => handleSessionSelect(session.id)}
                                style={{ cursor: 'pointer', border: selectedSession === session.id ? '2px solid #0E5555' : '1px solid #dee2e6' }}
                            >
                                <Row>
                                    <Col md={6} className="border-end-md">
                                        <div className="mb-3">
                                            <div className="d-flex align-items-center text-muted fw-bold mb-1">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" /> Période
                                            </div>
                                            <div className="fw-bold text-dark fs-5">
                                                Du {new Date(session.date_start).toLocaleDateString()} <br /> 
                                                au {new Date(session.date_end).toLocaleDateString()}
                                            </div>
                                        </div>

                                        {details.intervenant && (
                                            <div className="mb-3">
                                                <div className="d-flex align-items-center text-muted fw-bold mb-1">
                                                    <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2" /> Formateur
                                                </div>
                                                <div className="fw-bold text-dark">
                                                    {details.intervenant.prenom} {details.intervenant.nom}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <div className="d-flex align-items-center text-muted fw-bold mb-1">
                                                <FontAwesomeIcon icon={faUsers} className="me-2" /> Places disponibles
                                            </div>
                                            <span className="badge bg-light-green text-dark-green fw-bold px-3 py-2 rounded-pill">
                                                {session.nbPlaceRestant || 0} places
                                            </span>
                                        </div>
                                    </Col>
                                    <Col md={6} className="ps-md-4 mt-3 mt-md-0">
                                        <div className="mb-3">
                                            <div className="d-flex align-items-center text-muted fw-bold mb-1">
                                                <FontAwesomeIcon icon={faClock} className="me-2" /> Séances
                                            </div>
                                            <div className="fw-bold text-dark">
                                                {details.totalHours || 0}h de séances au total
                                            </div>
                                        </div>

                                        {details.seances && details.seances.length > 0 && (
                                            <div className="schedule-list">
                                                {details.seances.slice(0, 4).map((seance, idx) => (
                                                    <div key={idx} className="d-flex justify-content-between align-items-center bg-light rounded-3 p-2 mb-2">
                                                        <span className="fw-bold text-dark">
                                                            {new Date(seance.date).toLocaleDateString()}
                                                        </span>
                                                        <span className="text-muted fw-bold">{seance.duree}h</span>
                                                    </div>
                                                ))}
                                                {details.seances.length > 4 && (
                                                    <div className="text-muted small text-center mt-2">
                                                        +{details.seances.length - 4} séances supplémentaires
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-muted">Aucune session disponible</p>
                )}
                    </>
                )}
            </Modal.Body>
            {!showPayment && (
                <Modal.Footer className="bg-light border-0 px-4 pb-4">
                    <div className="w-100 d-flex justify-content-between align-items-end">
                        <div>
                            <div className="text-muted fw-bold mb-0">Prix de la formation</div>
                            <div className="formation-price text-dark-teal fw-bold">{formationPrice || '0€'}</div>
                        </div>
                        <div className="d-flex gap-3">
                            <Button variant="outline-secondary" className="px-4 py-2 fw-bold rounded-3" onClick={onModalClose}>
                                Annuler
                            </Button>
                            <Button 
                                variant="dark-teal" 
                                className="px-4 py-2 fw-bold rounded-3 text-white" 
                                disabled={!selectedSession}
                                onClick={handleConfirm}
                            >
                                Confirmer et payer
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default ModalReservation;
