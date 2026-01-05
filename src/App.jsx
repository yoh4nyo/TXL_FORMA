import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminRoute, FormateurRoute, PrivateRoute, OwnProfileRoute, OwnFormateurRoute } from './components/ProtectedRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Accueil from './pages/Accueil/Accueil';
import Connexion from './pages/Connexion/Connexion';
import Inscription from './pages/Inscription/Inscription';
import Contact from './pages/Contact/Contact';
import DevenirFormateur from './pages/DevenirFormateur/DevenirFormateur';
import NosFormations from './pages/NosFormations/NosFormations';
import FormationDetail from './pages/FormationDetails/FormationDetail';
import Profil from './pages/Profil/Profil';
import SessionSeances from './pages/Profil/SessionSeances';
import MentionsLegales from './pages/Legal/MentionsLegales';
import Cookies from './pages/Legal/Cookies';
import PolitiqueDonnees from './pages/Legal/PolitiqueDonnees';

import MenuAdmin from './components/MenuAdmin/MenuAdmin';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import AdminFormations from './pages/Admin/Formations/AdminFormations';
import AdminFormationSessions from './pages/Admin/Formations/AdminFormationSessions';
import AdminFormationSeances from './pages/Admin/Formations/AdminFormationSeances';
import AdminSeanceParticipants from './pages/Admin/Formations/AdminSeanceParticipants';
import AdminUsers from './pages/Admin/Users/AdminUsers';
import UserFormations from './pages/Admin/Users/UserFormations';
import AdminFormateurs from './pages/Admin/Formateurs/AdminFormateurs';
import FormateurFormationsAdmin from './pages/Admin/Formateurs/FormateurFormations';

import MenuFormateur from './components/MenuFormateur/MenuFormateur';
import FormateurProfil from './pages/Formateur/FormateurProfil';
import FormateurFormations from './pages/Formateur/FormateurFormations';
import FormateurFormationSessions from './pages/Formateur/FormateurFormationSessions';
import FormateurFormationSeances from './pages/Formateur/FormateurFormationSeances';
import FormateurSeanceParticipants from './pages/Formateur/FormateurSeanceParticipants';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes Publiques */}
          <Route path="/" element={<><Header /><Accueil /><Footer /></>} />
          <Route path="/connexion" element={<><Header /><Connexion /><Footer /></>} />
          <Route path="/inscription" element={<><Header /><Inscription /><Footer /></>} />
          <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
          <Route path="/devenir-formateur" element={<><Header /><DevenirFormateur /><Footer /></>} />
          <Route path="/nos-formations" element={<><Header /><NosFormations /><Footer /></>} />
          <Route path="/formation/:formationId" element={<><Header /><FormationDetail /><Footer /></>} />
          <Route path="/mentions-legales" element={<><Header /><MentionsLegales /><Footer /></>} />
          <Route path="/cookies" element={<><Header /><Cookies /><Footer /></>} />
          <Route path="/politique-donnees" element={<><Header /><PolitiqueDonnees /><Footer /></>} />

          {/* Espace Eleve */}
          <Route path="/profil/:eleveId" element={<OwnProfileRoute><><Header /><Profil /><Footer /></></OwnProfileRoute>} />
          <Route path="/profil/:eleveId/session/:sessionId/seances" element={<OwnProfileRoute><><Header /><SessionSeances /><Footer /></></OwnProfileRoute>} />

        {/* Zone Administration */}
          <Route path="/admin" element={<AdminRoute><MenuAdmin /></AdminRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="formations" element={<AdminFormations />} />
            <Route path="formations/:id" element={<AdminFormationSessions />} />
            <Route path="sessions/:id" element={<AdminFormationSeances />} />
            <Route path="seances/:id" element={<AdminSeanceParticipants />} />
            <Route path="utilisateurs" element={<AdminUsers />} />
            <Route path="utilisateurs/:userId/formations" element={<UserFormations />} />
            <Route path="formateurs" element={<AdminFormateurs />} />
            <Route path="formateurs/:formateurId/formations" element={<FormateurFormationsAdmin />} />
          </Route>

          {/* Espace Formateur */}
          <Route path="/formateur/:formateurId" element={<OwnFormateurRoute><MenuFormateur /></OwnFormateurRoute>}>
            <Route index element={<Navigate to="formations" replace />} />
            <Route path="profil" element={<FormateurProfil />} />
            <Route path="formations" element={<FormateurFormations />} />
            <Route path="formations/:formationId" element={<FormateurFormationSessions />} />
            <Route path="sessions/:sessionId" element={<FormateurFormationSeances />} />
            <Route path="formation/:formationId/session/:sessionId/participants" element={<FormateurSeanceParticipants />} />
            <Route path="seances/:seanceId" element={<FormateurSeanceParticipants />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
