package SAE._2.Service;
import SAE._2.Repository.EleveRepository;
import SAE._2.exception.ResourceNotFoundException;
import SAE._2.model.Eleve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EleveService {

    @Autowired
    private EleveRepository eleveRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private void validateUniqueFields(Eleve eleve, Long excludeId) {
        String mail = eleve.getMail();
        String identifiant = eleve.getIdentifiant();

        if (mail != null && !mail.isEmpty()) {
            boolean exists = excludeId == null
                    ? eleveRepository.existsByMail(mail)
                    : eleveRepository.existsByMailAndIdNot(mail, excludeId);
            if (exists) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cette adresse mail est déjà utilisée");
            }
        }

        if (identifiant != null && !identifiant.isEmpty()) {
            boolean exists = excludeId == null
                    ? eleveRepository.existsByIdentifiant(identifiant)
                    : eleveRepository.existsByIdentifiantAndIdNot(identifiant, excludeId);
            if (exists) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cet identifiant est déjà utilisé");
            }
        }
    }

    public Eleve saveEleve(Eleve eleve) {
        validateUniqueFields(eleve, null);
        if (eleve.getPassword() != null && !eleve.getPassword().isEmpty()) {
            eleve.setPassword(passwordEncoder.encode(eleve.getPassword()));
        }
        return eleveRepository.save(eleve);
    }

    public Iterable<Eleve> getAllEleve() {
        return eleveRepository.findAll();
    }

    public Eleve getEleveById(Long id) {
        return eleveRepository.findById(id).orElse(null);
    }

    public Eleve updateEleve(Long id, Eleve eleveDetails) {
        Eleve existingEleve = eleveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Eleve non trouvé avec l'ID: " + id));

        existingEleve.setAdresse(eleveDetails.getAdresse());
        existingEleve.setIdentifiant(eleveDetails.getIdentifiant());
        existingEleve.setRole(eleveDetails.getRole());
        existingEleve.setNom(eleveDetails.getNom());
        existingEleve.setPrenom(eleveDetails.getPrenom());
        existingEleve.setMail(eleveDetails.getMail());
        existingEleve.setNbAbsence(eleveDetails.getNbAbsence());
        existingEleve.setInscription(eleveDetails.getInscription());
        validateUniqueFields(eleveDetails, id);

        if (eleveDetails.getPassword() != null && !eleveDetails.getPassword().isEmpty()) {
            existingEleve.setPassword(passwordEncoder.encode(eleveDetails.getPassword()));
        }
        return eleveRepository.save(existingEleve);
    }

    public void deleteEleveById(Long id) {
        eleveRepository.deleteById(id);
    }
}
