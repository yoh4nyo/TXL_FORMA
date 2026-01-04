package SAE._2.Service;

import SAE._2.Repository.PaiementRepository;
import SAE._2.exception.ResourceNotFoundException;
import SAE._2.model.Intervenant;
import SAE._2.model.Paiement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaiementService {

    @Autowired
    private PaiementRepository paiementRepository;

    public Paiement savePaiement(Paiement paiement) {
        return paiementRepository.save(paiement);
    }

    public Iterable<Paiement> getAllPaiement() {
        return paiementRepository.findAll();
    }

    public Paiement getPaiementById(Long id) {
        return paiementRepository.findById(id).orElse(null);
    }

    public Paiement updatePaiement(Long id, Paiement paiementDetails) {
        Paiement existingPaiement = paiementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement non trouvé avec l'ID: " + id));

        existingPaiement.setEleve(paiementDetails.getEleve());
        existingPaiement.setSession(paiementDetails.getSession());
        existingPaiement.setMontant(paiementDetails.getMontant());
        existingPaiement.setDate(paiementDetails.getDate());
        existingPaiement.setNumCarte(paiementDetails.getNumCarte());

        return paiementRepository.save(existingPaiement);
    }

    public void deletePaiementById(Long id) {
        paiementRepository.deleteById(id);
    }
}
