import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import adminSysImg from '../../../assets/administration_sys.jpg';
import mathiasImg from '../../../assets/mathias.jpg';

const Linux = () => {
    const data = {
        title: "Administration Linux Expert",
        category: "Administration système",
        rating: 4.8,
        students: 850,
        price: "29.99€",
        description: "Maîtrisez la ligne de commande et l'administration des serveurs Linux (Debian/CentOS). Automatisez vos tâches avec Bash.",
        objectives: [
            "Installation et gestion des paquets",
            "Gestion des utilisateurs et permissions",
            "Systemd et gestion des services",
            "Scripting Bash avancé",
            "Sécurisation SSH et Firewall (UFW/IPTables)"
        ],
        modules: [
            { title: "Bases du Shell", duration: "2h", lessons: 10 },
            { title: "Administration Système", duration: "5h", lessons: 12 },
            { title: "Réseau et Sécurité", duration: "3h", lessons: 8 },
            { title: "Automatisation Bash", duration: "4h", lessons: 8 }
        ],
        totalHours: "25h",
        totalLessons: 38,
        image: adminSysImg,
        instructorName: "Mathias RAKOTOMAVO",
        instructorRole: "CTO & SysAdmin",
        instructorImg: mathiasImg,
        instructorStudents: "2000+",
        reviews: [
            { id: 1, user: "Karim B.", date: "Il y a 1 mois", rating: 4, comment: "Très dense mais complet." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default Linux;
