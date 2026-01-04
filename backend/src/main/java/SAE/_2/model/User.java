package SAE._2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String identifiant;
    private String password;
    private String role;

    public User(String identifiant, String password, String role) {
        this.identifiant = identifiant;
        this.password = password;
        this.role = role;
    }

    public User() {}

    public Long getId() {return id;}

    public String getIdentifiant() {return identifiant;}

    public void setIdentifiant(String identifiant) {this.identifiant = identifiant;}

    public String getPassword() {return password;}

    public void setPassword(String password) {this.password = password;}

    public String getRole() {return role;}

    public void setRole(String role) {this.role = role;}
}
