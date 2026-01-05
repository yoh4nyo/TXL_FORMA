import { useState, useEffect, useRef } from 'react';
import { Container, Card, Row, Col, Badge, Spinner, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

function SessionSeances() {
  const { sessionId, eleveId } = useParams();
  const { user } = useAuth();
  const currentEleveId = eleveId || user?.id;
  const [seances, setSeances] = useState([]);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedSeance, setSelectedSeance] = useState(null);
  const [signatureSubmitting, setSignatureSubmitting] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasStroke, setHasStroke] = useState(false);

  useEffect(() => {
    if (!currentEleveId) return;
    fetchSessionAndSeances();
  }, [sessionId, currentEleveId]);

  const fetchSessionAndSeances = async () => {
    try {
      setIsLoading(true);
      const [sessionData, seancesData] = await Promise.all([
        apiClient.get(`/session/${sessionId}`),
        apiClient.get(`/seance/session/${sessionId}`)
      ]);
      setSession(sessionData);
      
      const seancesSorted = Array.isArray(seancesData) 
        ? seancesData.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.horaire || '00:00'}:00`);
            const dateB = new Date(`${b.date}T${b.horaire || '00:00'}:00`);
            return dateA - dateB;
          })
        : [];

      const seancesWithEleve = await Promise.all(seancesSorted.map(async (seance) => {
        try {
          const seanceEleves = await apiClient.get(`/seance_eleve/seance/${seance.id}`);
          const entries = Array.isArray(seanceEleves) ? seanceEleves : [];
          const currentEleveEntry = entries.find((entry) => Number(entry?.eleve?.id) === Number(currentEleveId));
          return { ...seance, seanceEleve: currentEleveEntry || null };
        } catch (err) {
          console.error('Erreur chargement seance_eleve', err);
          return { ...seance, seanceEleve: null };
        }
      }));

      setSeances(seancesWithEleve);
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return timeString.substring(0, 5);
  };

  const handleSigner = (seance) => {
    if (!currentEleveId) {
      alert('Impossible de signer : élève non identifié. Merci de vous reconnecter.');
      return;
    }

    if (!seance.date || !seance.horaire) {
      alert('Informations de séance incomplètes - date: ' + seance.date + ', horaire: ' + seance.horaire);
      return;
    }

    if (!seance.seanceEleve?.id) {
      alert('Aucune inscription trouvée pour cette séance. Essayez de rafraîchir ou contactez le support.');
      return;
    }

    const dateStr = `${seance.date}T${seance.horaire}:00`;
    const seanceDateTime = new Date(dateStr);
    const now = new Date();
    const heureLimite = new Date(seanceDateTime);
    heureLimite.setHours(heureLimite.getHours() + 2);

    if (now < seanceDateTime) {
      alert('Pas possible de signer, c\'est trop tôt');
      return;
    }

    if (now > heureLimite) {
      handleMarkAbsent(seance);
      return;
    }

    setSelectedSeance(seance);
    setShowSignatureModal(true);
  };

  const handleMarkAbsent = async (seance) => {
    if (!seance.seanceEleve?.id) return;

    try {
      const payload = {
        statut: 'absent',
        signature: ''
      };

      await apiClient.put(`/seance_eleve/${seance.seanceEleve.id}`, payload);

      setSeances((prev) => prev.map((item) => {
        if (item.id !== seance.id) return item;
        return { ...item, seanceEleve: { ...item.seanceEleve, statut: 'absent', signature: '' } };
      }));

      alert('Délai dépassé : statut marqué absent.');
    } catch (err) {
      console.error('Erreur mise à jour absent', err);
      alert('Impossible de mettre à jour le statut.');
    }
  };

  const getCanvasCoords = (event) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  };

  const startDrawing = (event) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getCanvasCoords(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const drawStroke = (event) => {
    if (!isDrawing || !canvasRef.current) return;
    event.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getCanvasCoords(event);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasStroke(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const resetCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f766e';
    setHasStroke(false);
  };

  useEffect(() => {
    if (showSignatureModal) {
      resetCanvas();
    }
  }, [showSignatureModal]);

  const handleCloseModal = () => {
    setShowSignatureModal(false);
    setSelectedSeance(null);
    setHasStroke(false);
  };

  const handleSaveSignature = async () => {
    if (!selectedSeance?.seanceEleve?.id || !canvasRef.current || !currentEleveId) return;
    if (!hasStroke) {
      alert('Merci de réaliser votre signature avant de valider.');
      return;
    }

    const dataUrl = canvasRef.current.toDataURL('image/png');
    setSignatureSubmitting(true);

    try {
      const payload = {
        statut: 'present',
        signature: dataUrl
      };

      await apiClient.put(`/seance_eleve/${selectedSeance.seanceEleve.id}`, payload);

      setSeances((prev) => prev.map((item) => {
        if (item.id !== selectedSeance.id) return item;
        return { ...item, seanceEleve: { ...item.seanceEleve, statut: 'present', signature: dataUrl } };
      }));

      alert('Signature enregistrée, statut présent.');
      handleCloseModal();
    } catch (err) {
      console.error('Erreur enregistrement signature', err);
      alert(`Erreur lors de l'enregistrement de la signature (code ${err?.status || 'inconnu'}). Consultez la console.`);
    } finally {
      setSignatureSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  return (
    <>
      <div className="session-seances-page py-5">
        <Container>
          <Link to={`/profil/${currentEleveId || ''}`} className="text-decoration-none mb-4 d-inline-block">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Retour au profil
          </Link>

          {session && (
            <Card className="border-0 shadow-sm rounded-4 mb-4 bg-light">
              <Card.Body className="p-4">
                <h3 className="fw-bold text-dark-teal mb-3">{session.formation?.nom || 'Formation'}</h3>
                <p className="text-muted mb-2">
                  <strong>Formateur:</strong> {session.intervenant?.nom} {session.intervenant?.prenom}
                </p>
                <p className="text-muted mb-0">
                  <strong>Catégorie:</strong> {session.formation?.categorie || '-'}
                </p>
              </Card.Body>
            </Card>
          )}

          <h4 className="fw-bold mb-4">Liste des séances</h4>

          {seances.length === 0 ? (
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-5 text-center">
                <p className="text-muted mb-0">Aucune séance disponible pour cette session</p>
              </Card.Body>
            </Card>
          ) : (
            <Row className="g-4">
              {seances.map((seance, index) => (
                <Col lg={6} key={seance.id}>
                  <Card className="border-0 shadow-sm rounded-4 h-100">
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="fw-bold mb-0">Séance {index + 1}</h5>
                        <Badge bg="primary" className="bg-light-blue text-teal border-0">
                          {seance.duree || 0}h
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <FontAwesomeIcon icon={faCalendar} className="text-teal me-2" />
                        <span className="text-muted">{formatDate(seance.date)}</span>
                      </div>
                      
                      <div className="mb-3">
                        <FontAwesomeIcon icon={faClock} className="text-teal me-2" />
                        <span className="text-muted">
                          {formatTime(seance.horaire)}
                        </span>
                      </div>

                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="text-muted">Statut</span>
                        <Badge bg="light" text="dark">
                          {seance.seanceEleve?.statut || 'Non renseigné'}
                        </Badge>
                      </div>

                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="text-muted">Signature</span>
                        <Badge bg={seance.seanceEleve?.signature ? 'success' : 'secondary'}>
                          {seance.seanceEleve?.signature ? 'Enregistrée' : 'Manquante'}
                        </Badge>
                      </div>

                      <Button
                        variant="dark-teal"
                        className="w-100"
                        onClick={() => handleSigner(seance)}
                        disabled={!currentEleveId || seance.seanceEleve?.statut === 'present' || seance.seanceEleve?.statut === 'absent'}
                      >
                        {seance.seanceEleve?.statut === 'present' ? 'Déjà signé' : seance.seanceEleve?.statut === 'absent' ? 'Statut : absent' : 'Signer'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>

      <Modal show={showSignatureModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Signature électronique</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">
            Merci de signer dans l'espace ci-dessous pour confirmer votre présence.
          </p>
          <div className="border rounded-3 p-3 bg-light">
            <canvas
              ref={canvasRef}
              width={700}
              height={240}
              className="w-100 rounded-3 bg-white"
              onPointerDown={startDrawing}
              onPointerMove={drawStroke}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Button variant="outline-secondary" onClick={resetCanvas}>
                Effacer
              </Button>
              <Button variant="dark-teal" onClick={handleSaveSignature} disabled={signatureSubmitting}>
                {signatureSubmitting ? 'Enregistrement...' : 'Valider ma signature'}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SessionSeances;
