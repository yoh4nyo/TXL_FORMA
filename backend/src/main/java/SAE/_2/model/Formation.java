package SAE._2.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nom;
    private String description;
    private int prix;
    private String categorie;
    
    @ElementCollection
    @CollectionTable(name = "formation_apprentissages", joinColumns = @JoinColumn(name = "formation_id"))
    @Column(name = "apprentissage")
    private List<String> apprentissages;

    public Formation() {}

    public Formation(String nom, String description, int prix, String categorie, List<String> apprentissages) {
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.categorie = categorie;
        this.apprentissages = apprentissages;
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getDescription() {
        return description;
    }

    public int getPrix() {
        return prix;
    }

    public String getCategorie() {
        return categorie;
    }

    public List<String> getApprentissages() {
        return apprentissages;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrix(int prix) {
        this.prix = prix;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public void setApprentissages(List<String> apprentissages) {
        this.apprentissages = apprentissages;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "formation")
    private Set<Session> sessions = new HashSet();
}
