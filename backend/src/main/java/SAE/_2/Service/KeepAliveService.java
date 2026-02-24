package SAE._2.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * Service qui ping le backend toutes les 14 minutes pour empêcher
 * Render (free tier) de mettre le serveur en veille.
 */
@Service
public class KeepAliveService {

    private static final Logger log = LoggerFactory.getLogger(KeepAliveService.class);

    @Value("${app.keep-alive.url:}")
    private String keepAliveUrl;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    // Ping toutes les 14 minutes (840000 ms) — Render coupe après 15 min
    // d'inactivité
    @Scheduled(fixedRate = 840000, initialDelay = 60000)
    public void keepAlive() {
        if (keepAliveUrl == null || keepAliveUrl.isBlank()) {
            log.debug("Keep-alive désactivé : aucune URL configurée (app.keep-alive.url)");
            return;
        }

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(keepAliveUrl))
                    .GET()
                    .timeout(Duration.ofSeconds(15))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            log.info("Keep-alive ping {} — status: {}", keepAliveUrl, response.statusCode());
        } catch (Exception e) {
            log.warn("Keep-alive ping échoué: {}", e.getMessage());
        }
    }
}
