package SAE._2.Repository;
import SAE._2.model.Paiement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface PaiementRepository extends CrudRepository<Paiement, Long> {

        @Query("SELECT SUM(p.montant) FROM Paiement p")
        Double sumTotalRevenue();
}

