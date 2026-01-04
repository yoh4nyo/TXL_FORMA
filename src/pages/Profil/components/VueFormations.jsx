import React from 'react';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCheckCircle, faEye, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

function LigneFormation({ formation, estTerminee }) {
  const navigate = useNavigate();
  const { eleveId } = useParams();

  const handleVoirSeances = () => {
    navigate(`/profil/${eleveId}/session/${formation.id}/seances`);
  };

  return (
    <div className="formation-list-item mb-5 pb-4 border-bottom last-no-border">
      <Row className="align-items-center g-4">
        <Col md={3} lg={2}>
          <div className="formation-icon-wrapper rounded-3 shadow-sm d-flex align-items-center justify-content-center bg-light" style={{ width: '100px', height: '100px' }}>
            <FontAwesomeIcon icon={faGraduationCap} className="text-teal" style={{ fontSize: '3rem' }} />
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

          {!estTerminee && (
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-3">
              <Button variant="dark-teal" className="btn-sm px-3 rounded-3" onClick={handleVoirSeances}>
                <FontAwesomeIcon icon={faEye} className="me-2" />
                Voir les séances
              </Button>
            </div>
          )}
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
          <LigneFormation key={`${formation.id}-active`} formation={formation} estTerminee={false} />
        ))}
      </Card>

      <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5">
        <h4 className="fw-bold mb-4 text-dark-teal">
          <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
          Formations terminées
        </h4>
        {completedFormations.map((formation) => (
          <LigneFormation key={`${formation.id}-done`} formation={formation} estTerminee />
        ))}
      </Card>
    </>
  );
}

export default VueFormations;
