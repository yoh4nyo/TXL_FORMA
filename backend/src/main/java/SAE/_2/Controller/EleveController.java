package SAE._2.Controller;

import SAE._2.Service.EleveService;
import SAE._2.model.Admin;
import SAE._2.model.Eleve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/eleve")
@CrossOrigin(origins = "http://localhost:5173")
public class EleveController {

    @Autowired
    private EleveService eleveService;

    @PostMapping
    public Eleve createEleve(@RequestBody Eleve eleve) {
        return eleveService.saveEleve(eleve);
    }

    @GetMapping
    public Iterable<Eleve> getAllEleve() {
        return eleveService.getAllEleve();
    }

    @GetMapping("/{id}")
    public Eleve getEleveById(@PathVariable Long id) {
        return eleveService.getEleveById(id);
    }

    @PutMapping("/{id}")
    public Eleve updateEleve(@PathVariable Long id, @RequestBody Eleve eleve) {return eleveService.updateEleve(id, eleve);}

    @DeleteMapping("/{id}")
    public void deleteEleve(@PathVariable Long id) {
        eleveService.deleteEleveById(id);
    }
}
