package SAE._2.model;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int montant;
    private LocalDate date = LocalDate.now();
    private String numCarte;

    public Paiement(int montant, LocalDate date, String numCarte) {
        this.montant = montant;
        this.date = date;
        this.numCarte = numCarte;
    }

    public Paiement() {
    }
    public Long getId() {return id;}

    public int getMontant() {return montant;}

    public void setMontant(int montant) {this.montant = montant;}

    public LocalDate getDate() {return date;}

    public void setDate(LocalDate date) {this.date = date;}

    public String getNumCarte() {return numCarte;}

    public void setNumCarte(String numCarte) {this.numCarte = numCarte;}

    public Eleve getEleve() {
        return eleve;
    }

    public void setEleve(Eleve eleve) {
        this.eleve = eleve;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session;

    @ManyToOne
    @JoinColumn(name = "eleve_id")
    private Eleve eleve;
}