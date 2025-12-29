import React from 'react';
import { Row, Col, Card, ProgressBar, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCheckCircle, faEye } from '@fortawesome/free-solid-svg-icons';

function LigneFormation({ formation, estTerminee }) {
  return (
    <div className="formation-list-item mb-5 pb-4 border-bottom last-no-border">
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
            {estTerminee ? (
              <Badge bg="success" className="h-auto align-self-start py-2 px-4 rounded-pill">
                Finish
              </Badge>
            ) : (
              <Badge bg="primary" className="h-auto align-self-start py-2 px-3 rounded-pill bg-light-blue text-teal border-0">
                {formation.status}
              </Badge>
            )}
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
              {!estTerminee && (
                <Button variant="dark-teal" className="btn-sm px-3 rounded-3">
                  Signer
                </Button>
              )}
              <Button variant="dark-teal" className="btn-sm px-3 rounded-3">
                <FontAwesomeIcon icon={faEye} className="me-2" />
                {estTerminee ? 'Voir mon certificat' : 'Voir les séances'}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function VueFormations({ activeFormations, completedFormations }) {
  return (
    <>
      <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5">
        <h4 className="fw-bold mb-4 text-dark-teal">
          <FontAwesomeIcon icon={faBook} className="me-2" />
          Formations en cours
        </h4>
        {activeFormations.map((formation) => (
          <LigneFormation key={formation.id} formation={formation} estTerminee={false} />
        ))}
      </Card>

      <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5">
        <h4 className="fw-bold mb-4 text-dark-teal">
          <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
          Formations terminées
        </h4>
        {completedFormations.map((formation) => (
          <LigneFormation key={formation.id} formation={formation} estTerminee />
        ))}
      </Card>
    </>
  );
}

export default VueFormations;
