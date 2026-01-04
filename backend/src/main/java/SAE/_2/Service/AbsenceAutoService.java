package SAE._2.Service;

import SAE._2.Repository.SeanceeleveRepository;
import SAE._2.Repository.SeanceRepository;
import SAE._2.Repository.EleveRepository;
import SAE._2.model.Seance;
import SAE._2.model.Seance_eleve;
import SAE._2.model.Eleve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AbsenceAutoService {

    @Autowired
    private SeanceRepository seanceRepository;

    @Autowired
    private SeanceeleveRepository seanceeleveRepository;

    @Autowired
    private EleveRepository eleveRepository;

    @Transactional
    public int marquerAbsentsAutomatiquement() {
        int count = 0;
        LocalDateTime now = LocalDateTime.now();
        Iterable<Seance> seances = seanceRepository.findAll();

        for (Seance seance : seances) {
            if (seance.getDate() == null || seance.getHoraire() == null) {
                continue;
            }
            try {
                String dateStr = seance.getDate();
                String horaireStr = seance.getHoraire();

                LocalDateTime seanceDateTime = LocalDateTime.parse(
                    dateStr + "T" + horaireStr + ":00",
                    DateTimeFormatter.ISO_LOCAL_DATE_TIME
                );
                LocalDateTime heureLimite = seanceDateTime.plusHours(2);

                if (now.isAfter(heureLimite)) {
                    Iterable<Seance_eleve> participants = seanceeleveRepository.findBySeanceId(seance.getId());

                    for (Seance_eleve se : participants) {
                        if ((se.getStatut() == null || se.getStatut().isEmpty() || se.getStatut().equals("Non renseigné")) 
                            && (se.getSignature() == null || se.getSignature().isEmpty())) {
                            
                            se.setStatut("absent");
                            se.setSignature("");
                            seanceeleveRepository.save(se);

                            if (se.getEleve() != null) {
                                Eleve eleve = se.getEleve();
                                eleve.setNbAbsence(eleve.getNbAbsence() + 1);
                                eleveRepository.save(eleve);
                            }
                            
                            count++;
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("Erreur lors du traitement de la séance " + seance.getId() + ": " + e.getMessage());
            }
        }

        return count;
    }
}
