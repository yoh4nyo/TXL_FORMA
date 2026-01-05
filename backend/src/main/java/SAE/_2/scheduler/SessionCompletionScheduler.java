package SAE._2.scheduler;

import SAE._2.Repository.SessionRepository;
import SAE._2.Repository.SessioneleveRepository;
import SAE._2.model.Session;
import SAE._2.model.Session_eleve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Component
public class SessionCompletionScheduler {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private SessioneleveRepository sessionEleveRepository;

    @Scheduled(fixedRate = 1000) // Run every second for immediate testing
    @Transactional
    public void markSessionsCompleted() {
        LocalDate today = LocalDate.now();

        // Find sessions that ended yesterday or earlier
        // Note: Logic implies if date_end < today, it's over.
        // We fetch sessions ended before today to be safe.
        List<Session> sessions = sessionRepository.findSessionsByDateEndBefore(today.toString());

        for (Session session : sessions) {
            // Check if we need to process students
            // Efficiency: We could filter this in the query, but for now we iterate.

            if (session.getSession_eleves() != null) {
                for (Session_eleve sessionEleve : session.getSession_eleves()) {
                    // Only update if not already processed
                    if (!"Admis".equals(sessionEleve.getStatut()) && !"Refusé".equals(sessionEleve.getStatut())) {
                        System.out.println("Clôture auto Session #" + session.getId() + " - Elève #"
                                + sessionEleve.getEleve().getId() + " -> Admis");
                        sessionEleve.setStatut("Admis");
                        sessionEleve.setDiplome(1); // 1 = Has Diploma ? Assuming boolean int specific
                        sessionEleveRepository.save(sessionEleve);
                    }
                }
            }
        }
    }
}
