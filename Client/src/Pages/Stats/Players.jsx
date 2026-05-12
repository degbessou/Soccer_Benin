import React, { useState } from "react";

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

const Players = () => {
  const [ongletActif, setOngletActif] = useState("Passes");

  const getValeurStat = (player) => {
    if (ongletActif === "Passes") return player.passes_decisives;
    if (ongletActif === "Buts") return player.buts;
    return player.passes_decisives;
  };

  // trier par stat décroissante
  const playersTries = [...playersData].sort(
    (a, b) => getValeurStat(b) - getValeurStat(a),
  );

  const leader = playersTries[0];

  const onglets = ["Passes", "Buts"];

  return (
    <div className="overflow-hidden">
      <div className="pb-3">
        <h2 className="flex items-center text-black text-3xl font-bold tracking-tight">
          Joueurs{" "}
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
            src={leader.avatar}
            alt={leader.nom}
            className="h-40 w-40 object-cover rounded-full"
          />
          <h1 className="text-4xl font-bold mt-4">{leader.nom}</h1>
          <div className="flex items-center gap-2 text-gray-600 font-semibold text-lg mt-4">
            <img
              src={leader.teams_logo}
              alt={leader.nom}
              className="h-7 w-7 object-cover"
            />
            <p>{leader.equipe}</p>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div> #
            {leader.numero}
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <p>{leader.position}</p>
          </div>
          <div className="mt-8 pt-4 w-full">
            <h2 className="text-xl font-semibold text-gray-500 uppercase tracking-wide">
              {ongletActif}
            </h2>
            <span className="text-7xl font-extrabold text-gray-900">
              {getValeurStat(leader)}
            </span>
          </div>
        </div>
        <div className="lg:w-full">
          {playersTries.map((player, index) => (
            <div
              key={player.id}
              className="flex justify-between items-center px-3 py-1 mb-2 w-100 bg-white border border-gray-300 hover:bg-yellow-700 hover:text-white transition-colors duration-500 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 text-sm">{index + 1}.</span>
                <div>
                  <span className="font-medium">{player.nom}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="">{getValeurStat(player)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-4 text-right">
        <a
          href="#"
          className="text-blue-500 text-lg font-semibold hover:underline"
        >
          Tous les Joueurs
        </a>
      </div>
    </div>
  );
};

export default Players;
