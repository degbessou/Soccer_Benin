import React from "react";
import Players from "./Players";
import Goalkeepers from "./Goalkeepers";
import Cards from "./Cards";

const Statistics = ({
  playerTitle = "Joueurs",
  goalkeeperTitle = "Gardiens",
}) => {
  return (
    <div className="min-h-screen mb-20">
      <div className="w-full mx-auto space-y-8">
        <Players title={playerTitle} />
        <Goalkeepers title={goalkeeperTitle} />
        <Cards />
      </div>
    </div>
  );
};

export default Statistics;
