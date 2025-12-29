
import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faUsers, faClock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { bookingSessions } from '../../data/mockData';
import './BookingModal.css';

const BookingModal = ({ show, handleClose, formationTitle, formationPrice }) => {
    const [selectedSession, setSelectedSession] = useState(null);

    const handleSessionSelect = (sessionId) => {
        setSelectedSession(sessionId);
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className="booking-modal">
            <Modal.Header className="modal-header-custom border-0">
                <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <Modal.Title className="fw-bold text-white fs-3">Choisir une session</Modal.Title>
                        <FontAwesomeIcon icon={faTimes} className="text-white cursor-pointer" onClick={handleClose} size="lg" style={{ cursor: 'pointer' }} />
                    </div>
                    <div className="text-white-50 fw-bold small">{formationTitle || 'FORMATION'}</div>
                </div>
            </Modal.Header>
            <Modal.Body className="bg-light p-4">
                {bookingSessions.map((session) => (
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
                                        Du {session.startDate} <br /> au {session.endDate}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center text-muted fw-bold mb-1">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> Emplacement
                                    </div>
                                    <div className="fw-bold text-dark">{session.location}</div>
                                </div>

                                <div>
                                    <div className="d-flex align-items-center text-muted fw-bold mb-1">
                                        <FontAwesomeIcon icon={faUsers} className="me-2" /> Place disponible
                                    </div>
                                    <span className="badge bg-light-green text-dark-green fw-bold px-3 py-2 rounded-pill">
                                        {session.spotsLeft} places
                                    </span>
                                </div>
                            </Col>
                            <Col md={6} className="ps-md-4 mt-3 mt-md-0">
                                <div className="mb-3">
                                    <div className="d-flex align-items-center text-muted fw-bold mb-1">
                                        <FontAwesomeIcon icon={faClock} className="me-2" /> Séances
                                    </div>
                                    <div className="fw-bold text-dark">{session.totalHours} de séances au total</div>
                                </div>

                                <div className="schedule-list">
                                    {session.schedule.map((slot, idx) => (
                                        <div key={idx} className="d-flex justify-content-between align-items-center bg-light rounded-3 p-2 mb-2">
                                            <span className="fw-bold text-dark">{slot.day}</span>
                                            <span className="text-muted fw-bold">{slot.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer className="bg-light border-0 px-4 pb-4">
                <div className="w-100 d-flex justify-content-between align-items-end">
                    <div>
                        <div className="text-muted fw-bold mb-0">Prix de la formation</div>
                        <div className="formation-price text-dark-teal fw-bold">{formationPrice || '29,99€'}</div>
                    </div>
                    <div className="d-flex gap-3">
                        <Button variant="outline-secondary" className="px-4 py-2 fw-bold rounded-3" onClick={handleClose}>
                            Annuler
                        </Button>
                        <Button variant="dark-teal" className="px-4 py-2 fw-bold rounded-3 text-white" disabled={!selectedSession}>
                            Confirmer et payer
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default BookingModal;
