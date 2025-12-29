import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faAward, faCalendarAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function Entete({ user }) {
  return (
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
  );
}

function Details({ user }) {
  return (
    <>
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

      <Row className="g-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3 h-100">
            <div className="stat-icon-box bg-dark-teal text-white p-3 rounded-3">
              <FontAwesomeIcon icon={faBook} className="fs-3" />
            </div>
            <div>
              <h3 className="fw-bold mb-0">{user.stats.formations}</h3>
              <p className="text-muted small mb-0 fw-bold">Formations inscrits</p>
            </div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3 h-100">
            <div className="stat-icon-box bg-dark-teal text-white p-3 rounded-3">
              <FontAwesomeIcon icon={faAward} className="fs-3" />
            </div>
            <div>
              <h3 className="fw-bold mb-0">{user.stats.certificates}</h3>
              <p className="text-muted small mb-0 fw-bold">Certificat obtenu</p>
            </div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3 h-100">
            <div className="stat-icon-box bg-dark-teal text-white p-3 rounded-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="fs-3" />
            </div>
            <div>
              <h3 className="fw-bold mb-0">{user.stats.hours}</h3>
              <p className="text-muted small mb-0 fw-bold">Heures de formation</p>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

const VueProfil = { Entete, Details };
export default VueProfil;
