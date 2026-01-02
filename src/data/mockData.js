import { faBook, faAward, faCoins, faUsers, faShoppingCart, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';


export const userProfile = {
    firstName: 'Yohan',
    lastName: 'SOM',
    email: 'yohan.som@gmail.com',
    displayEmail: 'yohan.som77@gmail.com',
    phone: '+33 7 85 56 23 45',
    address: '17 rue des coliberts, 77185 Lognes',
    memberSince: '2 décembre 2021',
    stats: {
        formations: 3,
        certificates: 1,
        hours: '500h',
    },
    image: 'https://placehold.co/150x150/e0e0e0/333333?text=YS',
};

export const adminStats = [
    {
        id: 1,
        label: "Nombre de formations",
        value: "1.189",
        icon: faBook,
        color: "#0E5555"
    },
    {
        id: 2,
        label: "Certificats délivrés",
        value: "500",
        icon: faAward,
        color: "#0E5555"
    },
    {
        id: 3,
        label: "Argent généré",
        value: "1 000 000€",
        icon: faCoins,
        color: "#0E5555"
    },
    {
        id: 4,
        label: "Total utilisateur",
        value: "1.189",
        icon: faUsers,
        color: "#0E5555"
    },
    {
        id: 5,
        label: "Nombre de formations vendues",
        value: "500",
        icon: faShoppingCart,
        color: "#0E5555"
    },
    {
        id: 6,
        label: "Nombre de formateurs",
        value: "500",
        icon: faChalkboardTeacher,
        color: "#0E5555"
    }
];

export const homeFeatures = [
    {
        num: 1,
        title: "Trouvez votre formation",
        desc: "Utilisez notre catalogue pour trouver la formation qui correspond à vos objectifs professionnels."
    },
    {
        num: 2,
        title: "Inscription simplifiée",
        desc: "Un formulaire rapide avec une validation immédiate, vous êtes prêt à rejoindre la salle. De notre côté on en fait plus rien."
    },
    {
        num: 3,
        title: "Formation en présentiel",
        desc: "Retrouvez-vous dans nos salles équipées avec le groupe convivial dans les meilleures conditions d'apprentissage."
    },
    {
        num: 4,
        title: "Objectif atteint !",
        desc: "Profitez de vos nouvelles compétences acquises et d'une attestation qui permet de les valoriser dans votre domaine."
    }
];

export const homeFormations = [
    {
        id: 1,
        image: "/assets/reseau_telecom.jpg",
        title: "Réseau et télécoms : VLAN",
        badge: "Best-seller",
        badgeColor: "primary",
        category: "Réseaux et télécoms",
        price: "315€"
    },
    {
        id: 2,
        image: "/assets/administration_sys.jpg",
        title: "Administration système : Linux",
        badge: "Très demandé",
        badgeColor: "purple",
        category: "Administration système",
        price: "290€"
    },
    {
        id: 3,
        image: "/assets/front_end.png",
        title: "Développement Front : Angular",
        badge: "Best-seller",
        badgeColor: "primary",
        category: "Développement Front",
        price: "230€"
    }
];

export const activeFormations = [
    {
        id: 1,
        title: 'VLAN',
        category: 'Réseaux et Internet',
        supervisor: 'M. RAKOTOMAVO',
        progress: 33,
        inscrit: '24/09/2005',
        lastCourse: 'il y a 5 jours',
        image: 'https://img.freepik.com/free-photo/network-technician-working-server-room_1098-18182.jpg',
        status: 'En cours',
    },
    {
        id: 2,
        title: 'VLAN',
        category: 'Réseaux et Internet',
        supervisor: 'M. RAKOTOMAVO',
        progress: 59,
        inscrit: '24/09/2000',
        lastCourse: 'il y a 5 jours',
        image: 'https://img.freepik.com/free-photo/network-technician-working-server-room_1098-18182.jpg',
        status: 'En cours',
    },
];

export const completedFormations = [
    {
        id: 3,
        title: 'VLAN',
        category: 'Réseaux et Internet',
        supervisor: 'M. RAKOTOMAVO',
        progress: 100,
        inscrit: '24/09/2000',
        lastCourse: 'il y a 5 jours',
        image: 'https://img.freepik.com/free-photo/network-technician-working-server-room_1098-18182.jpg',
        status: 'Terminée',
    },
];

export const userCertificates = [
    { id: 1, title: 'React et Typescript', type: 'Développement web', date: '30 octobre 2024', ref: 'CERT-2024', formateur: 'Yohan Som', color: '#F7DF1E' },
    { id: 2, title: 'VLAN', type: 'Réseau et télécom', date: '26 octobre 2025', ref: 'CERT-2025', formateur: 'Yanis Camelin', color: '#E34F26' },
    { id: 3, title: 'React et Typescript', type: 'Développement web', date: '30 octobre 2024', ref: 'CERT-2024', formateur: 'Yohan Som', color: '#F7DF1E' },
    { id: 4, title: 'React et Typescript', type: 'Développement web', date: '30 octobre 2024', ref: 'CERT-2024', formateur: 'Yohan Som', color: '#F7DF1E' },
];

export const adminFormationsList = [
    {
        id: 145,
        name: 'VLAN #145',
        sessions: 8,
        seances: 30,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€'
    },
    {
        id: 146,
        name: 'VLAN',
        sessions: 5,
        seances: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€'
    },
    {
        id: 147,
        name: 'VLAN',
        sessions: 5,
        seances: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€'
    },
    {
        id: 148,
        name: 'VLAN',
        sessions: 5,
        seances: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€'
    },
    {
        id: 149,
        name: 'VLAN',
        sessions: 5,
        seances: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€'
    },
    {
        id: 150,
        name: 'VLAN',
        sessions: 5,
        seances: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€'
    },
    {
        id: 151,
        name: 'VLAN',
        sessions: 5,
        seances: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€'
    }
];

export const adminFormationSessions = [
    {
        id: 1,
        name: 'Session 1',
        seances: 10,
        totalPlaces: 50,
        remainingPlaces: 3,
        startDate: '12/12/25',
        endDate: '22/12/25'
    },
    {
        id: 2,
        name: 'Session 2',
        seances: 10,
        totalPlaces: 50,
        remainingPlaces: 3,
        startDate: '12/12/25',
        endDate: '22/12/25'
    },
    {
        id: 3,
        name: 'Session 3',
        seances: 10,
        totalPlaces: 50,
        remainingPlaces: 3,
        startDate: '12/12/25',
        endDate: '22/12/25'
    },
    {
        id: 4,
        name: 'Session 4',
        seances: 10,
        totalPlaces: 50,
        remainingPlaces: 3,
        startDate: '12/12/25',
        endDate: '22/12/25'
    },
    {
        id: 5,
        name: 'Session 5',
        seances: 10,
        totalPlaces: 50,
        remainingPlaces: 3,
        startDate: '12/12/25',
        endDate: '22/12/25'
    },
    {
        id: 6,
        name: 'Session 6',
        seances: 10,
        totalPlaces: 50,
        remainingPlaces: 3,
        startDate: '12/12/25',
        endDate: '22/12/25'
    },
    {
        id: 7,
        name: 'Session 7',
        seances: 10,
        totalPlaces: 50,
        remainingPlaces: 3,
        startDate: '12/12/25',
        endDate: '22/12/25'
    },
    {
        id: 8,
        name: 'Session 8',
        seances: 10,
        totalPlaces: 50,
        remainingPlaces: 3,
        startDate: '12/12/25',
        endDate: '22/12/25'
    }
];

export const adminFormationSeances = [
    {
        id: 1,
        name: 'Séance 1',
        date: '12/12/2025',
        totalPlaces: 50,
        remainingPlaces: 3,
        startTime: '9:00',
        endTime: '11:00'
    },
    {
        id: 2,
        name: 'Séance 2',
        date: '12/12/2025',
        totalPlaces: 50,
        remainingPlaces: 3,
        startTime: '9:00',
        endTime: '11:00'
    },
    {
        id: 3,
        name: 'Séance 3',
        date: '12/12/2025',
        totalPlaces: 50,
        remainingPlaces: 3,
        startTime: '9:00',
        endTime: '11:00'
    },
    {
        id: 4,
        name: 'Séance 4',
        date: '12/12/2025',
        totalPlaces: 50,
        remainingPlaces: 3,
        startTime: '9:00',
        endTime: '11:00'
    },
    {
        id: 5,
        name: 'Séance 5',
        date: '12/12/2025',
        totalPlaces: 50,
        remainingPlaces: 3,
        startTime: '9:00',
        endTime: '11:00'
    },
    {
        id: 6,
        name: 'Séance 1',
        date: '12/12/2025',
        totalPlaces: 50,
        remainingPlaces: 3,
        startTime: '9:00',
        endTime: '11:00'
    },
    {
        id: 7,
        name: 'Séance 7',
        date: '12/12/2025',
        totalPlaces: 50,
        remainingPlaces: 3,
        startTime: '9:00',
        endTime: '11:00'
    },
    {
        id: 8,
        name: 'Séance 8',
        date: '12/12/2025',
        totalPlaces: 50,
        remainingPlaces: 3,
        startTime: '9:00',
        endTime: '11:00'
    },
    {
        id: 9,
        name: 'Séance 9',
        date: '12/12/2025',
        totalPlaces: 50,
        remainingPlaces: 3,
        startTime: '9:00',
        endTime: '11:00'
    }
];

export const adminSeanceParticipants = [
    {
        id: 1,
        lastName: 'SOM',
        firstName: 'Yohan',
        note: 15,
        presence: true
    },
    {
        id: 2,
        lastName: 'SOM',
        firstName: 'Yohan',
        note: 15,
        presence: true
    },
    {
        id: 3,
        lastName: 'SOM',
        firstName: 'Yohan',
        note: 15,
        presence: true
    },
    {
        id: 4,
        lastName: 'SOM',
        firstName: 'Yohan',
        note: 15,
        presence: true
    },
    {
        id: 5,
        lastName: 'SOM',
        firstName: 'Yohan',
        note: 15,
        presence: true
    },
    {
        id: 6,
        lastName: 'SOM',
        firstName: 'Yohan',
        note: 15,
        presence: true
    }

];

export const adminUsers = [
    {
        id: 1,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        certificationsCount: 2,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 2,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        certificationsCount: 12,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 3,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        certificationsCount: 2,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 4,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        certificationsCount: 2,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 5,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        certificationsCount: 2,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 6,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        certificationsCount: 2,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 7,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        certificationsCount: 2,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 8,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        certificationsCount: 2,
        inscriptionDate: '15 avril 2025'
    }

];

export const adminFormateurs = [
    {
        id: 1,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 2,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 3,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 4,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 5,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 6,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 7,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        inscriptionDate: '15 avril 2025'
    },
    {
        id: 8,
        lastName: 'Candidats n1',
        email: 'yohanSom@gmail.com',
        formationsCount: 7,
        inscriptionDate: '15 avril 2025'
    }
];

export const formateurFormations = [
    {
        id: 1,
        name: 'VLAN #145',
        sessionsCount: 8,
        seancesCount: 30,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€',
        status: 'active'
    },
    {
        id: 2,
        name: 'VLAN',
        sessionsCount: 5,
        seancesCount: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€',
        status: 'active'
    },
    {
        id: 3,
        name: 'VLAN',
        sessionsCount: 5,
        seancesCount: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€',
        status: 'active'
    },
    {
        id: 4,
        name: 'VLAN',
        sessionsCount: 5,
        seancesCount: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€',
        status: 'active'
    },
    {
        id: 5,
        name: 'VLAN',
        sessionsCount: 5,
        seancesCount: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€',
        status: 'active'
    },
    {
        id: 6,
        name: 'VLAN',
        sessionsCount: 5,
        seancesCount: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€',
        status: 'active'
    },
    {
        id: 7,
        name: 'VLAN',
        sessionsCount: 5,
        seancesCount: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€',
        status: 'active'
    },
    {
        id: 8,
        name: 'VLAN',
        sessionsCount: 5,
        seancesCount: 10,
        startDate: '12/12/25',
        endDate: '22/12/25',
        price: '29€',
        status: 'active'
    }
];

export const allCourses = [
    {
        id: 1,
        title: "VLAN",
        category: "Réseaux et télécoms",
        description: "Gérer itérativement le cycle de vie d'une solution VLAN, de sa conception à son déploiement.",
        students: "100 étudiants",
        rating: "4.8",
        duration: "130 Heures",
        schedule: "3 Mois",
        price: "29,99€",
        instructor: "Yohan SOM",
        role: "Formateur CEO DE TXL FORMA",
        image: "/assets/reseau_telecom.jpg",
        instructorImg: "/assets/yohan.jpg",
        path: "/formations/reseaux-telecoms/vlan"
    },
    {
        id: 2,
        title: "Symfony",
        category: "Développement Back",
        description: "Maîtrisez Symfony pour créer des projets web performants et robustes.",
        students: "24 étudiants",
        rating: "5.0",
        duration: "60 Heures",
        schedule: "2 Mois",
        price: "29,99€",
        instructor: "Mathias RAKOTOMAVO",
        role: "Formateur CTO DE TXL FORMA",
        image: "/assets/back_end.png",
        instructorImg: "/assets/mathias.jpg",
        path: "/formations/developpement-back/symfony"
    },
    {
        id: 3,
        title: "Angular",
        category: "Développement Front",
        description: "Apprenez à créer des applications web modernes et réactives avec Angular.",
        students: "87 étudiants",
        rating: "4.7",
        duration: "170 Heures",
        schedule: "2 Mois",
        price: "29,99€",
        instructor: "Alexandre LOPERE",
        role: "Formateur CACAO DE TXL FORMA",
        image: "/assets/front_end.png",
        instructorImg: "/assets/alexandre.jpg",
        path: "/formations/developpement-front/angular"
    },
    {
        id: 4,
        title: "Windows server",
        category: "Administration système",
        description: "Administrez et sécurisez des environnements Windows Server en entreprise.",
        students: "87 étudiants",
        rating: "4.7",
        duration: "130 Heures",
        schedule: "3 Mois",
        price: "29,99€",
        instructor: "Yannis CAMELIN",
        role: "Formateur CFA DE TXL FORMA",
        image: "/assets/administration_sys.jpg",
        instructorImg: "/assets/yannis.jpg",
        path: "/formations/administration-systeme/windows-server"
    },
    {
        id: 5,
        title: "Réseaux : Routage & VPN",
        category: "Réseaux et télécoms",
        description: "Maîtrisez le routage avancé et la sécurisation des interconnexions via VPN.",
        students: "65 étudiants",
        rating: "4.9",
        duration: "90 Heures",
        schedule: "2 Mois",
        price: "29,99€",
        instructor: "Yohan SOM",
        role: "Formateur CEO DE TXL FORMA",
        image: "/assets/reseau_telecom.jpg",
        instructorImg: "/assets/yohan.jpg",
        path: "/formations/reseaux-telecoms/routage-vpn"
    },
    {
        id: 6,
        title: "Linux Administration",
        category: "Administration système",
        description: "Devenez expert en administration système Linux et scripting bash.",
        students: "110 étudiants",
        rating: "4.8",
        duration: "120 Heures",
        schedule: "3 Mois",
        price: "29,99€",
        instructor: "Mathias RAKOTOMAVO",
        role: "Formateur CTO DE TXL FORMA",
        image: "/assets/administration_sys.jpg",
        instructorImg: "/assets/mathias.jpg",
        path: "/formations/administration-systeme/linux"
    },
    {
        id: 7,
        title: "React JS",
        category: "Développement Front",
        description: "Créez des interfaces utilisateurs dynamiques et performantes avec React.",
        students: "150 étudiants",
        rating: "4.9",
        duration: "100 Heures",
        schedule: "2 Mois",
        price: "29,99€",
        instructor: "Alexandre LOPERE",
        role: "Formateur CACAO DE TXL FORMA",
        image: "/assets/front_end.png",
        instructorImg: "/assets/alexandre.jpg",
        path: "/formations/developpement-front/react"
    },
    {
        id: 8,
        title: "Spring Boot",
        category: "Développement Back",
        description: "Développez des API REST robustes et scalables avec Java Spring Boot.",
        students: "45 étudiants",
        rating: "4.6",
        duration: "140 Heures",
        schedule: "3 Mois",
        price: "29,99€",
        instructor: "Mathias RAKOTOMAVO",
        role: "Formateur CTO DE TXL FORMA",
        image: "/assets/back_end.png",
        instructorImg: "/assets/mathias.jpg",
        path: "/formations/developpement-back/spring-boot"
    },
    {
        id: 9,
        title: "Pack Office Expert",
        category: "Bureautique",
        description: "Maitrisez Excel, Word et PowerPoint pour booster votre productivité au quotidien.",
        students: "320 étudiants",
        rating: "4.5",
        duration: "40 Heures",
        schedule: "1 Mois",
        price: "19,99€",
        instructor: "Yannis CAMELIN",
        role: "Formateur CFA DE TXL FORMA",
        image: "/assets/bureautique.jpg",
        instructorImg: "/assets/yannis.jpg",
        path: "/formations/bureautique/pack-office"
    },
    {
        id: 10,
        title: "Cybersécurité : Attaques & Défense",
        category: "Cybersécurité",
        description: "Comprendre les vecteurs d'attaques (IPS, IDS) et sécuriser les applications Web.",
        students: "95 étudiants",
        rating: "4.9",
        duration: "150 Heures",
        schedule: "3 Mois",
        price: "39,99€",
        instructor: "Yohan SOM",
        role: "Formateur CEO DE TXL FORMA",
        image: cyberImg,
        instructorImg: yohanImg,
        path: "/formations/cybersecurite/attaques-defense"
    },
    {
        id: 11,
        title: "Gestion de projet Agile",
        category: "Conduite de projets",
        description: "Pilotez vos projets avec efficacité en utilisant Jira, Trello et MS Project.",
        students: "70 étudiants",
        rating: "4.7",
        duration: "50 Heures",
        schedule: "1.5 Mois",
        price: "24,99€",
        instructor: "Yannis CAMELIN",
        role: "Formateur CFA DE TXL FORMA",
        image: conduiteImg,
        instructorImg: yannisImg,
        path: "/formations/conduite-projets/gestion-agile"
    },
    {
        id: 12,
        title: "Vue.js Mastery",
        category: "Développement Front",
        description: "Créez des applications SPA légères et réactives avec le framework Vue.js.",
        students: "90 étudiants",
        rating: "4.8",
        duration: "80 Heures",
        schedule: "2 Mois",
        price: "29,99€",
        instructor: "Alexandre LOPERE",
        role: "Formateur CACAO DE TXL FORMA",
        image: frontEndImg,
        instructorImg: alexandreImg,
        path: "/formations/developpement-front/vue"
    },
    {
        id: 13,
        title: "Laravel PHP",
        category: "Développement Back",
        description: "Concevez des applications web élégantes et performantes avec Laravel.",
        students: "105 étudiants",
        rating: "4.9",
        duration: "110 Heures",
        schedule: "3 Mois",
        price: "29,99€",
        instructor: "Mathias RAKOTOMAVO",
        role: "Formateur CTO DE TXL FORMA",
        image: backEndImg,
        instructorImg: mathiasImg,
        path: "/formations/developpement-back/laravel"
    },
    {
        id: 14,
        title: "Sécurité Web & OWASP",
        category: "Cybersécurité",
        description: "Apprenez à auditer et sécuriser vos applications contre les failles Web (Top 10 OWASP).",
        students: "60 étudiants",
        rating: "4.9",
        duration: "100 Heures",
        schedule: "2 Mois",
        price: "34,99€",
        instructor: "Yohan SOM",
        role: "Formateur CEO DE TXL FORMA",
        image: cyberImg,
        instructorImg: yohanImg,
        path: "/formations/cybersecurite/securite-web"
    },
    {
        id: 15,
        title: "MS Project Avancé",
        category: "Conduite de projets",
        description: "Planifiez, suivez et contrôlez vos projets complexes avec Microsoft Project.",
        students: "55 étudiants",
        rating: "4.6",
        duration: "40 Heures",
        schedule: "1 Mois",
        price: "24,99€",
        instructor: "Yannis CAMELIN",
        role: "Formateur CFA DE TXL FORMA",
        image: conduiteImg,
        instructorImg: yannisImg,
        path: "/formations/conduite-projets/ms-project"
    },
    {
        id: 16,
        title: "Access Base de Données",
        category: "Bureautique",
        description: "Concevez et gérez des bases de données relationnelles avec Microsoft Access.",
        students: "40 étudiants",
        rating: "4.5",
        duration: "35 Heures",
        schedule: "3 Semaines",
        price: "19,99€",
        instructor: "Yannis CAMELIN",
        role: "Formateur CFA DE TXL FORMA",
        image: bureautiqueImg,
        instructorImg: yannisImg,
        path: "/formations/bureautique/access"
    }
];

export const bookingSessions = [
    {
        id: 1,
        startDate: "15 décembre 2025",
        endDate: "15 janvier 2025",
        location: "Salle 212",
        totalHours: "120h",
        spotsLeft: 20,
        schedule: [
            { day: "Lundi", time: "9h00 - 12h00" },
            { day: "Vendredi", time: "17h00 - 19h00" },
            { day: "Mercredi", time: "14h00 - 17h00" }
        ]
    },
    {
        id: 2,
        startDate: "15 février 2025",
        endDate: "15 mars 2025",
        location: "Salle 140",
        totalHours: "120h",
        spotsLeft: 3,
        schedule: [
            { day: "Mardi", time: "9h00 - 12h00" },
            { day: "Mercredi", time: "17h00 - 19h00" },
            { day: "Jeudi", time: "14h00 - 17h00" }
        ]
    }
];
