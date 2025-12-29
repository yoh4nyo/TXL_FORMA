import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import cyberImg from '../../../assets/cyber.jpg';
import yohanImg from '../../../assets/yohan.jpg';

const AttaquesDefense = () => {
    const data = {
        title: "Cybersécurité : Attaques & Défense",
        category: "Cybersécurité",
        rating: 4.9,
        students: 200,
        price: "39.99€",
        description: "Plongez dans le monde du Red Team et Blue Team. Apprenez comment les hackers opèrent pour mieux vous défendre.",
        objectives: [
            "Méthodologie d'attaque (Cyber Kill Chain)",
            "Reconnaissance et Scan (Nmap, Wireshark)",
            "Exploitation de vulnérabilités (Metasploit)",
            "Détection d'intrusions (IDS/IPS)",
            "Sécurisation et Hardening"
        ],
        modules: [
            { title: "Fondamentaux Sécu", duration: "3h", lessons: 6 },
            { title: "Outils de Pentest", duration: "5h", lessons: 10 },
            { title: "Défense en profondeur", duration: "4h", lessons: 8 },
            { title: "Analyse Forensique", duration: "3h", lessons: 6 }
        ],
        totalHours: "20h",
        totalLessons: 30,
        image: cyberImg,
        instructorName: "Yohan SOM",
        instructorRole: "Expert Cyber & CEO",
        instructorImg: yohanImg,
        instructorStudents: "1200+",
        reviews: [
            { id: 1, user: "Hacker77", date: "Il y a 2 semaines", rating: 5, comment: "Super labos pratiques." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default AttaquesDefense;
