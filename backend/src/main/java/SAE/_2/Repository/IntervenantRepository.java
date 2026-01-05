package SAE._2.Repository;
import SAE._2.model.Intervenant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IntervenantRepository extends CrudRepository<Intervenant, Long> {
	boolean existsByMail(String mail);
	boolean existsByIdentifiant(String identifiant);
	boolean existsByMailAndIdNot(String mail, Long id);
	boolean existsByIdentifiantAndIdNot(String identifiant, Long id);
	Optional<Intervenant> findByIdentifiant(String identifiant);
}