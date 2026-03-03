import projet1Jpg from "../assets/projet1.jpeg";
import projet1Png from "../assets/projet1.png";
import projet2 from "../assets/projet2.png";
import projet3 from "../assets/projet3.png";
import projet4 from "../assets/projet4.jpg";
import projet5 from "../assets/projet5.png";
export const PROJECTS = [
  {
    id: 1,
    title: "JobNearMe App",
    category: "Fullstack App",
    description:
      "Application mobile innovante de recherche d'emploi locale basée sur la géolocalisation. Elle vise à démocratiser l'accès à l'emploi en permettant aux candidats de postuler instantanément, sans exigence de CV ni de diplôme, favorisant ainsi l'insertion professionnelle rapide dans les services de proximité.",
    image: projet1Jpg,
    tech: [
      "React native",
      "ExpressJS",
      "NodeJS",
      "Expo",
      "PostgreSQL",
      "Docker",
      "CI/CD",
      "Sequelize",
    ],
    link: "https://github.com/Samir-ibourki/JobNearMe",
    caseStudyLink: "#",
  },
  {
    id: 2,
    title: "API CAN MAROC",
    category: "Backend",
    description:
      "A complete REST API for managing the Africa Cup of Nations (AFCON) 2025/2026 tournament.. ",
    image: projet1Png,
    tech: ["NodeJS", "ExpressJS", "PostgreSQL", "ORM", "Sequelize"],
    link: "https://github.com/ZakiaTaou/API-CANMAROC",
    caseStudyLink: "#",
  },
  {
    id: 3,
    title: "CasaTaxiSim",
    category: "Frontend",
    description:
      "A taxi booking simulator application for Casablanca (small red taxis) with an interactive map, ride simulation, and fare calculation based on real Casablanca rates.",
    image: projet2,
    tech: ["React Native", "Expo Router", "Expo", "Reanimated", "Zustand"],
    link: "https://github.com/Samir-ibourki/CasaTaxiSim",
    caseStudyLink: "#",
  },
  {
    id: 4,
    title: "Agadir TAsk Manager",
    category: "Fullstack App",
    description:
      "A mobile application that allows citizens and students to manage their daily personal tasks: administrative appointments, study sessions, national ID procedures, ANCFCC appointments, etc.",
    image: projet3,
    tech: ["React Native", "Expo Router", "Node.js", "Express", "PostgreSQL "],
    link: "https://github.com/Samir-ibourki/Agadir-Task-Manager",
    caseStudyLink: "#",
  },
  {
    id: 5,
    title: "Recipe Web + Dashboard",
    category: "Frontend",
    description:
      "Modern recipe platform with an intuitive dashboard for managing meals, categories, and users. Features dynamic filtering, admin controls, and real-time content updates for a seamless cooking experience.",
    image: projet4,
    tech: ["React.JS", "CSS", "TailwindCSS", "Zustand"],
    link: "https://github.com/Samir-ibourki/recipe-web",
    caseStudyLink: "#",
  },
  {
    id: 6,
    title: "Soiree Gnawa",
    category: "Fullstack App",
    description:
      "A complete mobile application for ‘La Grande Soirée Gnawa,’ a cultural event celebrating the Gnawa musical heritage in Agadir.",
    image: projet5,
    tech: ["React Native", "Expo Router", "Node.js", "Express", "PostgreSQL "],
    link: "https://github.com/Samir-ibourki/Gnawa_app",
    caseStudyLink: "#",
  },
];
