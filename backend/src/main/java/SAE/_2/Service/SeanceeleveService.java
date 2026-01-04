package SAE._2.Service;

import SAE._2.Repository.SeanceeleveRepository;
import SAE._2.Repository.EleveRepository;
import SAE._2.exception.ResourceNotFoundException;
import SAE._2.model.Seance_eleve;
import SAE._2.model.Eleve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeanceeleveService {

    @Autowired
    private SeanceeleveRepository seanceeleveRepository;

    @Autowired
    private EleveRepository eleveRepository;

    public Seance_eleve saveSeanceeleve(Seance_eleve seanceeleve) {
        return seanceeleveRepository.save(seanceeleve);
    }

    public Iterable<Seance_eleve> getAllSeanceeleve() {
        return seanceeleveRepository.findAll();
    }

    public Seance_eleve getSeanceeleveById(Long id) {
        return seanceeleveRepository.findById(id).orElse(null);
    }

    public Iterable<Seance_eleve> getSeanceeleveBySeanceId(Long seanceId) {
        return seanceeleveRepository.findBySeanceId(seanceId);
    }

    public Seance_eleve updateSeanceeleve(Long id, Seance_eleve seance_eleveDetails) {
        Seance_eleve existingSeance_eleve = seanceeleveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Séance eleve non trouvé avec l'ID: " + id));

        String oldStatut = existingSeance_eleve.getStatut();
        String newStatut = seance_eleveDetails.getStatut();
        
        existingSeance_eleve.setInscription(seance_eleveDetails.getInscription());
        existingSeance_eleve.setEleve(seance_eleveDetails.getEleve());
        existingSeance_eleve.setSeance(seance_eleveDetails.getSeance());
        existingSeance_eleve.setSignature(seance_eleveDetails.getSignature());
        existingSeance_eleve.setStatut(newStatut);

        if ("absent".equals(newStatut) && !"absent".equals(oldStatut)) {
            if (existingSeance_eleve.getEleve() != null) {
                Eleve eleve = existingSeance_eleve.getEleve();
                eleve.setNbAbsence(eleve.getNbAbsence() + 1);
                eleveRepository.save(eleve);
            }
        }

        return seanceeleveRepository.save(existingSeance_eleve);
    }

    public void deleteSeanceeleveById(Long id) {
        seanceeleveRepository.deleteById(id);
    }
}
