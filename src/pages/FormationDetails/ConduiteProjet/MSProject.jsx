import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import conduiteImg from '../../../assets/conduite_projet.jpg';
import yannisImg from '../../../assets/yannis.jpg';

const MSProject = () => {
    const data = {
        title: "MS Project Expert",
        category: "Conduite de projets",
        rating: 4.6,
        students: 120,
        price: "24.99€",
        description: "Planifiez et pilotez vos projets de A à Z avec Microsoft Project. Gagnez en visibilité et en maîtrise.",
        objectives: [
            "Paramétrage du projet (Calendriers, Tâches)",
            "Gestion des ressources et coûts",
            "Suivi l'avancement (Gantt, Chemin critique)",
            "Reporting et Tableaux de bord",
            "Gestion multi-projets"
        ],
        modules: [
            { title: "Initialisation Projet", duration: "2h", lessons: 5 },
            { title: "Planification Tâches", duration: "3h", lessons: 8 },
            { title: "Ressources et Coûts", duration: "3h", lessons: 6 },
            { title: "Suivi et Rapports", duration: "2h", lessons: 4 }
        ],
        totalHours: "10h",
        totalLessons: 23,
        image: conduiteImg,
        instructorName: "Yannis CAMELIN",
        instructorRole: "Expert PMO",
        instructorImg: yannisImg,
        instructorStudents: "1000+",
        reviews: [
            { id: 1, user: "ProjectManager", date: "Il y a 1 mois", rating: 4, comment: "Outil puissant bien expliqué." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default MSProject;
