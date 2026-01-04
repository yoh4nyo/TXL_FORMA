package SAE._2.Repository;
import SAE._2.model.Session_eleve;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessioneleveRepository extends CrudRepository<Session_eleve, Long> {

    @Query("SELECT COUNT(se) FROM Session_eleve se WHERE se.session.id = ?1")
    Long countBySessionId(Long sessionId);

    @Query("SELECT COUNT(se) FROM Session_eleve se WHERE se.diplome = 1")
    Long countTotalCertificats();

    @Query("SELECT COUNT(se) FROM Session_eleve se")
    Long countTotalVentes();

    @Query("SELECT se FROM Session_eleve se JOIN FETCH se.session s LEFT JOIN FETCH s.formation LEFT JOIN FETCH s.intervenant WHERE se.eleve.id = ?1")
    Iterable<Session_eleve> findByEleveId(Long eleveId);

    @Query("SELECT se FROM Session_eleve se JOIN FETCH se.eleve WHERE se.session.id = ?1")
    Iterable<Session_eleve> findBySessionId(Long sessionId);
}