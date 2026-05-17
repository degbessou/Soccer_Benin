import React, { useState, useEffect } from "react";

/**
 * Composant générique pour afficher des listes de statistiques (Joueurs, Gardiens et Cartons)
 *
 * @param {string} title
 * @param {Array} items
 * @param {Array} config
 * @param {string} defaultTab
 */
const StatList = ({ title, items, config, defaultTab }) => {
  const [ongletActif, setOngletActif] = useState(defaultTab || config[0].label);
  const [itemSelectionne, setItemSelectionne] = useState(null);

  const activeConfig = config.find((c) => c.label === ongletActif) || config[0];
  const statKey = activeConfig.key;

  const getValeurStat = (item) => item[statKey];

  // trier les éléments par statistique décroissante
  const itemsTries = [...items].sort(
    (a, b) => getValeurStat(b) - getValeurStat(a),
  );

  useEffect(() => {
    setItemSelectionne(null);
  }, [ongletActif]);

  const leaderAffiche = itemSelectionne || itemsTries[0];

  return (
    <div className="overflow-hidden">
      <div className="pb-3">
        <h2 className="flex items-center text-black text-3xl font-bold tracking-tight">
          {title}
          <img src="chevron-right.svg" className="h-7 w-7 mt-2" alt="" />
        </h2>
      </div>

      <div className="flex border-b border-gray-300">
        {config.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setOngletActif(tab.label)}
            className={`px-10 py-3 text-md font-semibold transition-all duration-200 cursor-pointer ${
              ongletActif === tab.label
                ? "text-black border-b-5 border-black -mb-px font-bold"
                : "text-gray-600 hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-40 gap-5 mt-10 w-full">
        <div className="lg:w-full flex flex-col items-center text-center">
          <img
            src={leaderAffiche.avatar}
            alt={leaderAffiche.nom}
            className="h-40 w-40 object-cover rounded-full shadow-lg"
          />
          <h1 className="text-4xl font-bold mt-4">{leaderAffiche.nom}</h1>
          <div className="flex items-center gap-2 text-gray-600 font-semibold text-lg mt-4">
            <img
              src={leaderAffiche.teams_logo}
              alt={leaderAffiche.equipe}
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
          {itemsTries.map((item, index) => {
            const isSelected = leaderAffiche.id === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setItemSelectionne(item)}
                className={`flex justify-between items-center px-4 py-1 mb-2 w-full border border-gray-300 cursor-pointer transition-all duration-300 rounded-lg ${
                  isSelected
                    ? "bg-yellow-700 text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 text-sm font-bold ${
                      isSelected ? "text-yellow-200" : "text-gray-400"
                    }`}
                  >
                    {index + 1}.
                  </span>
                  <div>
                    <span className="font-semibold">{item.nom}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">
                    {getValeurStat(item)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatList;
