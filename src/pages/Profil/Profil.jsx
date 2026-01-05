import { useState, useEffect } from 'react';
import { Container, Button, Spinner, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faAward, faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import VueProfil from './components/VueProfil';
import VueFormations from './components/VueFormations';
import VueCertificats from './components/VueCertificats';
import { apiClient } from '../../api/client';
import './Profil.css';

function Profil() {
  const { eleveId } = useParams();
  const [ongletActif, setOngletActif] = useState('profil');
  const [utilisateur, setUtilisateur] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formationsActives, setFormationsActives] = useState([]);
  const [formationsTerminees, setFormationsTerminees] = useState([]);
  const [certificats, setCertificats] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    mail: '',
    adresse: '',
    identifiant: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { isAuthenticated, user, isEleve, isAdmin, isFormateur } = useAuth(); // Assuming useAuth provides these
  const navigate = useNavigate(); // Make sure to import useNavigate if not already used (it uses useParams currently)

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else if (isFormateur) {
        navigate(`/formateur/${user.id}`);
      }
    }
  }, [user, isAdmin, isFormateur, navigate]);

  useEffect(() => {
    if (eleveId) {
      fetchEleve();
      fetchSessions();
    }
  }, [eleveId]);

  const fetchEleve = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.get(`/eleve/${eleveId}`);
      data.stats = {
        formations: 0,
        hours: 0
      };
      setUtilisateur(data);
      setFormData({
        nom: data.nom || '',
        prenom: data.prenom || '',
        mail: data.mail || '',
        adresse: data.adresse || '',
        identifiant: data.identifiant || '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const sessionEleves = await apiClient.get(`/session_eleve/eleve/${eleveId}`);
      const sessionElevesArray = Array.isArray(sessionEleves) ? sessionEleves : [];

      let totalHeures = 0;

      const seancePromises = sessionElevesArray.map(se =>
        apiClient.get(`/seance/session/${se.session.id}`).catch(() => [])
      );

      const allSeances = await Promise.all(seancePromises);

      for (const seances of allSeances) {
        const seancesArray = Array.isArray(seances) ? seances : [];
        totalHeures += seancesArray.reduce((sum, seance) => sum + (seance.duree || 0), 0);
      }

      const transformerSessionEleve = (se) => {
        const session = se.session;
        return {
          id: session.id,
          title: session.formation?.nom || 'Formation',
          category: session.formation?.categorie || 'Catégorie',
          supervisor: session.intervenant?.nom + ' ' + session.intervenant?.prenom || 'Formateur',
          status: se.statut
        };
      };

      const enCours = sessionElevesArray
        .filter(se => se.statut === 'en cours')
        .map(transformerSessionEleve);

      const terminees = sessionElevesArray
        .filter(se => se.statut === 'admis')
        .map(transformerSessionEleve);

      setFormationsActives(enCours);
      setFormationsTerminees(terminees);

      const certificatsData = sessionElevesArray
        .filter(se => {
          const isAdmis = se.statut === 'admis';
          const hasDiplome = se.diplome === 1;
          return isAdmis && hasDiplome;
        })
        .map(se => {
          const session = se.session;
          const note = se.note || 0;
          const typeCertificat = note >= 10 ? 'Certificat de Réussite' : 'Certificat de Présence';

          return {
            id: se.id,
            formation: session.formation?.nom || 'Formation',
            typeCertificat: typeCertificat,
            note: note,
            dateObtention: session.date_end ? new Date(session.date_end).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '-',
            formateur: session.intervenant?.nom + ' ' + session.intervenant?.prenom || 'Formateur'
          };
        });

      setCertificats(certificatsData);

      setUtilisateur(prev => ({
        ...prev,
        stats: {
          formations: sessionElevesArray.length,
          hours: totalHeures
        }
      }));
    } catch (err) {
      console.error("Erreur fetchSessions:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const updateData = {
        nom: formData.nom,
        prenom: formData.prenom,
        mail: formData.mail,
        adresse: formData.adresse,
        identifiant: formData.identifiant,
        role: 'ROLE_ELEVE'
      };
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          alert('Les mots de passe ne correspondent pas');
          return;
        }
        updateData.password = formData.newPassword;
      }
      await apiClient.put(`/eleve/${eleveId}`, updateData);
      alert('Profil modifié avec succès');
      setIsEditing(false);
      fetchEleve();
    } catch (err) {
      alert('Erreur lors de la modification');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      '⚠️ ATTENTION : Cette action est irréversible !\n\nÊtes-vous sûr de vouloir supprimer votre compte ?\nToutes vos données (inscriptions, formations, paiements) seront définitivement supprimées.'
    );

    if (confirmation) {
      const doubleConfirmation = window.confirm(
        'Dernière confirmation : Voulez-vous vraiment supprimer votre compte ?'
      );

      if (doubleConfirmation) {
        try {
          await apiClient.delete(`/eleve/${eleveId}`);
          alert('Votre compte a été supprimé avec succès.');
          window.location.href = '/';
        } catch (err) {
          alert('Erreur lors de la suppression du compte');
          console.error('Erreur:', err);
        }
      }
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (!utilisateur) {
    return (
      <Container className="text-center py-5">
        <p>Utilisateur non trouvé</p>
      </Container>
    );
  }

  return (
    <div className="profil-page">
      <div className="profil-header text-white">
        <Container>
          <Link to="/" className="text-white text-decoration-none mb-4 d-inline-block small fw-bold">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Retour
          </Link>

          <VueProfil.Entete user={utilisateur} />
        </Container>
      </div>

      <div className="profil-nav-tabs bg-white shadow-sm mb-5">
        <Container className="d-flex justify-content-center gap-2 gap-md-5 py-3">
          <Button
            variant={ongletActif === 'profil' ? 'dark-teal' : 'link'}
            className={`nav-tab-btn ${ongletActif === 'profil' ? 'active rounded-pill px-4 fw-bold' : 'text-muted text-decoration-none px-3'}`}
            onClick={() => setOngletActif('profil')}
          >
            <FontAwesomeIcon icon={faUser} className="me-2" /> Profil
          </Button>
          <Button
            variant={ongletActif === 'formations' ? 'dark-teal' : 'link'}
            className={`nav-tab-btn ${ongletActif === 'formations' ? 'active rounded-pill px-4 fw-bold' : 'text-muted text-decoration-none px-3'}`}
            onClick={() => setOngletActif('formations')}
          >
            <FontAwesomeIcon icon={faBook} className="me-2" /> Mes formations
          </Button>
          <Button
            variant={ongletActif === 'certificats' ? 'dark-teal' : 'link'}
            className={`nav-tab-btn ${ongletActif === 'certificats' ? 'active rounded-pill px-4 fw-bold' : 'text-muted text-decoration-none px-3'}`}
            onClick={() => setOngletActif('certificats')}
          >
            <FontAwesomeIcon icon={faAward} className="me-2" /> Mes certificats
          </Button>
        </Container>
      </div>

      <Container className="pb-5">
        {ongletActif === 'profil' && (
          <>
            <Row className="g-4 mb-5">
              <Col lg={6} md={6}>
                <Card className="stat-card border-0 shadow-sm h-100">
                  <Card.Body className="d-flex justify-content-between align-items-center p-4">
                    <div>
                      <h6 className="stat-label text-muted fw-bold mb-2">Formations inscrites</h6>
                      <h3 className="stat-value fw-bold text-dark-teal mb-0">{utilisateur?.stats?.formations || 0}</h3>
                    </div>
                    <div className="stat-icon-box rounded-3 d-flex align-items-center justify-content-center">
                      <FontAwesomeIcon icon={faBook} className="stat-icon text-white fs-4" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6} md={6}>
                <Card className="stat-card border-0 shadow-sm h-100">
                  <Card.Body className="d-flex justify-content-between align-items-center p-4">
                    <div>
                      <h6 className="stat-label text-muted fw-bold mb-2">Heures de formation</h6>
                      <h3 className="stat-value fw-bold text-dark-teal mb-0">{utilisateur?.stats?.hours || 0}</h3>
                    </div>
                    <div className="stat-icon-box rounded-3 d-flex align-items-center justify-content-center">
                      <FontAwesomeIcon icon={faBook} className="stat-icon text-white fs-4" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="border-0 shadow-sm rounded-4">
              <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center">
                <h4 className="fw-bold text-dark-teal mb-0">Mes Informations</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <VueProfil.Details
                  user={utilisateur}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSaveChanges={handleSaveChanges}
                  handleCancel={() => {
                    setIsEditing(false);
                    fetchEleve();
                  }}
                  onDeleteAccount={handleDeleteAccount}
                />
              </Card.Body>
            </Card>
          </>
        )}
        {ongletActif === 'formations' && (
          <VueFormations activeFormations={formationsActives} completedFormations={formationsTerminees} />
        )}
        {ongletActif === 'certificats' && <VueCertificats certificats={certificats} utilisateur={utilisateur} />}
      </Container>
    </div>
  );
}

export default Profil;
