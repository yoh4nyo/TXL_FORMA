package SAE._2.Controller;

import SAE._2.Service.IntervenantService;
import SAE._2.model.Admin;
import SAE._2.model.Intervenant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/intervenant")
public class IntervenantController {

    @Autowired
    private IntervenantService intervenantService;

    @PostMapping
    public Intervenant createIntervenant(@RequestBody Intervenant intervenant) {
        return intervenantService.saveIntervenant(intervenant);
    }

    @GetMapping
    public Iterable<Intervenant> getAllIntervenant() {
        return intervenantService.getAllIntervenant();
    }

    @GetMapping("/{id}")
    public Intervenant getIntervenantById(@PathVariable Long id) {
        return intervenantService.getIntervenantById(id);
    }

    @PutMapping("/{id}")
    public Intervenant updateIntervenant(@PathVariable Long id, @RequestBody Intervenant intervenant) {
        return intervenantService.updateIntervenant(id, intervenant);
    }

    @DeleteMapping("/{id}")
    public void deleteIntervenant(@PathVariable Long id) {
        intervenantService.deleteIntervenantById(id);
    }
}