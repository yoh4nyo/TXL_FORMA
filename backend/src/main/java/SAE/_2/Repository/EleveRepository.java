package SAE._2.Repository;
import SAE._2.model.Eleve;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EleveRepository extends CrudRepository<Eleve, Long> {
	boolean existsByMail(String mail);
	boolean existsByIdentifiant(String identifiant);
	boolean existsByMailAndIdNot(String mail, Long id);
	boolean existsByIdentifiantAndIdNot(String identifiant, Long id);
}
