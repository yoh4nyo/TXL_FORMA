package SAE._2.model;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

import java.time.LocalDate;

@Entity
public class Seance_eleve {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String statut;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String signature;
    private LocalDate inscription = LocalDate.now();

    public Seance_eleve(String statut, String signature, LocalDate inscription) {
        this.statut = statut;
        this.signature = signature;
        this.inscription = inscription;
    }

    public Seance_eleve() {}

    public Long getId() {return id;}

    public String getStatut() {return statut;}

    public void setStatut(String statut) {this.statut = statut;}

    public String getSignature() {return signature;}

    public void setSignature(String signature) {this.signature = signature;}

    public Eleve getEleve() {
        return eleve;
    }

    public void setEleve(Eleve eleve) {
        this.eleve = eleve;
    }

    public Seance getSeance() {
        return seance;
    }

    public void setSeance(Seance seance) {
        this.seance = seance;
    }

    public void setInscription(LocalDate inscription) {this.inscription = inscription;}

    public LocalDate getInscription() {return inscription;}


    @ManyToOne
    @JoinColumn(name = "seance_id")
    private Seance seance;

    @ManyToOne
    @JoinColumn(name = "eleve_id")
    private Eleve eleve;

}
