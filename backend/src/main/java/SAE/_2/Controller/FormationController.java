package SAE._2.Controller;

import SAE._2.Service.FormationService;
import SAE._2.model.Admin;
import SAE._2.model.Formation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/formation")
public class FormationController {

    @Autowired
    private FormationService formationService;

    @PostMapping
    public Formation createFormation(@RequestBody Formation formation) {
        return formationService.saveFormation(formation);
    }

    @GetMapping
    public Iterable<Formation> getAllFormation() {
        return formationService.getAllFormation();
    }

    @GetMapping("/{id}")
    public Formation getFormationById(@PathVariable Long id) {
        return formationService.getFormationById(id);
    }

    @GetMapping("/intervenant/{intervenantId}")
    public Iterable<Formation> getFormationsByIntervenant(@PathVariable Long intervenantId) {
        return formationService.getFormationsByIntervenantId(intervenantId);
    }

    @PutMapping("/{id}")
    public Formation updateFormation(@PathVariable Long id, @RequestBody Formation formation) {
        return formationService.updateFormation(id, formation);
    }

    @DeleteMapping("/{id}")
    public void deleteFormation(@PathVariable Long id) {
        formationService.deleteFormationById(id);
    }
}
