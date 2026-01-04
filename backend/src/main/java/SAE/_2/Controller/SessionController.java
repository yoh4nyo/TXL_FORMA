package SAE._2.Controller;

import SAE._2.Service.SessionService;
import SAE._2.model.Seance;
import SAE._2.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/session")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public Session createSession(@RequestBody Session session) {
        return sessionService.saveSession(session);
    }

    @GetMapping
    public Iterable<Session> getAllSession() {
        return sessionService.getAllSession();
    }

    @GetMapping("/eleve/{eleveId}")
    public Iterable<Session> getSessionsByEleve(@PathVariable Long eleveId) {
        return sessionService.getSessionsByEleveId(eleveId);
    }

    @GetMapping("/formation/{formationId}")
    public Iterable<Session> getSessionsByFormation(@PathVariable Long formationId) {
        return sessionService.getSessionsByFormationId(formationId);
    }

    @GetMapping("/{id}")
    public Session getSessionById(@PathVariable Long id) {
        return sessionService.getSessionById(id);
    }

    @PutMapping("/{id}")
    public Session updateSession(@PathVariable Long id, @RequestBody Session session) {
        return sessionService.updateSession(id, session);
    }

    @DeleteMapping("/{id}")
    public void deleteSession(@PathVariable Long id) {
        sessionService.deleteSessionById(id);
    }
}