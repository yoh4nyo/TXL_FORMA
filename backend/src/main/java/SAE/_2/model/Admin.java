package SAE._2.model;

import jakarta.persistence.Entity;

@Entity
public class Admin extends User {

    public Admin(String identifiant, String password, String role) {
        super(identifiant, password, role);
    }

    public Admin() {}



}