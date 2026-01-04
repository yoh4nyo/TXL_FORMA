package SAE._2.Service;

import SAE._2.Repository.SessioneleveRepository;
import SAE._2.Repository.SessionRepository;
import SAE._2.model.Session;
import SAE._2.model.Session_eleve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import SAE._2.exception.ResourceNotFoundException;

@Service
public class SessioneleveService {

    @Autowired
    private SessioneleveRepository sessioneleveRepository;

    @Autowired
    private SessionRepository sessionRepository;

    public Session_eleve saveSessioneleve(Session_eleve sessioneleve) {
        Session_eleve saved = sessioneleveRepository.save(sessioneleve);

        if (sessioneleve.getSession() != null && sessioneleve.getSession().getId() != null) {
            Session session = sessionRepository.findById(sessioneleve.getSession().getId()).orElse(null);
            if (session != null && session.getNbPlaceRestant() != null) {
                try {
                    int restant = Integer.parseInt(session.getNbPlaceRestant());
                    if (restant > 0) {
                        session.setNbPlaceRestant(String.valueOf(restant - 1));
                        sessionRepository.save(session);
                    }
                } catch (NumberFormatException e) {}
            }
        }
        return saved;
    }

    public Iterable<Session_eleve> getAllSessioneleve() {
        return sessioneleveRepository.findAll();
    }

    public Session_eleve getSessioneleveById(Long id) {
        return sessioneleveRepository.findById(id).orElse(null);
    }

    public Iterable<Session_eleve> getSessioneleveByEleveId(Long eleveId) {
        return sessioneleveRepository.findByEleveId(eleveId);
    }

    public Iterable<Session_eleve> getSessioneleveBySessionId(Long sessionId) {
        return sessioneleveRepository.findBySessionId(sessionId);
    }

    public Session_eleve updateSessioneleve(Long id, Session_eleve sessioneleveDetails) {
        Session_eleve existingSession_eleve = sessioneleveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session eleve non trouvé avec l'ID: " + id));

        existingSession_eleve.setSession(sessioneleveDetails.getSession());
        existingSession_eleve.setEleve(sessioneleveDetails.getEleve());
        existingSession_eleve.setDiplome(sessioneleveDetails.getDiplome());
        existingSession_eleve.setStatut(sessioneleveDetails.getStatut());
        existingSession_eleve.setNote(sessioneleveDetails.getNote());

        return sessioneleveRepository.save(existingSession_eleve);
    }

    public void deleteSessioneleveById(Long id) {
        Session_eleve sessioneleve = sessioneleveRepository.findById(id).orElse(null);
        if (sessioneleve != null && sessioneleve.getSession() != null) {
            Session session = sessionRepository.findById(sessioneleve.getSession().getId()).orElse(null);
            if (session != null && session.getNbPlaceRestant() != null) {
                try {
                    int restant = Integer.parseInt(session.getNbPlaceRestant());
                    session.setNbPlaceRestant(String.valueOf(restant + 1));
                    sessionRepository.save(session);
                } catch (NumberFormatException e) {}
            }
        }
        sessioneleveRepository.deleteById(id);
    }
}
