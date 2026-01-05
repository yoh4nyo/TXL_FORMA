package SAE._2.Controller;

import SAE._2.Service.SessionService;
import SAE._2.Service.SessioneleveService;
import SAE._2.model.Seance;
import SAE._2.model.Session;
import SAE._2.model.Session_eleve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/session_eleve")

public class SessioneleveController {

    @Autowired
    private SessioneleveService sessioneleveService;

    @PostMapping
    public Session_eleve createSessioneleve(@RequestBody Session_eleve session_eleve) {
        return sessioneleveService.saveSessioneleve(session_eleve);
    }

    @GetMapping
    public Iterable<Session_eleve> getAllSessioneleve() {
        return sessioneleveService.getAllSessioneleve();
    }

    @GetMapping("/{id}")
    public Session_eleve getSessioneleveById(@PathVariable Long id) {
        return sessioneleveService.getSessioneleveById(id);
    }

    @GetMapping("/eleve/{eleveId}")
    public Iterable<Session_eleve> getSessioneleveByEleveId(@PathVariable Long eleveId) {
        return sessioneleveService.getSessioneleveByEleveId(eleveId);
    }

    @GetMapping("/session/{sessionId}")
    public Iterable<Session_eleve> getSessioneleveBySessionId(@PathVariable Long sessionId) {
        return sessioneleveService.getSessioneleveBySessionId(sessionId);
    }

    @PutMapping("/{id}")
    public Session_eleve updateSessioneleve(@PathVariable Long id, @RequestBody Session_eleve session_eleve) {
        return sessioneleveService.updateSessioneleve(id, session_eleve);
    }

    @DeleteMapping("/{id}")
    public void deleteSessioneleve(@PathVariable Long id) {
        sessioneleveService.deleteSessioneleveById(id);
    }
}