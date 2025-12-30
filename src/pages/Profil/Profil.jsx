import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faAward, faCog, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import VueProfil from './components/VueProfil';
import VueFormations from './components/VueFormations';
import VueCertificats from './components/VueCertificats';
import VueParametres from './components/VueParametres';
import { userProfile } from '../../data/mockData';
import './Profil.css';

function Profil() {
  const [ongletActif, setOngletActif] = useState('profil');
  const utilisateur = userProfile;

  const formationsActives = [
    {
      id: 1,
      title: 'VLAN',
      category: 'Réseaux et Internet',
      supervisor: 'M. RAKOTOMAVO',
      progress: 33,
      inscrit: '24/09/2005',
      lastCourse: 'il y a 5 jours',
      image: 'https://img.freepik.com/free-photo/network-technician-working-server-room_1098-18182.jpg',
      status: 'En cours',
    },
    {
      id: 2,
      title: 'VLAN',
      category: 'Réseaux et Internet',
      supervisor: 'M. RAKOTOMAVO',
      progress: 59,
      inscrit: '24/09/2000',
      lastCourse: 'il y a 5 jours',
      image: 'https://img.freepik.com/free-photo/network-technician-working-server-room_1098-18182.jpg',
      status: 'En cours',
    },
  ];

  const formationsTerminees = [
    {
      id: 3,
      title: 'VLAN',
      category: 'Réseaux et Internet',
      supervisor: 'M. RAKOTOMAVO',
      progress: 100,
      inscrit: '24/09/2000',
      lastCourse: 'il y a 5 jours',
      image: 'https://img.freepik.com/free-photo/network-technician-working-server-room_1098-18182.jpg',
      status: 'Terminée',
    },
  ];

  const certificats = [
    { id: 1, title: 'React et Typescript', type: 'Développement web', date: '30 octobre 2024', ref: 'CERT-2024', formateur: 'Yohan Som', color: '#F7DF1E' },
    { id: 2, title: 'VLAN', type: 'Réseau et télécom', date: '26 octobre 2025', ref: 'CERT-2025', formateur: 'Yanis Camelin', color: '#E34F26' },
    { id: 3, title: 'React et Typescript', type: 'Développement web', date: '30 octobre 2024', ref: 'CERT-2024', formateur: 'Yohan Som', color: '#F7DF1E' },
    { id: 4, title: 'React et Typescript', type: 'Développement web', date: '30 octobre 2024', ref: 'CERT-2024', formateur: 'Yohan Som', color: '#F7DF1E' },
  ];

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
          <Button
            variant={ongletActif === 'parametres' ? 'dark-teal' : 'link'}
            className={`nav-tab-btn ${ongletActif === 'parametres' ? 'active rounded-pill px-4 fw-bold' : 'text-muted text-decoration-none px-3'}`}
            onClick={() => setOngletActif('parametres')}
          >
            <FontAwesomeIcon icon={faCog} className="me-2" /> Paramètres
          </Button>
        </Container>
      </div>

      <Container className="pb-5">
        {ongletActif === 'profil' && <VueProfil.Details user={utilisateur} />}
        {ongletActif === 'formations' && (
          <VueFormations activeFormations={formationsActives} completedFormations={formationsTerminees} />
        )}
        {ongletActif === 'certificats' && <VueCertificats certificats={certificats} />}
        {ongletActif === 'parametres' && <VueParametres />}
      </Container>
    </div>
  );
}

export default Profil;
