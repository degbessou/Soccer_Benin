import React, { useState, useEffect } from "react";
import Players from "./Players";
import Goalkeepers from "./Goalkeepers";

const Statistics = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simuler un temps de chargement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-700"></div>
          <p className="mt-4 text-gray-500 font-medium animate-pulse">
            Chargement des statistiques...
          </p>
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="w-full mx-auto space-y-8">
            <Players />
            <Goalkeepers />
          </div>
        </div>
      )}
    </>
  );
};

export default Statistics;
