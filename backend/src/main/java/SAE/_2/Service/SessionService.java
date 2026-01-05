package SAE._2.Service;

import SAE._2.Repository.SessionRepository;
import SAE._2.exception.ResourceNotFoundException;
import SAE._2.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
    @Autowired
    private SessionRepository sessionRepository;

    public Session saveSession(Session session) {
        if (session.getNbPlaceRestant() == null && session.getNbPlace() != null) {
            session.setNbPlaceRestant(session.getNbPlace());
        }
        return sessionRepository.save(session);
    }

    public Iterable<Session> getAllSession() {
        return sessionRepository.findAll();
    }

    public Session getSessionById(Long id) {
        return sessionRepository.findById(id).orElse(null);
    }

    public Session updateSession(Long id, Session sessionDetails) {
        Session existingSession = sessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session non trouvé avec l'ID: " + id));
        existingSession.setFormation(sessionDetails.getFormation());
        existingSession.setIntervenant(sessionDetails.getIntervenant());
        existingSession.setDate_end(sessionDetails.getDate_end());
        existingSession.setDate_start(sessionDetails.getDate_start());
        existingSession.setNbPlace(sessionDetails.getNbPlace());
        if (sessionDetails.getNbPlaceRestant() != null) {
            existingSession.setNbPlaceRestant(sessionDetails.getNbPlaceRestant());
        }

        return sessionRepository.save(existingSession);
    }

    public void deleteSessionById(Long id) {
        sessionRepository.deleteById(id);
    }

    public Iterable<Session> getSessionsByEleveId(Long eleveId) {
        return sessionRepository.findSessionsByEleveIdWithSeances(eleveId);
    }

    public Iterable<Session> getSessionsByFormationId(Long formationId) {
        return sessionRepository.findSessionsByFormationId(formationId);
    }

    public Iterable<Session> getSessionsByFormationAndIntervenant(Long formationId, Long intervenantId) {
        return sessionRepository.findSessionsByFormationIdAndIntervenantId(formationId, intervenantId);
    }
}
