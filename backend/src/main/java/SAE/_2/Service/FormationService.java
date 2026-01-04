package SAE._2.Service;
import SAE._2.Repository.FormationRepository;
import SAE._2.exception.ResourceNotFoundException;
import SAE._2.model.Eleve;
import SAE._2.model.Formation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormationService {

    @Autowired
    private FormationRepository formationRepository;

    public Formation saveFormation(Formation formation) {
        return formationRepository.save(formation);
    }

    public Iterable<Formation> getAllFormation() {
        return formationRepository.findAll();
    }

    public Formation getFormationById(Long id) {
        return formationRepository.findById(id).orElse(null);
    }

    public Formation updateFormation(Long id, Formation formationDetails) {
        Formation existingFormation = formationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Formation non trouvé avec l'ID: " + id));

        existingFormation.setNom(formationDetails.getNom());
        existingFormation.setDescription(formationDetails.getDescription());
        existingFormation.setPrix(formationDetails.getPrix());
        existingFormation.setCategorie(formationDetails.getCategorie());
        existingFormation.setApprentissages(formationDetails.getApprentissages());

        return formationRepository.save(existingFormation);
    }

    public void deleteFormationById(Long id) {
        formationRepository.deleteById(id);
    }

    public Iterable<Formation> getFormationsByIntervenantId(Long intervenantId) {
        return formationRepository.findByIntervenantId(intervenantId);
    }
}
