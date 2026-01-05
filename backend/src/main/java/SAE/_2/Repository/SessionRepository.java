package SAE._2.Repository;

import SAE._2.model.Session;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends CrudRepository<Session, Long> {

    @Query("SELECT s.id, s.date_start, " +
            "(SELECT COUNT(se) FROM Session_eleve se WHERE se.session.id = s.id), " +
            "(SELECT COUNT(sea) FROM Seance sea WHERE sea.session.id = s.id) " +
            "FROM Session s")
    List<Object[]> getSessionDetails();

    @Query("SELECT DISTINCT s FROM Session s JOIN s.session_eleves se WHERE se.eleve.id = ?1")
    List<Session> findSessionsByEleveId(Long eleveId);

    @Query("SELECT DISTINCT s FROM Session s LEFT JOIN FETCH s.seances JOIN s.session_eleves se WHERE se.eleve.id = ?1")
    List<Session> findSessionsByEleveIdWithSeances(Long eleveId);

    @Query("SELECT DISTINCT s FROM Session s LEFT JOIN FETCH s.seances WHERE s.formation.id = ?1")
    List<Session> findSessionsByFormationId(Long formationId);

    @Query("SELECT s FROM Session s WHERE s.date_end < ?1")
    List<Session> findSessionsByDateEndBefore(String date);
}