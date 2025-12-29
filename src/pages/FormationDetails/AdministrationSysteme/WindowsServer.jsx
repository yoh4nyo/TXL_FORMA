import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import adminSysImg from '../../../assets/administration_sys.jpg';
import yannisImg from '../../../assets/yannis.jpg';

const WindowsServer = () => {
    const data = {
        title: "Windows Server 2022",
        category: "Administration système",
        rating: 4.7,
        students: 420,
        price: "29.99€",
        description: "Installez, configurez et gérez des infrastructures Windows Server. Active Directory, GPO, DNS, DHCP n'auront plus de secrets pour vous.",
        objectives: [
            "Installation Windows Server 2022",
            "Déploiement Active Directory (AD DS)",
            "Gestion des GPO",
            "Services d'infrastructure (DNS, DHCP)",
            "Gestion des fichiers et impression"
        ],
        modules: [
            { title: "Installation et AD", duration: "3h", lessons: 6 },
            { title: "DNS et DHCP", duration: "2h", lessons: 5 },
            { title: "Stratégies de Groupe (GPO)", duration: "4h", lessons: 10 },
            { title: "Maintenance et Sauvegarde", duration: "2h", lessons: 4 }
        ],
        totalHours: "18h",
        totalLessons: 25,
        image: adminSysImg,
        instructorName: "Yannis CAMELIN",
        instructorRole: "Formateur Infrastructure",
        instructorImg: yannisImg,
        instructorStudents: "800+",
        reviews: [
            { id: 1, user: "Paul M.", date: "Il y a 2 semaines", rating: 5, comment: "Le module GPO est top." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default WindowsServer;
