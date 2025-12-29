import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import frontEndImg from '../../../assets/front_end.png';
import alexandreImg from '../../../assets/alexandre.jpg';

const ReactCourses = () => {
    const data = {
        title: "React.js Moderne",
        category: "Développement Front",
        rating: 4.8,
        students: 900,
        price: "29.99€",
        description: "Apprenez React avec les Hooks, Context API et Redux Toolkit. Créez des interfaces utilisateurs dynamiques et performantes.",
        objectives: [
            "JSX et Composants fonctionnels",
            "Hooks (useState, useEffect, custom hooks)",
            "Gestion globale avec Context & Redux",
            "React Router v6",
            "Optimisation des performances"
        ],
        modules: [
            { title: "Fondamentaux React", duration: "3h", lessons: 10 },
            { title: "Hooks en profondeur", duration: "4h", lessons: 15 },
            { title: "Redux Toolkit", duration: "3h", lessons: 8 },
            { title: "Projet E-commerce", duration: "5h", lessons: 20 }
        ],
        totalHours: "28h",
        totalLessons: 53,
        image: frontEndImg,
        instructorName: "Alexandre LOPERE",
        instructorRole: "Lead Front-End",
        instructorImg: alexandreImg,
        instructorStudents: "1500+",
        reviews: [
            { id: 1, user: "Marc P.", date: "Hier", rating: 5, comment: "Top formation React." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default ReactCourses;
