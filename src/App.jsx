import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Accueil from './pages/Accueil/Accueil';
import Connexion from './pages/Connexion/Connexion';
import Inscription from './pages/Inscription/Inscription';
import Contact from './pages/Contact/Contact';
import DevenirFormateur from './pages/DevenirFormateur/DevenirFormateur';
import NosFormations from './pages/NosFormations/NosFormations';

import VLAN from './pages/FormationDetails/ReseauxTelecom/VLAN';
import RoutageVPN from './pages/FormationDetails/ReseauxTelecom/RoutageVPN';
import Linux from './pages/FormationDetails/AdministrationSysteme/Linux';
import WindowsServer from './pages/FormationDetails/AdministrationSysteme/WindowsServer';
import Angular from './pages/FormationDetails/DevFront/Angular';
import ReactJS from './pages/FormationDetails/DevFront/ReactJS';
import Vue from './pages/FormationDetails/DevFront/Vue';
import Symfony from './pages/FormationDetails/DevBack/Symfony';
import SpringBoot from './pages/FormationDetails/DevBack/SpringBoot';
import Laravel from './pages/FormationDetails/DevBack/Laravel';
import PackOffice from './pages/FormationDetails/Bureautique/PackOffice';
import Access from './pages/FormationDetails/Bureautique/Access';
import AttaquesDefense from './pages/FormationDetails/Cybersecurite/AttaquesDefense';
import SecuriteWeb from './pages/FormationDetails/Cybersecurite/SecuriteWeb';
import GestionAgile from './pages/FormationDetails/ConduiteProjet/GestionAgile';
import MSProject from './pages/FormationDetails/ConduiteProjet/MSProject';
import Profil from './pages/Profil/Profil';


import LayoutAdmin from './components/LayoutAdmin/LayoutAdmin';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import AdminFormations from './pages/Admin/Formations/AdminFormations';
import AdminFormationSessions from './pages/Admin/Formations/AdminFormationSessions';
import AdminFormationSeances from './pages/Admin/Formations/AdminFormationSeances';
import AdminSeanceParticipants from './pages/Admin/Formations/AdminSeanceParticipants';
import AdminUsers from './pages/Admin/Users/AdminUsers';
import AdminFormateurs from './pages/Admin/Formateurs/AdminFormateurs';

import LayoutFormateur from './components/LayoutFormateur/LayoutFormateur';
import FormateurProfil from './pages/Formateur/FormateurProfil';
import FormateurFormations from './pages/Formateur/FormateurFormations';
import FormateurFormationSessions from './pages/Formateur/FormateurFormationSessions';
import FormateurFormationSeances from './pages/Formateur/FormateurFormationSeances';
import FormateurSeanceParticipants from './pages/Formateur/FormateurSeanceParticipants';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes Publiques */}
        <Route path="/" element={<><Header /><Accueil /><Footer /></>} />
        <Route path="/connexion" element={<><Header /><Connexion /><Footer /></>} />
        <Route path="/inscription" element={<><Header /><Inscription /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
        <Route path="/devenir-formateur" element={<><Header /><DevenirFormateur /><Footer /></>} />
        <Route path="/nos-formations" element={<><Header /><NosFormations /><Footer /></>} />

        {/* Routes Détails Formations - Réseaux */}
        <Route path="/formations/reseaux-telecoms/vlan" element={<><Header /><VLAN /><Footer /></>} />
        <Route path="/formations/reseaux-telecoms/routage-vpn" element={<><Header /><RoutageVPN /><Footer /></>} />

        {/* Routes Détails Formations - Admin Sys */}
        <Route path="/formations/administration-systeme/linux" element={<><Header /><Linux /><Footer /></>} />
        <Route path="/formations/administration-systeme/windows-server" element={<><Header /><WindowsServer /><Footer /></>} />

        {/* Routes Détails Formations - Dev Front */}
        <Route path="/formations/developpement-front/angular" element={<><Header /><Angular /><Footer /></>} />
        <Route path="/formations/developpement-front/react" element={<><Header /><ReactJS /><Footer /></>} />
        <Route path="/formations/developpement-front/vue" element={<><Header /><Vue /><Footer /></>} />

        {/* Routes Détails Formations - Dev Back */}
        <Route path="/formations/developpement-back/symfony" element={<><Header /><Symfony /><Footer /></>} />
        <Route path="/formations/developpement-back/spring-boot" element={<><Header /><SpringBoot /><Footer /></>} />
        <Route path="/formations/developpement-back/laravel" element={<><Header /><Laravel /><Footer /></>} />

        {/* Routes Détails Formations - Bureautique */}
        <Route path="/formations/bureautique/pack-office" element={<><Header /><PackOffice /><Footer /></>} />
        <Route path="/formations/bureautique/access" element={<><Header /><Access /><Footer /></>} />

        {/* Routes Détails Formations - Cybersécurité */}
        <Route path="/formations/cybersecurite/attaques-defense" element={<><Header /><AttaquesDefense /><Footer /></>} />
        <Route path="/formations/cybersecurite/securite-web" element={<><Header /><SecuriteWeb /><Footer /></>} />

        {/* Routes Détails Formations - Conduite de Projet */}
        <Route path="/formations/conduite-projets/gestion-agile" element={<><Header /><GestionAgile /><Footer /></>} />
        <Route path="/formations/conduite-projets/ms-project" element={<><Header /><MSProject /><Footer /></>} />



        <Route path="/profil" element={<><Header /><Profil /><Footer /></>} />

        {/* Zone Administration */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* Routes futures (Utilisateurs, Formateurs...) */}
          <Route path="formations" element={<AdminFormations />} />
          <Route path="formations/:id" element={<AdminFormationSessions />} />
          <Route path="sessions/:id" element={<AdminFormationSeances />} />
          <Route path="seances/:id" element={<AdminSeanceParticipants />} />
          <Route path="utilisateurs" element={<AdminUsers />} />
          <Route path="formateurs" element={<AdminFormateurs />} />
        </Route>

        {/* Espace Formateur */}
        <Route path="/formateur" element={<LayoutFormateur />}>
          <Route index element={<Navigate to="profil" replace />} />
          <Route path="profil" element={<FormateurProfil />} />
          <Route path="formations" element={<FormateurFormations />} />
          <Route path="formations/:id" element={<FormateurFormationSessions />} />
          <Route path="sessions/:id" element={<FormateurFormationSeances />} />
          <Route path="seances/:id" element={<FormateurSeanceParticipants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
