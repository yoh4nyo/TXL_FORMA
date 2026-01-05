package SAE._2.Controller;

import SAE._2.Service.SeanceeleveService;
import SAE._2.model.Seance;
import SAE._2.model.Seance_eleve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seance_eleve")

public class SeanceeleveController {

    @Autowired
    private SeanceeleveService seanceeleveService;

    @PostMapping
    public Seance_eleve createSeanceeleve(@RequestBody Seance_eleve seance_eleve) {
        return seanceeleveService.saveSeanceeleve(seance_eleve);
    }

    @GetMapping
    public Iterable<Seance_eleve> getAllSeanceeleve() {
        return seanceeleveService.getAllSeanceeleve();
    }

    @GetMapping("/seance/{seanceId}")
    public Iterable<Seance_eleve> getSeanceeleveBySeance(@PathVariable Long seanceId) {
        return seanceeleveService.getSeanceeleveBySeanceId(seanceId);
    }

    @GetMapping("/{id}")
    public Seance_eleve getSeanceeleveById(@PathVariable Long id) {
        return seanceeleveService.getSeanceeleveById(id);
    }

    @PutMapping("/{id}")
    public Seance_eleve updateSeanceeleve(@PathVariable Long id, @RequestBody Seance_eleve seance_eleve) {
        return seanceeleveService.updateSeanceeleve(id, seance_eleve);
    }

    @DeleteMapping("/{id}")
    public void deleteSeanceeleve(@PathVariable Long id) {
        seanceeleveService.deleteSeanceeleveById(id);
    }
}