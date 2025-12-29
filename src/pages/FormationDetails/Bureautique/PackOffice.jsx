import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import bureautiqueImg from '../../../assets/bureautique.jpg';
import yannisImg from '../../../assets/yannis.jpg';

const PackOffice = () => {
    const data = {
        title: "Pack Office Expert",
        category: "Bureautique",
        rating: 4.5,
        students: 320,
        price: "19.99€",
        description: "Devenez un pro de la bureautique. Excel (TCD, formules), Word (mise en page pro) et PowerPoint (présentations impactantes).",
        objectives: [
            "Excel : Formules avancées et TCD",
            "Word : Documents longs et publipostage",
            "PowerPoint : Animations et transitions",
            "Outlook : Gestion du temps et des emails",
            "Collaborer avec OneDrive et Teams"
        ],
        modules: [
            { title: "Excel Avancé", duration: "10h", lessons: 20 },
            { title: "Word Expert", duration: "5h", lessons: 10 },
            { title: "PowerPoint Design", duration: "5h", lessons: 10 },
            { title: "Outils Collaboratifs", duration: "2h", lessons: 5 }
        ],
        totalHours: "22h",
        totalLessons: 45,
        image: bureautiqueImg,
        instructorName: "Yannis CAMELIN",
        instructorRole: "Formateur Bureautique",
        instructorImg: yannisImg,
        instructorStudents: "1000+",
        reviews: [
            { id: 1, user: "Martine R.", date: "Il y a 3 semaines", rating: 5, comment: "Je gagne un temps fou sur Excel maintenant." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default PackOffice;
