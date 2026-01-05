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

    @Scheduled(fixedRate = 1000)
    @Transactional
    public void markSessionsCompleted() {
        LocalDate today = LocalDate.now();

        List<Session> sessions = sessionRepository.findSessionsByDateEndBefore(today.toString());

        for (Session session : sessions) {

            if (session.getSession_eleves() != null) {
                for (Session_eleve sessionEleve : session.getSession_eleves()) {
                    if (!"admis".equals(sessionEleve.getStatut()) && !"Refusé".equals(sessionEleve.getStatut())) {
                        System.out.println("Clôture auto Session #" + session.getId() + " - Elève #"
                                + sessionEleve.getEleve().getId() + " -> admis");
                        sessionEleve.setStatut("admis");
                        sessionEleve.setDiplome(1);
                        sessionEleveRepository.save(sessionEleve);
                    }
                }
            }
        }
    }
}
