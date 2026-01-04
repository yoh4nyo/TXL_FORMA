import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faAward, faCalendarAlt, faPencilAlt, faUser } from '@fortawesome/free-solid-svg-icons';

function Entete({ user }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="d-flex align-items-center gap-4 profil-header-content">
      <div className="profil-avatar-wrapper">
        <div className="profil-avatar rounded-circle border-4 border-white bg-white d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
          <FontAwesomeIcon icon={faUser} size="3x" className="text-dark-teal" />
        </div>
      </div>
      <div>
        <h1 className="fw-bold mb-1">{user.prenom} {user.nom}</h1>
        <p className="mb-3 opacity-75 small text-decoration-underline">{user.mail}</p>

        <div className="d-flex gap-4 text-small opacity-90">
          <span><FontAwesomeIcon icon={faBook} className="me-2" /> {user.stats?.formations || 0} Formations</span>
          <span><FontAwesomeIcon icon={faCalendarAlt} className="me-2" /> Membre depuis le {formatDate(user.inscription)}</span>
        </div>
      </div>
    </div>
  );
}

function Details({ user, isEditing, setIsEditing, formData, handleInputChange, handleSaveChanges, handleCancel, onDeleteAccount }) {

  return (
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
                <Form.Label className="form-label-custom text-muted fw-bold">Adresse</Form.Label>
                <Form.Control 
                  type="text" 
                  name="adresse"
                  value={formData.adresse} 
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
                  <Button variant="outline-secondary" onClick={handleCancel} className="px-4 fw-bold">
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
              <Button variant="outline-danger" onClick={onDeleteAccount} className="px-4 fw-bold">
                Supprimer mon compte
              </Button>
            </div>
          )}
        </Form>
  );
}

const VueProfil = { Entete, Details };
export default VueProfil;
