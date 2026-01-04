package SAE._2.Repository;
import SAE._2.model.Seance_eleve;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeanceeleveRepository extends CrudRepository<Seance_eleve, Long> {

    @Query("SELECT se FROM Seance_eleve se JOIN FETCH se.eleve WHERE se.seance.id = ?1")
    List<Seance_eleve> findBySeanceId(Long seanceId);

}