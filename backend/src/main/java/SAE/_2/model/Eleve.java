package SAE._2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Eleve extends User{

    private String nom;
    private String prenom;
    private String adresse;
    private String mail;
    private LocalDate inscription = LocalDate.now();
    private int nbAbsence;

    public Eleve(String nom, String prenom, String mail, int nbAbsence, LocalDate inscription, String identifiant, String password, String role, String adresse) {
        super(identifiant, password, role);
        this.nom =nom;
        this.prenom =prenom;
        this.mail=mail;
        this.nbAbsence=nbAbsence;
        this.inscription=inscription;

        this.adresse = adresse;
    }

    public Eleve() {}

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getMail() {
        return mail;
    }

    public int getNbAbsence() {
        return nbAbsence;
    }

    public LocalDate getInscription() {return inscription;}

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setNbAbsence(int nbAbsence) {
        this.nbAbsence = nbAbsence;
    }

    public void setInscription(LocalDate inscription) {this.inscription = inscription;}

    public String getAdresse() {return adresse;}

    public void setAdresse(String adresse) {this.adresse = adresse;}

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "eleve", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Seance_eleve> seance_eleves = new HashSet();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "eleve", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Session_eleve> session_eleves = new HashSet();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "eleve", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
    private Set<Paiement> paiements = new HashSet();
}


