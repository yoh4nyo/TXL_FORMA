package SAE._2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.util.HashSet;
import java.util.Set;


@Entity
public class Intervenant extends User{

    private String nom;
    private String prenom;
    private String mail;
    private String metier;
    private int nbSeance;
    private int nbHeure;

    public Intervenant(String nom, String prenom, String mail, String metier, int nbSeance, int nbHeure, String identifiant, String password, String role) {
        super(identifiant, password, role);
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.metier = metier;
        this.nbSeance = nbSeance;
        this.nbHeure = nbHeure;
    }

    public Intervenant() {}

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getMail() {
        return mail;
    }

    public String getMetier() {
        return metier;
    }

    public int getNbSeance() {
        return nbSeance;
    }

    public int getNbHeure() {return nbHeure;}

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setMetier(String metier) {
        this.metier = metier;
    }

    public void setNbSeance(int nbSeance) {
        this.nbSeance = nbSeance;
    }

    public void setNbHeure(int nbHeure) {this.nbHeure = nbHeure;}

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "intervenant")
    private Set<Session> sessions = new HashSet();
}
