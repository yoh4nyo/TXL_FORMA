import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faLock, faBell, faShieldAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

function VueParametres() {
  return (
    <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5">
      <h4 className="fw-bold mb-4 text-dark-teal">
        <div className="icon-box-small d-inline-flex align-items-center justify-content-center me-2 text-white bg-dark-teal rounded-2" style={{ width: 32, height: 32 }}>
          <FontAwesomeIcon icon={faCog} style={{ fontSize: '0.9rem' }} />
        </div>
        Paramètres du compte
      </h4>

      <Row className="g-5">
        <Col md={12}>
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
              <Button variant="dark-teal" className="rounded-3">Mettre à jour</Button>
            </Form>


          </div>

          <div>
            <h5 className="fw-bold text-teal mb-3">
              <FontAwesomeIcon icon={faBell} className="me-2" />
              Notifications
            </h5>
            <Form>
              <Form.Check
                type="switch"
                id="notifEmail"
                label="Recevoir les notifications par e-mail"
                className="mb-3"
                defaultChecked
              />
              <Form.Check
                type="switch"
                id="notifSms"
                label="Recevoir les notifications par SMS"
                className="mb-3"
              />
              <Form.Check
                type="switch"
                id="notifApp"
                label="Recevoir les notifications dans l'application"
                className="mb-3"
                defaultChecked
              />
            </Form>

            <div className="mt-5 pt-3 border-top">
              <Button variant="outline-danger" className="rounded-3 border-0">
                <FontAwesomeIcon icon={faTrash} className="me-2" />
                Supprimer mon compte
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default VueParametres;
