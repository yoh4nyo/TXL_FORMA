import React from 'react';
import FormationDetailTemplate from '../../../components/FormationDetails/FormationDetailTemplate';
import cyberImg from '../../../assets/cyber.jpg';
import yohanImg from '../../../assets/yohan.jpg';

const SecuriteWeb = () => {
    const data = {
        title: "Sécurité Web & OWASP Top 10",
        category: "Cybersécurité",
        rating: 4.9,
        students: 180,
        price: "34.99€",
        description: "Sécurisez vos applications web. Comprendre, détecter et corriger les failles critiques (SQLi, XSS, CSRF...).",
        objectives: [
            "Comprendre l'OWASP Top 10",
            "Injections SQL (SQLi)",
            "Cross-Site Scripting (XSS)",
            "Utilisation de Burp Suite",
            "Secure Coding Practices"
        ],
        modules: [
            { title: "OWASP Top 10", duration: "3h", lessons: 10 },
            { title: "Injections", duration: "4h", lessons: 8 },
            { title: "Authentification & Session", duration: "3h", lessons: 6 },
            { title: "Audit de code", duration: "2h", lessons: 4 }
        ],
        totalHours: "15h",
        totalLessons: 28,
        image: cyberImg,
        instructorName: "Yohan SOM",
        instructorRole: "Expert Cyber & CEO",
        instructorImg: yohanImg,
        instructorStudents: "1200+",
        reviews: [
            { id: 1, user: "DevSecOps", date: "Hier", rating: 5, comment: "Indispensable pour tout dev web." }
        ]
    };

    return <FormationDetailTemplate formation={data} />;
};

export default SecuriteWeb;
