import React from "react";
import StatList from "../../Components/StatList";

const goalkeepersData = [
  {
    id: 1,
    nom: "Saturnin Allagbé",
    equipe: "Bénin",
    numero: 1,
    position: "G",
    arrets: 52,
    clean_sheets: 1,
    avatar: "steeve_mounie.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 2,
    nom: "Marcel Dandjinou",
    equipe: "JDR Stars",
    numero: 16,
    position: "G",
    arrets: 48,
    clean_sheets: 12,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 3,
    nom: "Serge Obassa",
    equipe: "AS Cotonou",
    numero: 30,
    position: "G",
    arrets: 41,
    clean_sheets: 9,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 4,
    nom: "Rachad Adidjatou",
    equipe: "Espoir FC",
    numero: 1,
    position: "G",
    arrets: 35,
    clean_sheets: 8,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 5,
    nom: "Soukeïna Sanni",
    equipe: "Bénin F",
    numero: 1,
    position: "G",
    arrets: 30,
    clean_sheets: 7,
    avatar: "yol_gnanmi.jpeg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 6,
    nom: "Guillaume Agbégnon",
    equipe: "ASVO",
    numero: 16,
    position: "G",
    arrets: 28,
    clean_sheets: 6,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 7,
    nom: "Sheyi Damilola",
    equipe: "Ayéma FC",
    numero: 1,
    position: "G",
    arrets: 25,
    clean_sheets: 5,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 8,
    nom: "Abiola Katchon",
    equipe: "Dragons FC",
    numero: 1,
    position: "G",
    arrets: 22,
    clean_sheets: 4,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 9,
    nom: "Farouck Nouridine",
    equipe: "Béké FC",
    numero: 16,
    position: "G",
    arrets: 20,
    clean_sheets: 4,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 10,
    nom: "Cote d'Ivoire GK",
    equipe: "CIV",
    numero: 1,
    position: "G",
    arrets: 18,
    clean_sheets: 3,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
];

const Goalkeepers = ({ title }) => {
  const config = [
    { label: "Clean Sheets", key: "clean_sheets" },
    { label: "Arrêts", key: "arrets" },
  ];

  return (
    <StatList
      title={title}
      items={goalkeepersData}
      config={config}
      defaultTab="Clean Sheets"
    />
  );
};

export default Goalkeepers;



