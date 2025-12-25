import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Accueil from './pages/Accueil/Accueil';
import Connexion from './pages/Connexion/Connexion';
import Inscription from './pages/Inscription/Inscription';
import Contact from './pages/Contact/Contact';
import DevenirFormateur from './pages/DevenirFormateur/DevenirFormateur';
import NosFormations from './pages/NosFormations/NosFormations';
import Profil from './pages/Profil/Profil';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/nos-formations" element={<NosFormations />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/devenir-formateur" element={<DevenirFormateur />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
