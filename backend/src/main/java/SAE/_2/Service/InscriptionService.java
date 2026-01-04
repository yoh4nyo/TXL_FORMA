package SAE._2.Service;

import SAE._2.Repository.EleveRepository;
import SAE._2.Repository.PaiementRepository;
import SAE._2.Repository.SeanceRepository;
import SAE._2.Repository.SeanceeleveRepository;
import SAE._2.Repository.SessionRepository;
import SAE._2.Repository.SessioneleveRepository;
import SAE._2.model.Eleve;
import SAE._2.model.Paiement;
import SAE._2.model.Seance;
import SAE._2.model.Seance_eleve;
import SAE._2.model.Session;
import SAE._2.model.Session_eleve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class InscriptionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private EleveRepository eleveRepository;

    @Autowired
    private SessioneleveRepository sessioneleveRepository;

    @Autowired
    private SeanceeleveRepository seanceeleveRepository;

    @Autowired
    private SeanceRepository seanceRepository;

    @Autowired
    private PaiementRepository paiementRepository;

    @Transactional
    public Session_eleve inscrireEleveSession(Long sessionId, Long eleveId, int montant, String stripePaymentIntentId) {
        // Récupérer la session
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session non trouvée"));

        // Récupérer l'élève
        Eleve eleve = eleveRepository.findById(eleveId)
                .orElseThrow(() -> new RuntimeException("Élève non trouvé"));

        // Créer le paiement
        Paiement paiement = new Paiement();
        paiement.setMontant(montant);
        paiement.setDate(LocalDate.now());
        paiement.setEleve(eleve);
        paiement.setSession(session);
        paiement.setNumCarte("STRIPE_" + stripePaymentIntentId); // Stocker l'ID de paiement Stripe
        paiementRepository.save(paiement);

        // Créer session_eleve
        Session_eleve sessionEleve = new Session_eleve();
        sessionEleve.setStatut("en cours");
        sessionEleve.setSession(session);
        sessionEleve.setEleve(eleve);
        // note et diplome restent null (valeurs primitives: 0 par défaut)
        sessionEleve = sessioneleveRepository.save(sessionEleve);

        // Récupérer toutes les séances de la session
        List<Seance> seances = seanceRepository.findBySessionId(sessionId);

        // Créer une entrée seance_eleve pour chaque séance
        for (Seance seance : seances) {
            Seance_eleve seanceEleve = new Seance_eleve();
            seanceEleve.setSeance(seance);
            seanceEleve.setEleve(eleve);
            seanceEleve.setStatut(null);
            seanceEleve.setSignature(null);
            seanceEleve.setInscription(LocalDate.now());
            seanceeleveRepository.save(seanceEleve);
        }
        try {
            int placesRestantes = Integer.parseInt(session.getNbPlaceRestant());
            if (placesRestantes > 0) {
                session.setNbPlaceRestant(String.valueOf(placesRestantes - 1));
                sessionRepository.save(session);
            }
        } catch (NumberFormatException e) {
        }

        return sessionEleve;
    }
}
