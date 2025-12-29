import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import frontEndImg from '../../../assets/front_end.png';
import alexandreImg from '../../../assets/alexandre.jpg';

const Angular = () => {
    const data = {
        title: "Angular 17 : De Zéro à Héros",
        category: "Développement Front",
        rating: 4.9,
        students: 600,
        price: "29.99€",
        description: "Maîtrisez le framework Angular de Google. TypeScript, composants standalone, RxJS, signaux... Tout pour créer des apps d'entreprise.",
        objectives: [
            "Architecture Component-Based",
            "TypeScript avancé",
            "RxJS et programmation réactive",
            "Gestion d'état (Signals, NGRX)",
            "Routing et Lazy Loading"
        ],
        modules: [
            { title: "Bases d'Angular", duration: "2h", lessons: 8 },
            { title: "Composants & Templates", duration: "4h", lessons: 12 },
            { title: "Services & DI", duration: "2h", lessons: 6 },
            { title: "Routing Avancé", duration: "3h", lessons: 7 }
        ],
        totalHours: "30h",
        totalLessons: 45,
        image: frontEndImg,
        instructorName: "Alexandre LOPERE",
        instructorRole: "Lead Front-End",
        instructorImg: alexandreImg,
        instructorStudents: "1500+",
        reviews: [
            { id: 1, user: "Julie A.", date: "Il y a 5 jours", rating: 5, comment: "Explication claire de RxJS !" }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default Angular;
