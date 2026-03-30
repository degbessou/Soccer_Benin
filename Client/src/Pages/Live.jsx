// src/pages/Live.jsx
import { useEffect, useState } from "react";
import { supabase } from "../Functions/SupabaseClient";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from "../assets/Helpers";
import TitleBis from "../assets/TitleBis";
import MatchCard from "../Components/MatchCard";

export default function Live() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            const { data, error } = await supabase
                .from("live_matchs")
                .select("*")
                .order("created_at", { ascending: false });

            if (!error) setMatches(data);
            setLoading(false);

            console.log(data);
        };

        fetchMatches();
    }, []);

    return (
        <>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/mnt/nt_neuf.jpg')} alt="équipe de damissa fc" />
            <TitleBis title="Regardez les matchs des équipes nationales en direct" />
            <section >
                {loading ? (
                    <p className="text-center text-gray-400 py-16">Chargement...</p>
                ) : matches.length === 0 ? (
                    <p className="text-center text-gray-400 py-16">Aucun match disponible pour le moment.</p>
                ) : (
                    <ul className="flex flex-wrap justify-center gap-8 mt-16 max-w-screen-lg mx-auto px-4 md:px-8">
                        {matches.map((item) => (
                            <MatchCard
                                key={item.id}
                                img={item.img}
                                heure={item.heure}
                                title={item.title}
                                desc={item.descr}
                                date={item.date}
                                isLive={item.is_live}
                                slug={item.slug}
                                status={item.status}
                            />
                        ))}
                    </ul>
                )}
            </section>
            <Footer />
        </>
    );
}