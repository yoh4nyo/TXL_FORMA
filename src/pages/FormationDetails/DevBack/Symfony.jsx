import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import backEndImg from '../../../assets/back_end.png';
import mathiasImg from '../../../assets/mathias.jpg';

const Symfony = () => {
    const data = {
        title: "Symfony 7 : Expert Backend",
        category: "Développement Back",
        rating: 5.0,
        students: 300,
        price: "29.99€",
        description: "Développez des applications robustes avec Symfony. API Platform, Doctrine, Twig et Sécurité avancée.",
        objectives: [
            "Architecture MVC",
            "Doctrine ORM & Base de données",
            "API Platform",
            "Sécurité et Authentification",
            "Tests automatisés"
        ],
        modules: [
            { title: "Démarrage Symfony", duration: "2h", lessons: 5 },
            { title: "Doctrine & BDD", duration: "4h", lessons: 10 },
            { title: "API Platform", duration: "3h", lessons: 8 },
            { title: "Sécurité", duration: "2h", lessons: 6 }
        ],
        totalHours: "25h",
        totalLessons: 40,
        image: backEndImg,
        instructorName: "Mathias RAKOTOMAVO",
        instructorRole: "CTO & Architecte",
        instructorImg: mathiasImg,
        instructorStudents: "2000+",
        reviews: [
            { id: 1, user: "Sophie T.", date: "Il y a 3 semaines", rating: 5, comment: "Le meilleur cours Symfony." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default Symfony;
