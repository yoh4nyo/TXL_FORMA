import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faEye } from '@fortawesome/free-solid-svg-icons';

function VueCertificats({ certificats }) {
  return (
    <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5">
      <h4 className="fw-bold mb-4 text-dark-teal">
        <div className="icon-box-small d-inline-flex align-items-center justify-content-center me-2 text-white bg-dark-teal rounded-2" style={{ width: 32, height: 32 }}>
          <FontAwesomeIcon icon={faAward} style={{ fontSize: '0.9rem' }} />
        </div>
        Mes certificats
      </h4>

      <Row className="g-4">
        {certificats.map((cert) => (
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
  );
}

export default VueCertificats;
