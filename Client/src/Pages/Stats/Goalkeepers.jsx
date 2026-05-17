import React, { useState, useEffect } from "react";

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
  const [ongletActif, setOngletActif] = useState("Clean Sheets");
  const [gardienSelectionne, setGardienSelectionne] = useState(null);

  const getValeurStat = (goalkeeper) => {
    if (ongletActif === "Arrêts") return goalkeeper.arrets;
    if (ongletActif === "Clean Sheets") return goalkeeper.clean_sheets;
    return goalkeeper.arrets;
  };

  // trier par stat décroissante
  const goalkeeperTries = [...goalkeepersData].sort(
    (a, b) => getValeurStat(b) - getValeurStat(a),
  );

  useEffect(() => {
    setGardienSelectionne(null);
  }, [ongletActif]);

  const leaderAffiche = gardienSelectionne || goalkeeperTries[0];

  const onglets = ["Clean Sheets", "Arrêts"];

  return (
    <div className="overflow-hidden">
      <div className="pb-3">
        <h2 className="flex items-center text-black text-3xl font-bold tracking-tight">
          {title}
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
          <div className="flex items-center gap-2 font-semibold text-gray-600 text-lg mt-4">
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
          {goalkeeperTries.map((goalkeeper, index) => {
            const isSelected = leaderAffiche.id === goalkeeper.id;
            return (
              <div
                key={goalkeeper.id}
                onMouseEnter={() => setGardienSelectionne(goalkeeper)}
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
                    <span className="font-semibold">{goalkeeper.nom}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">
                    {getValeurStat(goalkeeper)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-6 py-4 text-right hidden">
        <a
          href="#"
          className="text-blue-500 text-lg font-semibold hover:underline"
        >
          Tous les {title}
        </a>
      </div>
    </div>
  );
};

export default Goalkeepers;
