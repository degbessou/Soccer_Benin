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
import { Head } from "vite-react-ssg";
//import Statistics from "./Stats/Statistics";

export default function DivisionOne() {

    const tabItems = [
        { value: "calendrier", label: "CALENDRIER" },
        { value: "classement", label: "CLASSEMENT" },
        { value: "stats", label: "STATS" }
        //{ value: "playoffs", label: "PLAY-OFFS" }
    ];

    const poules = [
        { value: "A", label: "Poule A" },
        { value: "B", label: "Poule B" },
        { value: "Play-offs", label: "Play-Offs" }
    ];

    // ─── Seulement le classement est centralisé (image unique 2 poules) ─────────
    const [standingPouleA, setStandingPouleA] = useState([]);
    const [standingPouleB, setStandingPouleB] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);
    const [dataReady, setDataReady] = useState(false);

    // Ajouter avec les autres refs/states
    const [standingPlayoff, setStandingPlayoff] = useState([])
    const playoffCaptureRef = useRef(null)
    const [isCapturingPlayoff, setIsCapturingPlayoff] = useState(false)
    const [dataReadyPlayoff, setDataReadyPlayoff] = useState(false)

    const standingCaptureRef = useRef(null);

    useEffect(() => {
        const fetchStandings = async () => {
            const [{ data: stdA }, { data: stdB }, { data: stdPO }] = await Promise.all([
                supabase.from("std_v_div_one_wmen").select("*")
                    .eq("nom_saison", "Saison 2025-2026").eq("poule", "A")
                    .order("position", { ascending: true }),
                supabase.from("std_v_div_one_wmen").select("*")
                    .eq("nom_saison", "Saison 2025-2026").eq("poule", "B")
                    .order("position", { ascending: true }),
                supabase.from("std_v_div_one_wmen").select("*")
                    .eq("nom_saison", "Saison 2025-2026").eq("poule", "Play-offs")
                    .order("position", { ascending: true }),
            ])

            // DIAGNOSTIC
            console.log("stdA:", stdA)
            console.log("stdB:", stdB)
            console.log("stdPO:", stdPO)
            console.log("dataReady avant set:", dataReady)


            if (stdA) setStandingPouleA(stdA)
            if (stdB) setStandingPouleB(stdB)
            if (stdPO) setStandingPlayoff(stdPO)
            setDataReady(true)
            setDataReadyPlayoff(true)
        }
        fetchStandings()
    }, [])

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

    const fetchPlayoffsMatches = async () => {
        const { data } = await supabase
            .from('matchs_playoff')
            .select('*')
            .eq('nom_saison', 'Saison 2025-2026')
            .order('date_match', { ascending: true })
            .order('id_match', { ascending: true })

        return data
    }


    const journeesJoueesA = standingPouleA.length > 0 ? standingPouleA[0].matchs_joues : 0;

    return (
        <>
            <Head>
                <title>D1 Féminine : calendrier, résultats et classement | BencoFoot</title>
                <meta
                    name="description"
                    content="Retrouvez le calendrier, les résultats, le classement et le calendrier de la D1 Féminine du Bénin sur Bencofoot."
                />
                <link rel="canonical" href="https://www.bencofoot.com/DivisionOne" />
            </Head>
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
                                    totalJournees={poule.value === 'A' ? 18 : poule.value === 'B' ? 14 : 3}
                                    showPhaseFilter={poule.value !== 'Play-offs'}
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
                        {poules.map(poule => {
                            const isPlayoff = poule.value === 'Play-offs'

                            return (
                                <PouleContent key={poule.value} value={poule.value}>
                                    <StandingPool
                                        title={
                                            isPlayoff
                                                ? "Classement Play-offs"
                                                : `Classement - Poule ${poule.value}`
                                        }
                                        supabaseQuery={fetchStandingByPoule(poule.value)}
                                        captionGreen={
                                            isPlayoff
                                                ? "Championne D1 Féminine"
                                                : "Qualifiées pour les Play-offs"
                                        }
                                        captionRed={
                                            isPlayoff ? undefined : "Relégation en D2 Féminine"
                                        }
                                        greenRows={isPlayoff ? 1 : 2}
                                        redRows={isPlayoff ? 0 : 1}
                                        externalDownloadRef={
                                            isPlayoff
                                                ? playoffCaptureRef
                                                : poule.value === 'A' ? standingCaptureRef : undefined
                                        }
                                        externalOnCapturing={
                                            isPlayoff
                                                ? setIsCapturingPlayoff
                                                : poule.value === 'A' ? setIsCapturing : undefined
                                        }
                                        externalDownloadFilename={
                                            isPlayoff
                                                ? `classement-d1f-playoffs.png`
                                                : poule.value === 'A' ? `classement-d1f-j${journeesJoueesA}.png` : undefined
                                        }
                                        externalDataReady={
                                            isPlayoff
                                                ? dataReadyPlayoff
                                                : poule.value === 'A' ? dataReady : undefined
                                        }

                                    />
                                </PouleContent>
                            )
                        })}
                    </PouleTabs>
                </TabContent>

                {/*                <TabContent value="stats">
                    <Statistics playerTitle="Joueuses" goalkeeperTitle="Gardiennes" />
                </TabContent>
                */}

            </Tabs>

            {/* Overlay playoff */}
            <CaptureOverlay isCapturing={isCapturingPlayoff} />

            {/* Capture poules A+B — 2 tables */}
            <StandingPoolCapture
                ref={standingCaptureRef}
                logoUrl={getSupabaseImageUrl('medias/icons/logo_no.png')}
                title="Classement D1 Féminine / 2025-2026"
                subtitle="www.bencofoot.com"
                pouleAStanding={standingPouleA}
                pouleBStanding={standingPouleB}
                pouleALabel="A"
                pouleBLabel="B"
                captionGreen="Qualifiées pour les Play-offs"
                captionRed="Relégation en D2 Féminine"
                greenRows={2}
                redRows={1}
            />

            {/* Capture playoff — 1 seule table */}
            <StandingPoolCapture
                ref={playoffCaptureRef}
                logoUrl={getSupabaseImageUrl('medias/icons/logo_no.png')}
                title="Classement Play-offs D1 Féminine / 2025-2026"
                subtitle="www.bencofoot.com"
                pouleAStanding={standingPlayoff}
                pouleALabel="Play-offs"
                pouleBStanding={null}
                captionGreen="Championne D1 Féminine"
                greenRows={1}
                redRows={0}
            />

            <Footer />
        </>
    );
}