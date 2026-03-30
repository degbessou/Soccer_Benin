// src/pages/WatchPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../Functions/SupabaseClient";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from "../assets/Helpers";
import TitleBis from "../assets/TitleBis";
import BackButton from "../Components/ui/BackButton";

export default function WatchPage() {
    const { slug } = useParams();
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatch = async () => {
            const { data, error } = await supabase
                .from("live_matchs")
                .select("*")
                .eq("slug", slug)
                .single();

            if (!error) setMatch(data);
            setLoading(false);

            console.log(data);
        };

        fetchMatch();
    }, [slug]);

    if (loading) return (
        <>
            <Navbar />
            <p className="text-center text-gray-400 py-32">Chargement...</p>
            <Footer />
        </>
    );

    if (!match) return (
        <>
            <Navbar />
            <p className="text-center text-gray-400 py-32">Match introuvable.</p>
            <Footer />
        </>
    );

    return (
        <>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/mnt/nt_douze.jpg')} alt="équipe de damissa fc" />
            <TitleBis title="Regardez les matchs des équipes nationales en direct" />
            <div className="max-w-screen-lg mx-auto px-8 py-8">
                <BackButton to="/Live" label="Retour aux matchs" />
                <h1 className="text-gray-900 text-2xl font-bold mb-2">{match.title}</h1>
                <p className="text-gray-400 text-sm mb-6">{match.descr} | {match.heure}</p>
                {match.iframe ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                        <div
                            className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                            dangerouslySetInnerHTML={{ __html: match.iframe }}
                        />
                    </div>
                ) : (
                    <div className="w-full aspect-video rounded-xl bg-gray-100 flex items-center justify-center">
                        <p className="text-red-700 text-sm">⏳ Le match commence bientôt...</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}