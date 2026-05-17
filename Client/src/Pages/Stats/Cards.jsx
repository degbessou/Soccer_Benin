import React, { useState, useEffect } from "react";

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
    cartons_rouges: 0,
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
    cartons_rouges: 0,
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
    cartons_rouges: 0,
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
    cartons_rouges: 0,
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
    cartons_rouges: 0,
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
    cartons_rouges: 0,
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
  const [ongletActif, setOngletActif] = useState("Cartons Jaunes");
  const [joueurSelectionne, setJoueurSelectionne] = useState(null);

  const getValeurStat = (player) => {
    if (ongletActif === "Cartons Jaunes") return player.cartons_jaunes;
    if (ongletActif === "Cartons Rouges") return player.cartons_rouges;
    return player.cartons_jaunes;
  };

  // trier par stat décroissante
  const playersTries = [...cardsData].sort(
    (a, b) => getValeurStat(b) - getValeurStat(a),
  );

  useEffect(() => {
    setJoueurSelectionne(null);
  }, [ongletActif]);

  const leaderAffiche = joueurSelectionne || playersTries[0];

  const onglets = ["Cartons Jaunes", "Cartons Rouges"];

  return (
    <div className="overflow-hidden">
      <div className="pb-3">
        <h2 className="flex items-center text-black text-3xl font-bold tracking-tight">
          Cartons
          <img src="chevron-right.svg" className="h-7 w-7 mt-2" alt="" />
        </h2>
      </div>

      <div className="flex border-b border-gray-300">
        {onglets.map((onglet) => (
          <button
            key={onglet}
            onClick={() => setOngletActif(onglet)}
            className={`px-10 py-3 text-md font-semibold transition-all duration-200 ${
              ongletActif === onglet
                ? "text-black border-b-5 border-black -mb-px font-bold"
                : "text-gray-600 hover:text-gray-200"
            }`}
          >
            {onglet}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-40 gap-5 mt-10 w-full">
        <div className="lg:w-full flex flex-col items-center text-center">
          <img
            src={leaderAffiche.avatar}
            alt={leaderAffiche.nom}
            className="h-40 w-40 object-cover rounded-full"
          />
          <h1 className="text-4xl font-bold mt-4">{leaderAffiche.nom}</h1>
          <div className="flex items-center gap-2 text-gray-600 font-semibold text-lg mt-4">
            <img
              src={leaderAffiche.teams_logo}
              alt={leaderAffiche.nom}
              className="h-7 w-7 object-cover"
            />
            <p>{leaderAffiche.equipe}</p>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div> #
            {leaderAffiche.numero}
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <p>{leaderAffiche.position}</p>
          </div>
          <div className="mt-8 pt-4 w-full">
            <h2 className="text-xl font-semibold text-gray-500 uppercase tracking-wide">
              {ongletActif}
            </h2>
            <span className="text-7xl font-extrabold text-gray-900 transition-all duration-300">
              {getValeurStat(leaderAffiche)}
            </span>
          </div>
        </div>

        <div className="lg:w-full">
          {playersTries.map((player, index) => {
            const isSelected = leaderAffiche.id === player.id;
            return (
              <div
                key={player.id}
                onMouseEnter={() => setJoueurSelectionne(player)}
                className={`flex justify-between items-center px-4 py-1 mb-2 w-full border border-gray-300 cursor-pointer transition-all duration-300 rounded-lg ${
                  isSelected
                    ? "bg-yellow-700 text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 text-sm font-bold ${isSelected ? "text-yellow-200" : "text-gray-400"}`}
                  >
                    {index + 1}.
                  </span>
                  <div>
                    <span className="font-semibold">{player.nom}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">
                    {getValeurStat(player)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="py-4 text-right hidden">
        <a
          href="#"
          className="text-blue-500 text-lg font-semibold hover:underline"
        >
          Tous les Cartons
        </a>
      </div>
    </div>
  );
};

export default Cards;
