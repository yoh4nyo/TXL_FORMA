package SAE._2.Controller;

import SAE._2.Service.SeanceService;
import SAE._2.model.Admin;
import SAE._2.model.Seance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/seance")
public class SeanceController {

    @Autowired
    private SeanceService seanceService;

    @PostMapping
    public Seance createSeance(@RequestBody Seance seance) {
        return seanceService.saveSeance(seance);
    }

    @GetMapping
    public Iterable<Seance> getAllSeance() {
        return seanceService.getAllSeance();
    }

    @GetMapping("/session/{sessionId}")
    public Iterable<Seance> getSeancesBySession(@PathVariable Long sessionId) {
        return seanceService.getSeancesBySessionId(sessionId);
    }

    @GetMapping("/eleve/{eleveId}")
    public Iterable<Seance> getSeancesByEleve(@PathVariable Long eleveId) {
        return seanceService.getSeancesByEleveId(eleveId);
    }

    @GetMapping("/intervenant/{intervenantId}/count")
    public Long countSeancesByIntervenant(@PathVariable Long intervenantId) {
        return seanceService.countSeancesByIntervenantId(intervenantId);
    }

    @GetMapping("/intervenant/{intervenantId}/heures")
    public Integer sumHeuresByIntervenant(@PathVariable Long intervenantId) {
        return seanceService.sumHeuresByIntervenantId(intervenantId);
    }

    @GetMapping("/{id}")
    public Seance getSeanceById(@PathVariable Long id) {
        return seanceService.getSeanceById(id);
    }

    @PutMapping("/{id}")
    public Seance updateSeance(@PathVariable Long id, @RequestBody Seance seance) {
        return seanceService.updateSeance(id, seance);
    }

    @DeleteMapping("/{id}")
    public void deleteSeance(@PathVariable Long id) {
        seanceService.deleteSeanceById(id);
    }
}