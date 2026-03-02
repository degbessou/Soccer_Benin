// pages/LeagueThree.jsx
import { useRef, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Tabs, { TabsList, TabContent } from "../Components/Tabs";
import PouleTabs, { PouleContent } from "../Components/PouleTabs";
import Schedule from "../Components/Schedule";
import { supabase } from "../Functions/SupabaseClient";
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from '../assets/Helpers';
import TitleBis from "../assets/TitleBis";
import StandingPool from "../Components/StandingPool";
import StandingPoolCapture from "../Components/StandingPoolCapture";
import CaptureOverlay from "../assets/CaptureOverlay";

export default function DivisionOne() {

    const tabItems = [
        { value: "calendrier", label: "CALENDRIER" },
        { value: "classement", label: "CLASSEMENT" }
    ];

    const poules = [
        { value: "A", label: "Poule A" },
        { value: "B", label: "Poule B" }
    ];

    // ─── Seulement le classement est centralisé (image unique 2 poules) ─────────
    const [standingPouleA, setStandingPouleA] = useState([]);
    const [standingPouleB, setStandingPouleB] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);
    const [dataReady, setDataReady] = useState(false);

    const standingCaptureRef = useRef(null);

    useEffect(() => {
        const fetchStandings = async () => {
            const [{ data: stdA }, { data: stdB }] = await Promise.all([
                supabase.from("std_v_div_one_wmen").select("*")
                    .eq("nom_saison", "Saison 2025-2026").eq("poule", "A")
                    .order("position", { ascending: true }),
                supabase.from("std_v_div_one_wmen").select("*")
                    .eq("nom_saison", "Saison 2025-2026").eq("poule", "B")
                    .order("position", { ascending: true }),
            ]);
            if (stdA) setStandingPouleA(stdA);
            if (stdB) setStandingPouleB(stdB);
            setDataReady(true);
        };
        fetchStandings();
    }, []);

    const fetchMatchesByPoule = (poule) => async () => {
        const { data } = await supabase
            .from("matchs_poule").select("*")
            .eq("nom_saison", "Saison 2025-2026")
            .eq("ligue", "D1 Féminine").eq("poule", poule)
            .order("numero", { ascending: true })
            .order("date_match", { ascending: true });
        return data;
    };

    const fetchStandingByPoule = (poule) => async () => {
        const { data } = await supabase
            .from("std_v_div_one_wmen").select("*")
            .eq("nom_saison", "Saison 2025-2026").eq("poule", poule)
            .order("position", { ascending: true });
        return data;
    };

    return (
        <>
            <Navbar />
            <CaptureOverlay isCapturing={isCapturing} />
            <HeroStatiq src={getSupabaseImageUrl('medias/banner/sobemap_un.jpg')} alt="banner" />
            <TitleBis title="Tout savoir sur la D1 Féminine, 2025-2026" />

            <Tabs defaultTab="calendrier">
                <TabsList items={tabItems} />

                <TabContent value="calendrier">
                    <PouleTabs poules={poules} defaultPoule="A">
                        {poules.map(poule => (
                            <PouleContent key={poule.value} value={poule.value}>
                                {/* Chaque Schedule gère sa propre capture — comme LeagueOne */}
                                <Schedule
                                    supabaseQuery={fetchMatchesByPoule(poule.value)}
                                    totalJournees={poule.value === 'A' ? 9 : 7}
                                    showPhaseFilter={true}
                                    showTeamFilter={true}
                                    logoUrl={getSupabaseImageUrl('medias/icons/logo_no.png')}
                                    title={`D1 Féminine - 2025-2025 / Poule ${poule.value}`}
                                    subtitle="www.bencofoot.com"
                                    externalDownloadFilename={`calendrier-D1Féminine-poule${poule.value}.png`}
                                />
                            </PouleContent>
                        ))}
                    </PouleTabs>
                </TabContent>

                <TabContent value="classement">
                    <PouleTabs poules={poules} defaultPoule="A">
                        {poules.map(poule => (
                            <PouleContent key={poule.value} value={poule.value}>
                                <StandingPool
                                    title={`Classement - Poule ${poule.value}`}
                                    supabaseQuery={fetchStandingByPoule(poule.value)}
                                    captionGreen="Finaliste"
                                    captionRed="Relégation en D2 Féminine"
                                    externalDownloadRef={poule.value === 'A' ? standingCaptureRef : undefined}
                                    externalOnCapturing={poule.value === 'A' ? setIsCapturing : undefined}
                                    externalDownloadFilename={poule.value === 'A' ? "classement-D1Féminine-poules.png" : undefined}
                                    externalDataReady={poule.value === 'A' ? dataReady : undefined}
                                />
                            </PouleContent>
                        ))}
                    </PouleTabs>
                </TabContent>
            </Tabs>

            {/* StandingPoolCapture hors des tabs — toujours dans le DOM */}
            <StandingPoolCapture
                ref={standingCaptureRef}
                logoUrl={getSupabaseImageUrl('medias/icons/logo_no.png')}
                title="Classement D1 Féminine / 2025-2026"
                subtitle="www.bencofoot.com"
                pouleAStanding={standingPouleA}
                pouleBStanding={standingPouleB}
                pouleALabel="A"
                pouleBLabel="B"
                captionGreen="Finaliste"
                captionRed="Relégation en D2 Féminine"
            />

            <Footer />
        </>
    );
}