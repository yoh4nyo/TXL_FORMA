# 📄 Partie Théorique - Projet TXL FORMA

## 1. Présentation de l'équipe
Ce projet a été réalisé dans le cadre de la SAE 5.01 par l'équipe **TXL**, composée de :
*   **CAMELIN**
*   **SOM**
*   **RAKOTOMAVO**
*   **LOPERE**

---

## 2. Besoins du projet
L'objectif était de concevoir une plateforme de formation en ligne innovante répondant aux besoins de trois types d'utilisateurs distincts :

*   **L'Étudiant** : Il doit pouvoir consulter le catalogue de formations (avec filtrage), s'inscrire à des sessions, suivre sa progression via un Dashboard personnel, et obtenir ses certifications (PDF). L'expérience d'accueil doit être immersive (3D).
*   **Le Formateur** : Il nécessite un accès pour visualiser ses sessions affectées, consulter la liste des inscrits et valider la présence des élèves (émargement).
*   **L'Administrateur** : Il doit disposer d'un tableau de bord global pour piloter l'activité du centre de formation (statistiques) et gérer les ressources (CRUD Formations, Utilisateurs, Sessions).

---

## 3. Architecture fonctionnelle
L'application repose sur une architecture **Client-Serveur** découplée :

*   **Frontend (Interface Utilisateur)** : 
    *   Réalisé avec **React 19** et **Vite**.
    *   Intègre une scène 3D interactive via **Three.js** / **React Three Fiber**.
    *   Communique avec le serveur via des requêtes HTTP (REST).
*   **Backend (Logique Métier)** :
    *   API REST construite avec **Java Spring Boot**.
    *   Gère l'authentification, la logique métier et la sécurité.
*   **Base de Données** :
    *   **MySQL** pour le stockage relationnel des données.

![Architecture](architecture.png)

---

## 4. Diagramme de classes (UML)
Le modèle de données a été structuré pour gérer efficacement les relations complexes entre les formations, les sessions planifiées et les utilisateurs. Ci-dessous le diagramme de classes final :

![Diagramme UML](diagramme_final.png)
