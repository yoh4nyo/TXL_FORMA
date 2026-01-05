package SAE._2.Service;

import SAE._2.Repository.SeanceRepository;
import SAE._2.Repository.IntervenantRepository;
import SAE._2.Repository.SessionRepository;
import SAE._2.exception.ResourceNotFoundException;
import SAE._2.model.Eleve;
import SAE._2.model.Seance;
import SAE._2.model.Intervenant;
import SAE._2.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeanceService {

    @Autowired
    private SeanceRepository seanceRepository;

    @Autowired
    private IntervenantRepository intervenantRepository;

    @Autowired
    private SessionRepository sessionRepository;

    public Seance saveSeance(Seance seance) {
        if (seance.getSession() != null) {
            Session session = sessionRepository.findById(seance.getSession().getId()).orElse(null);

            if (session != null) {
                // Check if session has started
                try {
                    java.time.LocalDate dateStart = java.time.LocalDate.parse(session.getDate_start());
                    if (java.time.LocalDate.now().isAfter(dateStart) || java.time.LocalDate.now().equals(dateStart)) {
                        throw new RuntimeException("Impossible d'ajouter une séance : La session a déjà commencé le "
                                + session.getDate_start());
                    }
                } catch (java.time.format.DateTimeParseException e) {
                    // Ignore date parse error, let it proceed or log warning
                    System.err.println("Erreur format date session: " + e.getMessage());
                }

                if (session.getIntervenant() != null) {
                    Intervenant intervenant = session.getIntervenant();
                    intervenant.setNbSeance(intervenant.getNbSeance() + 1);
                    intervenant.setNbHeure(intervenant.getNbHeure() + seance.getDuree());
                    intervenantRepository.save(intervenant);
                }
                // Ensure the seance is linked to the full session object
                seance.setSession(session);
            }
        }

        return seanceRepository.save(seance);
    }

    public Iterable<Seance> getAllSeance() {
        return seanceRepository.findAll();
    }

    public Seance getSeanceById(Long id) {
        return seanceRepository.findById(id).orElse(null);
    }

    public Seance updateSeance(Long id, Seance seanceDetails) {
        Seance existingSeance = seanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Séance non trouvé avec l'ID: " + id));

        existingSeance.setSession(seanceDetails.getSession());
        existingSeance.setDate(seanceDetails.getDate());
        existingSeance.setDuree(seanceDetails.getDuree());
        existingSeance.setHoraire(seanceDetails.getHoraire());

        return seanceRepository.save(existingSeance);
    }

    public void deleteSeanceById(Long id) {
        Seance seance = seanceRepository.findById(id).orElse(null);

        if (seance != null) {
            if (seance.getSession() != null) {
                Session session = sessionRepository.findById(seance.getSession().getId()).orElse(null);
                if (session != null && session.getIntervenant() != null) {
                    Intervenant intervenant = session.getIntervenant();
                    intervenant.setNbSeance(Math.max(0, intervenant.getNbSeance() - 1));
                    intervenant.setNbHeure(Math.max(0, intervenant.getNbHeure() - seance.getDuree()));
                    intervenantRepository.save(intervenant);
                }
            }

            seanceRepository.deleteById(id);
        }
    }

    public Iterable<Seance> getSeancesBySessionId(Long sessionId) {
        return seanceRepository.findSeancesBySessionId(sessionId);
    }

    public Iterable<Seance> getSeancesByEleveId(Long eleveId) {
        return seanceRepository.findSeancesByEleveId(eleveId);
    }

    public Long countSeancesByIntervenantId(Long intervenantId) {
        return seanceRepository.countSeancesByIntervenantId(intervenantId);
    }

    public Integer sumHeuresByIntervenantId(Long intervenantId) {
        return seanceRepository.sumHeuresByIntervenantId(intervenantId);
    }
}
