package SAE._2.Service;

import SAE._2.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatsService {

    @Autowired
    private FormationRepository formationRepository;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private SeanceRepository seanceRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PaiementRepository paiementRepository;
    @Autowired
    private SessioneleveRepository sessioneleveRepository;

    public Map<String, Object> getGlobalDashboard() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalFormations", formationRepository.countTotalFormations());
        stats.put("totalUsersEleves", userRepository.countTotalUsers());
        stats.put("totalIntervenants", userRepository.countTotalFormateurs());
        stats.put("totalSeances", seanceRepository.countTotalSeances());
        stats.put("totalVentes", sessioneleveRepository.countTotalVentes());
        stats.put("totalCertificats", sessioneleveRepository.countTotalCertificats());
        stats.put("chiffreAffaireTotal",
                paiementRepository.sumTotalRevenue() != null ? paiementRepository.sumTotalRevenue() : 0.0);

        return stats;
    }

    public List<Map<String, Object>> getStatsParFormation() {
        List<Object[]> elevesResults = formationRepository.countElevesPerFormation();
        List<Object[]> sessionsResults = formationRepository.getSessionsPerFormation();

        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] row : sessionsResults) {
            Map<String, Object> map = new HashMap<>();
            map.put("nomFormation", row[0]);
            map.put("nbSessions", row[1]);
            response.add(map);
        }
        return response;
    }

    public List<Map<String, Object>> getElevesInscritsParFormation() {
        List<Object[]> results = formationRepository.countElevesPerFormation();
        List<Map<String, Object>> response = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("nomFormation", row[0]);
            map.put("nbElevesTotal", row[1]);
            response.add(map);
        }
        return response;
    }

    public List<Map<String, Object>> getSessionsDetails() {
        List<Object[]> results = sessionRepository.getSessionDetails();
        List<Map<String, Object>> response = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("sessionId", row[0]);
            map.put("dateStart", row[1]);
            map.put("nbElevesInscrits", row[2]);
            map.put("nbSeancesPrevues", row[3]);
            response.add(map);
        }
        return response;
    }

    public List<Map<String, Object>> getSeancesDetails() {
        List<Object[]> results = seanceRepository.getNbElevesParSeance();
        List<Map<String, Object>> response = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("seanceId", row[0]);
            map.put("date", row[1]);
            map.put("horaire", row[2]);
            map.put("nbElevesPresents", row[3]);
            response.add(map);
        }
        return response;
    }
}