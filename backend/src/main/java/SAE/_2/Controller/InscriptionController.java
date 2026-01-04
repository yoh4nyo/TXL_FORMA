package SAE._2.Controller;

import SAE._2.Service.InscriptionService;
import SAE._2.Service.StripeService;
import SAE._2.model.Session_eleve;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/inscription")
public class InscriptionController {

    @Autowired
    private StripeService stripeService;

    @Autowired
    private InscriptionService inscriptionService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody Map<String, Object> data) {
        try {
            int amount = (int) data.get("amount");
            String currency = (String) data.getOrDefault("currency", "eur");

            PaymentIntent paymentIntent = stripeService.createPaymentIntent(amount, currency);

            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", paymentIntent.getClientSecret());
            response.put("paymentIntentId", paymentIntent.getId());

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/confirm-inscription")
    public ResponseEntity<?> confirmInscription(@RequestBody Map<String, Object> data) {
        try {
            Long sessionId = Long.valueOf(data.get("sessionId").toString());
            Long eleveId = Long.valueOf(data.get("eleveId").toString());
            int montant = Integer.parseInt(data.get("montant").toString());
            String paymentIntentId = (String) data.get("paymentIntentId");

            // Vérifier le paiement avec Stripe
            PaymentIntent paymentIntent = stripeService.confirmPaymentIntent(paymentIntentId);
            
            if (!"succeeded".equals(paymentIntent.getStatus())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Le paiement n'a pas été confirmé");
                return ResponseEntity.badRequest().body(error);
            }

            // Inscrire l'élève
            Session_eleve sessionEleve = inscriptionService.inscrireEleveSession(
                    sessionId, eleveId, montant, paymentIntentId
            );

            return ResponseEntity.ok(sessionEleve);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
