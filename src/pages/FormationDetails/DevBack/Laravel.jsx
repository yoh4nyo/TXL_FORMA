import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import backEndImg from '../../../assets/back_end.png';
import mathiasImg from '../../../assets/mathias.jpg';

const Laravel = () => {
    const data = {
        title: "Laravel 10 : The PHP Framework",
        category: "Développement Back",
        rating: 4.9,
        students: 350,
        price: "29.99€",
        description: "Vitesse et élégance avec Laravel. Blade, Eloquent, Migrations et tout ce qui fait le charme de PHP moderne.",
        objectives: [
            "Routing et Middleware",
            "Eloquent ORM",
            "Système d'authentification (Breeze/Jetstream)",
            "API avec Sanctum",
            "Job Queues et Events"
        ],
        modules: [
            { title: "Bases Laravel", duration: "2h", lessons: 6 },
            { title: "Eloquent Avancé", duration: "3h", lessons: 8 },
            { title: "API Development", duration: "2h", lessons: 5 },
            { title: "Projet Blog", duration: "4h", lessons: 10 }
        ],
        totalHours: "18h",
        totalLessons: 30,
        image: backEndImg,
        instructorName: "Mathias RAKOTOMAVO",
        instructorRole: "CTO & Architecte",
        instructorImg: mathiasImg,
        instructorStudents: "2000+",
        reviews: [
            { id: 1, user: "Amine K.", date: "Il y a 2 jours", rating: 5, comment: "Laravel est tellement simple grâce à ce cours." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default Laravel;
