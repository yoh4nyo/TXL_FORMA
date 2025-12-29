import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import backEndImg from '../../../assets/back_end.png';
import mathiasImg from '../../../assets/mathias.jpg';

const SpringBoot = () => {
    const data = {
        title: "Spring Boot Pro",
        category: "Développement Back",
        rating: 4.7,
        students: 250,
        price: "29.99€",
        description: "L'écosystème Java pour le web. Spring Boot, Spring Security, Hibernate et Microservices.",
        objectives: [
            "Inversion de contrôle & Injection de dépendance",
            "Spring Data JPA",
            "Création d'API RESTful",
            "Securisation avec JWT",
            "Architecture Microservices"
        ],
        modules: [
            { title: "Spring Core", duration: "3h", lessons: 8 },
            { title: "Spring Data JPA", duration: "4h", lessons: 12 },
            { title: "Spring Security", duration: "5h", lessons: 15 },
            { title: "Microservices", duration: "4h", lessons: 10 }
        ],
        totalHours: "35h",
        totalLessons: 60,
        image: backEndImg,
        instructorName: "Mathias RAKOTOMAVO",
        instructorRole: "CTO & Architecte",
        instructorImg: mathiasImg,
        instructorStudents: "2000+",
        reviews: [
            { id: 1, user: "David G.", date: "Il y a 1 mois", rating: 5, comment: "Très complet sur la sécurité." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default SpringBoot;
