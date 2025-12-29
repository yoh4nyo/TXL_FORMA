import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import frontEndImg from '../../../assets/front_end.png';
import alexandreImg from '../../../assets/alexandre.jpg';

const Vue = () => {
    const data = {
        title: "Vue.js 3 complet",
        category: "Développement Front",
        rating: 4.8,
        students: 400,
        price: "29.99€",
        description: "Découvrez la simplicité et la puissance de Vue.js 3. Composition API, Vue Router, Pinia : tout l'écosystème moderne.",
        objectives: [
            "Options API vs Composition API",
            "Directives Vue",
            "Routing avec Vue Router",
            "State Management avec Pinia",
            "Tests unitaires"
        ],
        modules: [
            { title: "Introduction Vue 3", duration: "2h", lessons: 6 },
            { title: "Composition API", duration: "3h", lessons: 10 },
            { title: "Pinia Store", duration: "2h", lessons: 5 },
            { title: "App complèt", duration: "4h", lessons: 12 }
        ],
        totalHours: "15h",
        totalLessons: 33,
        image: frontEndImg,
        instructorName: "Alexandre LOPERE",
        instructorRole: "Lead Front-End",
        instructorImg: alexandreImg,
        instructorStudents: "1500+",
        reviews: [
            { id: 1, user: "Lucas M.", date: "Il y a 10 jours", rating: 5, comment: "Pinia est super bien expliqué." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default Vue;
