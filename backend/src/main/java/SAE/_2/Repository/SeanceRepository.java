package SAE._2.Repository;
import SAE._2.model.Seance;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeanceRepository extends CrudRepository<Seance, Long> {

    @Query("SELECT COUNT(s) FROM Seance s")
    Long countTotalSeances();

    @Query("SELECT s.id, s.date, s.horaire, COUNT(sle.id) " +
            "FROM Seance s " +
            "LEFT JOIN s.seance_eleves sle " +
            "GROUP BY s.id, s.date, s.horaire")
    List<Object[]> getNbElevesParSeance();
    @Query("SELECT s FROM Seance s WHERE s.session.id = ?1")
    List<Seance> findSeancesBySessionId(Long sessionId);

    @Query("SELECT s FROM Seance s WHERE s.session.id = ?1")
    List<Seance> findBySessionId(Long sessionId);

    @Query("SELECT DISTINCT s FROM Seance s JOIN s.seance_eleves se WHERE se.eleve.id = ?1")
    List<Seance> findSeancesByEleveId(Long eleveId);

    @Query("SELECT COUNT(s) FROM Seance s WHERE s.session.intervenant.id = ?1")
    Long countSeancesByIntervenantId(Long intervenantId);

    @Query("SELECT COALESCE(SUM(s.duree), 0) FROM Seance s WHERE s.session.intervenant.id = ?1")
    Integer sumHeuresByIntervenantId(Long intervenantId);
}