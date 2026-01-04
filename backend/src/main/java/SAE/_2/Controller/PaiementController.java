package SAE._2.Controller;

import SAE._2.Service.PaiementService;
import SAE._2.model.Admin;
import SAE._2.model.Paiement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paiement")
public class PaiementController {

    @Autowired
    private PaiementService paiementService;

    @PostMapping
    public Paiement createPaiement(@RequestBody Paiement paiement) {
        return paiementService.savePaiement(paiement);
    }

    @GetMapping
    public Iterable<Paiement> getAllPaiement() {
        return paiementService.getAllPaiement();
    }

    @GetMapping("/{id}")
    public Paiement getIntervenantById(@PathVariable Long id) {
        return paiementService.getPaiementById(id);
    }

    @PutMapping("/{id}")
    public Paiement updatePaiement(@PathVariable Long id, @RequestBody Paiement paiement) {return paiementService.updatePaiement(id, paiement);}

    @DeleteMapping("/{id}")
    public void deletePaiement(@PathVariable Long id) {
        paiementService.deletePaiementById(id);
    }
}