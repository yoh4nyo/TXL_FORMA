package SAE._2.Repository;
import SAE._2.model.Formation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormationRepository extends CrudRepository<Formation, Long> {

        @Query("SELECT f.nom, COUNT(se) " +
                "FROM Formation f " +
                "LEFT JOIN f.sessions s " +
                "LEFT JOIN s.session_eleves se " +
                "GROUP BY f.nom")
        List<Object[]> countElevesPerFormation();

        @Query("SELECT COUNT(f) FROM Formation f")
        Long countTotalFormations();

        @Query("SELECT f.nom, COUNT(s.id) " +
                "FROM Formation f " +
                "LEFT JOIN f.sessions s " +
                "GROUP BY f.nom")
        List<Object[]> getSessionsPerFormation();

        @Query("SELECT DISTINCT f FROM Formation f JOIN f.sessions s WHERE s.intervenant.id = ?1")
        List<Formation> findByIntervenantId(Long intervenantId);
    }



