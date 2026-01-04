package SAE._2.Controller;

import SAE._2.Service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private StatsService statsService;

    // Chiffres globaux (CA, nb formations, nb profs...)
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard() {
        return statsService.getGlobalDashboard();
    }

    // Nombre de sessions par formation
    @GetMapping("/formations/sessions")
    public List<Map<String, Object>> getSessionsByFormation() {
        return statsService.getStatsParFormation();
    }

    // Nombre d'élèves total par formation
    @GetMapping("/formations/eleves")
    public List<Map<String, Object>> getElevesByFormation() {
        return statsService.getElevesInscritsParFormation();
    }

    // Détails des sessions (ID, Date, Nb Elèves, Nb Séances)
    @GetMapping("/sessions/details")
    public List<Map<String, Object>> getSessionsDetails() {
        return statsService.getSessionsDetails();
    }

    // Détails des séances (ID, Date, Horaire, Nb Elèves présents)
    @GetMapping("/seances/details")
    public List<Map<String, Object>> getSeancesDetails() {
        return statsService.getSeancesDetails();
    }
}