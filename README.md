# Description du dépôt

*   **Le lien du site** : [txl-forma.vercel.app](https://txl-forma.vercel.app)
*   **Le lien Figma** : <a href="https://www.figma.com/design/brMxnpRyxYbKdUEg7ScYlm/SAE_501?node-id=0-1&t=wwLwyr7fAHJVvndl-1" target="_blank">Maquettes & Prototypage</a>
*   **L'API** : [Voir le dossier Backend](backend/)
*   **La BDD SQL** : MySQL (Configurée dans le backend Spring Boot)
*   **Les diagrammes** : [Voir les schémas techniques](#schémas-techniques) (MCD, UML, Architecture)

> ⚠️ **ATTENTION : LE MODÈLE 3D SUR LA PAGE D'ACCUEIL PEUT METTRE DU TEMPS À CHARGER. MERCI DE PATIENTER QUELQUES SECONDES.**

### Identifiants pour tests

> Pour tester les différents rôles sur le site :

| Rôle | Identifiant | Mot de passe |
| :--- | :--- | :--- |
| **Admin** | `admin` | `1234` |
| **Formateur** | `la.patrick` | `1234` |
| **Étudiant** | `yohan` | `azerty` |

---

## Stack technique

### Frontend
*   **Framework** : [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **UI/UX** : [Bootstrap 5](https://getbootstrap.com/), [React-Bootstrap](https://react-bootstrap.github.io/), CSS3 custom properties.
*   **3D & Interactif** : [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei).
*   **Utilitaires** :
    *   `react-router-dom` pour le routing.
    *   `jspdf` pour la génération de diplômes.
    *   `font-awesome` pour les icônes.
    *   **Stripe** pour la gestion sécurisée des paiements.

### Backend
*   **Langage** : Java 21
*   **Framework** : Spring Boot
*   **Base de données** : MySQL
*   **Architecture** : REST API, JPA/Hibernate.

### Hébergement & déploiement
*   **Frontend** : [Vercel](https://vercel.com)
*   **Backend & base de données** : [Railway](https://railway.app)

---

## Documentation & rendus

### Documents de conception
*   [**Cahier des charges (CDC)**](autres_rendus/CDC_SAE501_CAMELIN_SOM_RAKOTOMAVO_LOPERE.pdf)
*   [**Dossier de cadrage**](autres_rendus/SAE501_Cadrage_CAMELIN_SOM_LOPERE_RAKOTOMAVO.pdf)
*   [**Fichier source 3D (.blend)**](autres%20rendus/SCENECLASSE.blend)

### Schémas techniques
![Schémas](autres%20rendus/schemas.png)
> [Voir les schémas techniques en détail (PDF/Image)](autres%20rendus/schemas.png)

### Maquette figma
![Maquette Figma](autres%20rendus/figma.png)
> [Accéder au projet Figma complet](https://www.figma.com/design/brMxnpRyxYbKdUEg7ScYlm/SAE_501?node-id=0-1&t=wwLwyr7fAHJVvndl-1)

---

## 🛠 Installation locale

Si vous souhaitez lancer le projet sur votre machine :

### 1. Cloner le dépôt
```bash
git clone https://github.com/yoh4nyo/TXL_FORMA.git
cd TXL_FORMA
```

### 2. Installation des dépendances (Frontend)
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
> ⚠️ **Note Importante** : Cette commande lance uniquement le **Frontend**.
> Pour que le site soit fonctionnel (connexion, données), vous devez également lancer le **Backend Spring Boot** et avoir une base de données **MySQL** configurée.

---

## Auteurs

Projet réalisé par :
*   **CAMELIN**
*   **SOM**
*   **RAKOTOMAVO**
*   **LOPERE**

---
