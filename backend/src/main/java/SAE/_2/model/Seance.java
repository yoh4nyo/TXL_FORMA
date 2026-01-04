package SAE._2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Id;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Seance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String horaire;
    private String date;
    private int duree;

    public Seance(String horaire, String date, int duree) {
        this.horaire = horaire;
        this.date = date;
        this.duree = duree;
    }

    public Seance() {}

    public Long getId() {
        return id;
    }

    public String getHoraire() {
        return horaire;
    }

    public String getDate() {
        return date;
    }

    public void setHoraire(String horaire) {
        this.horaire = horaire;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getDuree() {return duree;}

    public void setDuree(int duree) {this.duree = duree;}

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "seance")
    @JsonIgnore
    private Set<Seance_eleve> seance_eleves = new HashSet();

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session;
}