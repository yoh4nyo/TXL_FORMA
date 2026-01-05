package SAE._2.model;

import jakarta.persistence.*;
import jakarta.persistence.Id;

@Entity
public class Session_eleve {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String statut;
    private int note;
    private int diplome = 0;

    public Session_eleve(String statut, int note, int diplome) {
        this.statut = statut;
        this.note = note;
        this.diplome = diplome;
    }

    public Session_eleve() {
    }

    public Long getId() {
        return id;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public int getNote() {
        return note;
    }

    public void setNote(int note) {
        this.note = note;
    }

    public int getDiplome() {
        return diplome;
    }

    public void setDiplome(int diplome) {
        this.diplome = diplome;
    }

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
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties("session_eleves")
    private Session session;

    @ManyToOne
    @JoinColumn(name = "eleve_id")
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties("session_eleves")
    private Eleve eleve;

}
