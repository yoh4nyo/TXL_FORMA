package SAE._2.Service;

import SAE._2.Repository.AdminRepository;
import SAE._2.Repository.EleveRepository;
import SAE._2.Repository.IntervenantRepository;
import SAE._2.dto.LoginRequest;
import SAE._2.dto.LoginResponse;
import SAE._2.model.Admin;
import SAE._2.model.Eleve;
import SAE._2.model.Intervenant;
import SAE._2.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EleveRepository eleveRepository;

    @Autowired
    private IntervenantRepository intervenantRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse authenticate(LoginRequest loginRequest) {
        String identifiant = loginRequest.getIdentifiant();
        String password = loginRequest.getPassword();

        // Chercher dans Admin
        Optional<Admin> admin = adminRepository.findByIdentifiant(identifiant);
        if (admin.isPresent()) {
            return validatePassword(admin.get(), password, null, null);
        }

        // Chercher dans Eleve
        Optional<Eleve> eleve = eleveRepository.findByIdentifiant(identifiant);
        if (eleve.isPresent()) {
            Eleve e = eleve.get();
            return validatePassword(e, password, e.getNom(), e.getPrenom(), e.getMail());
        }

        // Chercher dans Intervenant
        Optional<Intervenant> intervenant = intervenantRepository.findByIdentifiant(identifiant);
        if (intervenant.isPresent()) {
            Intervenant i = intervenant.get();
            return validatePassword(i, password, i.getNom(), i.getPrenom(), i.getMail());
        }

        // Utilisateur non trouvé
        LoginResponse response = new LoginResponse(false, "Identifiant ou mot de passe incorrect");
        return response;
    }

    private LoginResponse validatePassword(User user, String rawPassword, String nom, String prenom) {
        return validatePassword(user, rawPassword, nom, prenom, null);
    }

    private LoginResponse validatePassword(User user, String rawPassword, String nom, String prenom, String mail) {
        // Vérifier le mot de passe (supporte les deux cas: hashé avec BCrypt ou en clair pour les anciens comptes)
        boolean passwordMatches = false;
        
        if (user.getPassword().startsWith("$2a$") || user.getPassword().startsWith("$2b$") || user.getPassword().startsWith("$2y$")) {
            // Mot de passe hashé avec BCrypt
            passwordMatches = passwordEncoder.matches(rawPassword, user.getPassword());
        } else {
            // Mot de passe en clair (anciens comptes) - à migrer
            passwordMatches = user.getPassword().equals(rawPassword);
        }

        if (passwordMatches) {
            LoginResponse response = new LoginResponse(true, "Connexion réussie");
            response.setId(user.getId());
            response.setIdentifiant(user.getIdentifiant());
            response.setRole(user.getRole());
            response.setNom(nom);
            response.setPrenom(prenom);
            response.setMail(mail);
            return response;
        } else {
            return new LoginResponse(false, "Identifiant ou mot de passe incorrect");
        }
    }
}
