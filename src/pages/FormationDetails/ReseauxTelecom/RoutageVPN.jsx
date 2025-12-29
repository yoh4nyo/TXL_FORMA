import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import reseauImg from '../../../assets/reseau_telecom.jpg';
import yohanImg from '../../../assets/yohan.jpg';

const RoutageVPN = () => {
    const data = {
        title: "Routage Avancé & VPN",
        category: "Réseaux et télécoms",
        rating: 4.9,
        students: 350,
        price: "29.99€",
        description: "Devenez expert en routage dynamique (OSPF, BGP) et implémentez des tunnels VPN sécurisés (IPSec, SSL) pour les entreprises.",
        objectives: [
            "Protocoles de routage (OSPF, EIGRP, BGP)",
            "Redondance et Haute Dispo (HSRP/VRRP)",
            "VPN Site-à-Site (IPSec)",
            "VPN Client-to-Site (SSL/OpenVPN)",
            "Dépannage avancé"
        ],
        modules: [
            { title: "Routage Dynamique OSPF", duration: "4h", lessons: 8 },
            { title: "BGP pour Entreprises", duration: "3h", lessons: 6 },
            { title: "Théorie VPN & Cryptographie", duration: "2h", lessons: 4 },
            { title: "Implémentation IPSec", duration: "3h", lessons: 5 }
        ],
        totalHours: "20h",
        totalLessons: 23,
        image: reseauImg,
        instructorName: "Yohan SOM",
        instructorRole: "Expert Réseau & CEO",
        instructorImg: yohanImg,
        instructorStudents: "1200+",
        reviews: [
            { id: 1, user: "Sarah L.", date: "Il y a 3 jours", rating: 5, comment: "Le module VPN m'a sauvé pour mon projet pro." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default RoutageVPN;
