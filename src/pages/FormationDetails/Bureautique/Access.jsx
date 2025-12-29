import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import bureautiqueImg from '../../../assets/bureautique.jpg';
import yannisImg from '../../../assets/yannis.jpg';

const Access = () => {
    const data = {
        title: "Microsoft Access BDD",
        category: "Bureautique",
        rating: 4.5,
        students: 150,
        price: "19.99€",
        description: "Créez et gérez vos propres bases de données sans coder. Tables, formulaires, requêtes et états.",
        objectives: [
            "Conception de base de données (MCD/MLD)",
            "Création de tables et relations",
            "Formulaires de saisies",
            "Requêtes SQL et graphiques",
            "États et impression"
        ],
        modules: [
            { title: "Conception BDD", duration: "3h", lessons: 6 },
            { title: "Tables et Relations", duration: "4h", lessons: 8 },
            { title: "Requêtes et Formulaires", duration: "5h", lessons: 10 },
            { title: "Macros et VBA", duration: "3h", lessons: 6 }
        ],
        totalHours: "15h",
        totalLessons: 30,
        image: bureautiqueImg,
        instructorName: "Yannis CAMELIN",
        instructorRole: "Formateur Bureautique",
        instructorImg: yannisImg,
        instructorStudents: "1000+",
        reviews: [
            { id: 1, user: "Jean-Pierre L.", date: "Il y a 1 mois", rating: 4, comment: "Très utile pour ma gestion de stock." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default Access;
