import React from "react";
import StatList from "../../Components/StatList";

const playersData = [
  {
    id: 1,
    nom: "Steve Mounié",
    equipe: "FC Augsburg",
    numero: 9,
    position: "BU",
    passes_decisives: 4,
    buts: 12,
    avatar: "steeve_mounie.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 2,
    nom: "Andreas Hountondji",
    equipe: "Burnley",
    numero: 19,
    position: "BU",
    passes_decisives: 5,
    buts: 10,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 3,
    nom: "Jodel Dossou",
    equipe: "Bénin",
    numero: 20,
    position: "AiD",
    passes_decisives: 8,
    buts: 6,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 4,
    nom: "Junior Olaitan",
    equipe: "Troyes",
    numero: 10,
    position: "MO",
    passes_decisives: 7,
    buts: 5,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 5,
    nom: "Tosin Aiyegun",
    equipe: "Lorient",
    numero: 15,
    position: "BU",
    passes_decisives: 3,
    buts: 8,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 6,
    nom: "Imourane Hassane",
    equipe: "Lotto Popo",
    numero: 8,
    position: "MC",
    passes_decisives: 6,
    buts: 2,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 7,
    nom: "Dodo Dokou",
    equipe: "Smouha SC",
    numero: 6,
    position: "MDef",
    passes_decisives: 4,
    buts: 1,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 8,
    nom: "Yollande Gnanmi",
    equipe: "Bénin F",
    numero: 11,
    position: "BU",
    passes_decisives: 2,
    buts: 15,
    avatar: "yol_gnanmi.jpeg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 9,
    nom: "Cebio Soukou",
    equipe: "Bénin",
    numero: 7,
    position: "AiG",
    passes_decisives: 9,
    buts: 4,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 10,
    nom: "Mohamed Tidjani",
    equipe: "Yverdon",
    numero: 4,
    position: "DC",
    passes_decisives: 1,
    buts: 2,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
];

const Players = ({ title }) => {
  const config = [
    { label: "Buts", key: "buts" },
    { label: "Passes", key: "passes_decisives" },
  ];

  return (
    <StatList
      title={title}
      items={playersData}
      config={config}
      defaultTab="Buts"
    />
  );
};

export default Players;


