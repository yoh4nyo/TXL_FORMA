import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import reseauImg from '../../../assets/reseau_telecom.jpg';
import yohanImg from '../../../assets/yohan.jpg';

const VLAN = () => {
    const data = {
        title: "VLAN",
        category: "Réseaux et télécoms",
        rating: 4.8,
        students: 500,
        price: "29.99€",
        description: "Maîtrisez la segmentation réseau avec les VLANs. Optimisez la sécurité, la performance et la gestion de votre réseau local.",
        objectives: [
            "Concepts fondamentaux des VLANs (802.1Q)",
            "Configuration sur switchs Cisco",
            "VLAN Trunking Protocol (VTP)",
            "Inter-VLAN Routing (Router-on-a-stick, L3 Switch)",
            "Sécurisation des VLANs"
        ],
        modules: [
            { title: "Introduction et Théorie", duration: "1h 30min", lessons: 3 },
            { title: "Configuration Switch", duration: "2h", lessons: 5 },
            { title: "Routage Inter-VLAN", duration: "3h", lessons: 6 },
            { title: "Dépannage et Sécurité", duration: "2h", lessons: 4 }
        ],
        totalHours: "15h",
        totalLessons: 18,
        image: reseauImg,
        instructorName: "Yohan SOM",
        instructorRole: "Expert Réseau & CEO",
        instructorImg: yohanImg,
        instructorStudents: "1200+",
        reviews: [
            { id: 1, user: "Thomas D.", date: "Il y a 1 semaine", rating: 5, comment: "Super explication du concept de trunking." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default VLAN;
