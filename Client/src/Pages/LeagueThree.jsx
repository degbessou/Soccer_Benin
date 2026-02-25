// pages/LeagueThree.jsx
import { useRef, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Tabs, { TabsList, TabContent } from "../Components/Tabs";
import PouleTabs, { PouleContent } from "../Components/PouleTabs";
import Schedule from "../Components/Schedule";
import Standing from "../Components/Standing";
import { supabase } from "../Functions/SupabaseClient";
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from '../assets/Helpers';
import TitleBis from "../assets/TitleBis";
import StandingPool from "../Components/StandingPool";
import SchedulePoolCapture from "../Components/SchedulePoolCapture";
import DownloadButton from "../assets/DownloadButton";
import CaptureOverlay from "../assets/CaptureOverlay";

export default function LeagueThree() {

    const tabItems = [
        { value: "calendrier", label: "CALENDRIER" },
        { value: "classement", label: "CLASSEMENT" }
    ];

    const poules = [
        { value: "A", label: "Poule A" },
        { value: "B", label: "Poule B" }
    ];

    // ─── État pour les matchs des 2 poules (pour la capture) ───────────────────
    const [matchesPouleA, setMatchesPouleA] = useState([]);
    const [matchesPouleB, setMatchesPouleB] = useState([]);
    const [selectedJourneeA, setSelectedJourneeA] = useState(null);
    const [selectedJourneeB, setSelectedJourneeB] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);

    // Ref pour le composant de capture
    const captureRef = useRef(null);

    // ─── Fetches centralisés pour avoir les données dispo pour la capture ───────
    // Note: on garde aussi les fetches dans <Schedule> pour son propre affichage.
    // Ici on fetch séparément pour alimenter SchedulePoolCapture.

    const processMatchStatuses = (data) => {
        const now = new Date();
        return data.map(match => {
            if (match.statut === 'postponed') return match;
            if (match.buts_domicile !== null && match.buts_exterieur !== null) {
                return { ...match, statut: 'finished' };
            }

            const matchesSameJournee = data.filter(m =>
                m.numero === match.numero && m.statut !== 'postponed'
            );
            const datesJournee = matchesSameJournee.map(m => new Date(m.date_match));
            const minDate = new Date(Math.min(...datesJournee));
            const maxDate = new Date(Math.max(...datesJournee));
            const journeeStart = new Date(minDate); journeeStart.setHours(0, 0, 0, 0);
            const journeeEnd = new Date(maxDate); journeeEnd.setHours(23, 59, 59, 999);

            if (now >= journeeStart && now <= journeeEnd) return { ...match, statut: 'live' };
            if (now < journeeStart) return { ...match, statut: 'upcoming' };
            return { ...match, statut: 'pending' };
        });
    };

    const getCurrentJournee = (matchesData) => {
        const now = new Date();
        const journeesUniques = [...new Set(matchesData.map(m => m.numero))].sort((a, b) => a - b);
        for (let journee of journeesUniques) {
            const matchsJournee = matchesData.filter(m => m.numero === journee);
            const datesJournee = matchsJournee.map(m => new Date(m.date_match));
            const maxDate = new Date(Math.max(...datesJournee));
            maxDate.setDate(maxDate.getDate() + 2);
            if (now <= maxDate) return journee;
        }
        return journeesUniques[journeesUniques.length - 1] || 1;
    };

    useEffect(() => {
        const fetchAll = async () => {
            const [{ data: dataA }, { data: dataB }] = await Promise.all([
                supabase.from("matchs_poule").select("*")
                    .eq("nom_saison", "Saison 2025-2026")
                    .eq("ligue", "Ligue 3").eq("poule", "A")
                    .order("numero", { ascending: true })
                    .order("date_match", { ascending: true }),
                supabase.from("matchs_poule").select("*")
                    .eq("nom_saison", "Saison 2025-2026")
                    .eq("ligue", "Ligue 3").eq("poule", "B")
                    .order("numero", { ascending: true })
                    .order("date_match", { ascending: true }),
            ]);

            if (dataA) {
                const processed = processMatchStatuses(dataA);
                setMatchesPouleA(processed);
                setSelectedJourneeA(getCurrentJournee(processed));
            }
            if (dataB) {
                const processed = processMatchStatuses(dataB);
                setMatchesPouleB(processed);
                setSelectedJourneeB(getCurrentJournee(processed));
            }
        };
        fetchAll();
    }, []);

    // ─── Matchs filtrés pour la capture (journée courante de chaque poule) ──────
    // On affiche la journée "courante" de chaque poule dans l'image.
    // Vous pouvez adapter cette logique selon vos besoins (ex: journée sélectionnée).
    const captureMatchesA = selectedJourneeA
        ? matchesPouleA.filter(m => m.numero === selectedJourneeA)
        : matchesPouleA.slice(0, 6);

    const captureMatchesB = selectedJourneeB
        ? matchesPouleB.filter(m => m.numero === selectedJourneeB)
        : matchesPouleB.slice(0, 6);

    const filtersInfo = selectedJourneeA
        ? `Journée ${selectedJourneeA}${selectedJourneeA !== selectedJourneeB ? ` (A) / Journée ${selectedJourneeB} (B)` : ''}`
        : '';

    // ─── Fetches pour les composants Schedule (inchangés) ───────────────────────
    const fetchMatchesByPoule = (poule) => async () => {
        const { data } = await supabase
            .from("matchs_poule").select("*")
            .eq("nom_saison", "Saison 2025-2026")
            .eq("ligue", "Ligue 3").eq("poule", poule)
            .order("numero", { ascending: true })
            .order("date_match", { ascending: true });
        return data;
    };

    const fetchStandingByPoule = (poule) => async () => {
        const { data } = await supabase
            .from("std_v_lig_three_men").select("*")
            .eq("nom_saison", "Saison 2025-2026").eq("poule", poule)
            .order("position", { ascending: true });
        return data;
    };

    return (
        <>
            <Navbar />
            <CaptureOverlay isCapturing={isCapturing} />
            <HeroStatiq src={getSupabaseImageUrl('medias/banner/sobemap_un.jpg')} alt="banner" />
            <TitleBis title="Tout savoir sur la Ligue Amateur, 2025-2026" />

            <Tabs defaultTab="calendrier">
                <TabsList items={tabItems} />

                <TabContent value="calendrier">
                    {/* Bouton de téléchargement pour les 2 poules */}
                    <div className="max-w-screen-lg mx-auto px-4 md:px-8 pt-6 flex justify-end">
                        <DownloadButton
                            refToCapture={captureRef}
                            filename="calendrier-ligue3-poules.png"
                            label="Télécharger les 2 poules"
                            onCapturing={setIsCapturing}
                        />
                    </div>

                    <PouleTabs poules={poules} defaultPoule="A">
                        {poules.map(poule => (
                            <PouleContent key={poule.value} value={poule.value}>
                                <Schedule
                                    supabaseQuery={fetchMatchesByPoule(poule.value)}
                                    totalJournees={7}
                                    showPhaseFilter={true}
                                    showTeamFilter={true}
                                    logoUrl={getSupabaseImageUrl('medias/icons/logo_no.png')}
                                    title={`Ligue 3 / Poule ${poule.value}`}
                                    subtitle="www.bencofoot.com"
                                />
                            </PouleContent>
                        ))}
                    </PouleTabs>

                    {/* Composant de capture caché — reçoit les matchs des 2 poules */}
                    <SchedulePoolCapture
                        ref={captureRef}
                        logoUrl={getSupabaseImageUrl('medias/icons/logo_no.png')}
                        title="Ligue 3 / 2025-2026"
                        subtitle="www.bencofoot.com"
                        filtersInfo={filtersInfo}
                        pouleAMatches={captureMatchesA}
                        pouleBMatches={captureMatchesB}
                        pouleALabel="A"
                        pouleBLabel="B"
                        pouleAJournee={selectedJourneeA}
                        pouleBJournee={selectedJourneeB}
                    />
                </TabContent>

                <TabContent value="classement">
                    <PouleTabs poules={poules} defaultPoule="A">
                        {poules.map(poule => (
                            <PouleContent key={poule.value} value={poule.value}>
                                <StandingPool
                                    title={`Classement - Poule ${poule.value}`}
                                    supabaseQuery={fetchStandingByPoule(poule.value)}
                                    caption_green="Promu en Ligue 2"
                                    caption_red="Relégation en division départementale"
                                />
                            </PouleContent>
                        ))}
                    </PouleTabs>
                </TabContent>
            </Tabs>

            <Footer />
        </>
    );
}