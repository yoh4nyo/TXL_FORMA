package SAE._2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Id;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String date_start;
    private String date_end;
    private String nbPlace;
    private String nbPlaceRestant;

    public Session(String dateStart, String dateEnd, String nbPlace) {
        this.date_start = dateStart;
        this.date_end = dateEnd;
        this.nbPlace = nbPlace;
        this.nbPlaceRestant = nbPlace;
    }

    public Session() {
    }

    public Long getId() {
        return id;
    }

    public String getDate_start() {
        return date_start;
    }

    public String getDate_end() {
        return date_end;
    }

    public String getNbPlace() {
        return nbPlace;
    }

    public void setDate_start(String date_start) {
        this.date_start = date_start;
    }

    public void setDate_end(String date_end) {
        this.date_end = date_end;
    }

    public void setNbPlace(String nbPlace) {
        this.nbPlace = nbPlace;
    }

    public String getNbPlaceRestant() {
        return nbPlaceRestant;
    }

    public void setNbPlaceRestant(String nbPlaceRestant) {
        this.nbPlaceRestant = nbPlaceRestant;
    }

    public Intervenant getIntervenant() {
        return intervenant;
    }

    public void setIntervenant(Intervenant intervenant) {
        this.intervenant = intervenant;
    }

    public Formation getFormation() {
        return formation;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public Set<Session_eleve> getSession_eleves() {
        return session_eleves;
    }

    public void setSession_eleves(Set<Session_eleve> session_eleves) {
        this.session_eleves = session_eleves;
    }

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "session", cascade = CascadeType.REMOVE)
    private Set<Seance> seances = new HashSet();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "session", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<Session_eleve> session_eleves = new HashSet();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "session", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<Paiement> Paiements = new HashSet();

    @ManyToOne
    @JoinColumn(name = "intervenant_id")
    private Intervenant intervenant;

    @ManyToOne
    @JoinColumn(name = "formation_id")
    private Formation formation;

}