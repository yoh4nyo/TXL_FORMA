package SAE._2.Repository;
import SAE._2.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'ROLE_ELEVE'")
    Long countTotalUsers();

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'ROLE_INTERVENANT'")
    Long countTotalFormateurs();
}