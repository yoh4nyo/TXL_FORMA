package SAE._2.Service;

import SAE._2.Repository.IntervenantRepository;
import SAE._2.exception.ResourceNotFoundException;
import SAE._2.model.Intervenant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class IntervenantService {

    @Autowired
    private IntervenantRepository intervenantRepository;

    @Autowired
    private SAE._2.Repository.EleveRepository eleveRepository;

    @Autowired
    private SAE._2.Repository.AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private void validateUniqueFields(Intervenant intervenant, Long excludeId) {
        String mail = intervenant.getMail();
        String identifiant = intervenant.getIdentifiant();

        if (mail != null && !mail.isEmpty()) {
            boolean existsInIntervenant = excludeId == null
                    ? intervenantRepository.existsByMail(mail)
                    : intervenantRepository.existsByMailAndIdNot(mail, excludeId);
            boolean existsInEleve = eleveRepository.existsByMail(mail);

            if (existsInIntervenant || existsInEleve) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Cette adresse mail est déjà utilisée (peut-être par un autre rôle)");
            }
        }

        if (identifiant != null && !identifiant.isEmpty()) {
            boolean existsInIntervenant = excludeId == null
                    ? intervenantRepository.existsByIdentifiant(identifiant)
                    : intervenantRepository.existsByIdentifiantAndIdNot(identifiant, excludeId);
            boolean existsInEleve = eleveRepository.existsByIdentifiant(identifiant);
            boolean existsInAdmin = adminRepository.existsByIdentifiant(identifiant);

            if (existsInIntervenant || existsInEleve || existsInAdmin) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Cet identifiant est déjà utilisé (peut-être par un autre rôle)");
            }
        }
    }

    public Intervenant saveIntervenant(Intervenant intervenant) {
        validateUniqueFields(intervenant, null);
        if (intervenant.getPassword() != null && !intervenant.getPassword().isEmpty()) {
            intervenant.setPassword(passwordEncoder.encode(intervenant.getPassword()));
        }
        return intervenantRepository.save(intervenant);
    }

    public Iterable<Intervenant> getAllIntervenant() {
        return intervenantRepository.findAll();
    }

    public Intervenant getIntervenantById(Long id) {
        return intervenantRepository.findById(id).orElse(null);
    }

    public Intervenant updateIntervenant(Long id, Intervenant intervenantDetails) {
        Intervenant existingIntervenant = intervenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Intervenant non trouvé avec l'ID: " + id));

        existingIntervenant.setIdentifiant(intervenantDetails.getIdentifiant());
        existingIntervenant.setRole(intervenantDetails.getRole());
        existingIntervenant.setNom(intervenantDetails.getNom());
        existingIntervenant.setPrenom(intervenantDetails.getPrenom());
        existingIntervenant.setMail(intervenantDetails.getMail());
        existingIntervenant.setNbHeure(intervenantDetails.getNbHeure());
        existingIntervenant.setNbSeance(intervenantDetails.getNbSeance());
        existingIntervenant.setMetier(intervenantDetails.getMetier());
        validateUniqueFields(intervenantDetails, id);

        if (intervenantDetails.getPassword() != null && !intervenantDetails.getPassword().isEmpty()) {
            existingIntervenant.setPassword(passwordEncoder.encode(intervenantDetails.getPassword()));
        }
        return intervenantRepository.save(existingIntervenant);
    }

    public void deleteIntervenantById(Long id) {
        intervenantRepository.deleteById(id);
    }
}
