package SAE._2.scheduler;

import SAE._2.Service.AbsenceAutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class AbsenceScheduler {

    @Autowired
    private AbsenceAutoService absenceAutoService;

    // Exécuter toutes les heures (à la minute 0)
    @Scheduled(cron = "0 0 * * * *")
    public void marquerAbsentsAutomatiquement() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        System.out.println("[" + timestamp + "] Démarrage du job de marquage automatique des absents...");
        
        try {
            int count = absenceAutoService.marquerAbsentsAutomatiquement();
            System.out.println("[" + timestamp + "] Job terminé : " + count + " élève(s) marqué(s) absent(s).");
        } catch (Exception e) {
            System.err.println("[" + timestamp + "] Erreur lors du job : " + e.getMessage());
            e.printStackTrace();
        }
    }
}
