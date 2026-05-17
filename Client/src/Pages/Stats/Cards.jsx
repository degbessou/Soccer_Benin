import React from "react";
import StatList from "../../Components/StatList";

const cardsData = [
  {
    id: 1,
    nom: "Steve Mounié",
    equipe: "FC Augsburg",
    numero: 9,
    position: "BU",
    cartons_jaunes: 4,
    cartons_rouges: 1,
    avatar: "steeve_mounie.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 2,
    nom: "Andreas Hountondji",
    equipe: "Burnley",
    numero: 19,
    position: "BU",
    cartons_jaunes: 5,
    cartons_rouges: 2,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 3,
    nom: "Jodel Dossou",
    equipe: "Bénin",
    numero: 20,
    position: "AiD",
    cartons_jaunes: 8,
    cartons_rouges: 1,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 4,
    nom: "Junior Olaitan",
    equipe: "Troyes",
    numero: 10,
    position: "MO",
    cartons_jaunes: 7,
    cartons_rouges: 1,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 5,
    nom: "Tosin Aiyegun",
    equipe: "Lorient",
    numero: 15,
    position: "BU",
    cartons_jaunes: 3,
    cartons_rouges: 2,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 6,
    nom: "Imourane Hassane",
    equipe: "Lotto Popo",
    numero: 8,
    position: "MC",
    cartons_jaunes: 6,
    cartons_rouges: 4,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 7,
    nom: "Dodo Dokou",
    equipe: "Smouha SC",
    numero: 6,
    position: "MDef",
    cartons_jaunes: 4,
    cartons_rouges: 1,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 8,
    nom: "Yollande Gnanmi",
    equipe: "Bénin F",
    numero: 11,
    position: "BU",
    cartons_jaunes: 2,
    cartons_rouges: 2,
    avatar: "yol_gnanmi.jpeg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 9,
    nom: "Cebio Soukou",
    equipe: "Bénin",
    numero: 7,
    position: "AiG",
    cartons_jaunes: 9,
    cartons_rouges: 1,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
  {
    id: 10,
    nom: "Mohamed Tidjani",
    equipe: "Yverdon",
    numero: 4,
    position: "DC",
    cartons_jaunes: 1,
    cartons_rouges: 3,
    avatar: "A_Hountondji.jpg",
    teams_logo: "benin_fbf_logo.png",
  },
];

const Cards = () => {
  const config = [
    { label: "Cartons Jaunes", key: "cartons_jaunes" },
    { label: "Cartons Rouges", key: "cartons_rouges" },
  ];

  return (
    <StatList
      title="Cartons"
      items={cardsData}
      config={config}
      defaultTab="Cartons Jaunes"
    />
  );
};

export default Cards;

