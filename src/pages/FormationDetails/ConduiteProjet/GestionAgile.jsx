import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import conduiteImg from '../../../assets/conduite_projet.jpg';
import yannisImg from '../../../assets/yannis.jpg';

const GestionAgile = () => {
    const data = {
        title: "Gestion de Projet AGILE (Scrum)",
        category: "Conduite de projets",
        rating: 4.7,
        students: 300,
        price: "24.99€",
        description: "Adoptez l'agilité pour vos projets. Maîtrisez le framework Scrum, les rôles (PO, Scrum Master) et les cérémonies.",
        objectives: [
            "Manifeste Agile et principes",
            "Framework Scrum (Rôles, Artefacts, Events)",
            "Gestion du Backlog et User Stories",
            "Estimation (Planning Poker)",
            "Outils (Jira, Trello)"
        ],
        modules: [
            { title: "Mindset Agile", duration: "2h", lessons: 4 },
            { title: "Scrum Framework", duration: "4h", lessons: 8 },
            { title: "Backlog Management", duration: "3h", lessons: 6 },
            { title: "Ateliers et Retrospectives", duration: "2h", lessons: 5 }
        ],
        totalHours: "12h",
        totalLessons: 23,
        image: conduiteImg,
        instructorName: "Yannis CAMELIN",
        instructorRole: "Coach Agile",
        instructorImg: yannisImg,
        instructorStudents: "1000+",
        reviews: [
            { id: 1, user: "ScrumMasterWannabe", date: "Il y a 10 jours", rating: 5, comment: "Clair et précis." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default GestionAgile;
