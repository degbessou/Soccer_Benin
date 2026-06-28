import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from '../assets/Helpers';
import TitleBis from "../assets/TitleBis"
import Tabs, { TabsList, TabContent } from '../Components/Tabs'
import Schedule from "../Components/Schedule";
import { supabase } from "../Functions/SupabaseClient"
import Standing from "../Components/Standing";
//import Section404 from "../Components/Section404";
import { useRef, useState } from "react";
import { Head } from "vite-react-ssg";
import StatList from "../Components/StatList";
import StatTeam from "../Components/StatTeam"
//import Statistics from "./Stats/Statistics";

export default () => {
    const tabItems = [
        { value: "calendrier", label: "CALENDRIER" },
        { value: "classement", label: "CLASSEMENT" },
        { value: "stats", label: "STATS" }
    ];

    const scheduleTableRef = useRef(null);


    const [journeesJouees, setJourneesJouees] = useState(0)

    const fetchLeague2Matches = async () => {
        const { data, error } = await supabase
            .from('matchs')
            .select('*')
            .eq('nom_saison', 'Saison 2025-2026')
            .eq('ligue', 'Celtiis Ligue 2')
            .order('numero', { ascending: true })
            .order('date_match', { ascending: true })

        return data
    }

    const fetchLeague2Standing = async () => {
        const { data, error } = await supabase
            .from('std_v_lig_two_men')
            .select('*')
            .eq('nom_saison', 'Saison 2025-2026')
            .order('position', { ascending: true })
        return data
    }

    // classement des buteurs, passeurs, etc.
    const fetchStats = (typeStats, type) => async () => {
        const { data } = await supabase
            .from('statistiques_joueurs')
            .select('*')
            .eq('nom_saison', 'Saison 2025-2026')
            .eq('ligue', 'Celtiis Ligue 2')
            .eq('type', type)
            .eq('type_stats', typeStats)
            .eq('phase', 'saison')
            .order('nombre', { ascending: false })
        return data
    }

    // statistiques des buts par équipe (domicile / extérieur, totaux, rangs)
    const fetchLeague2TeamStats = async () => {
        const { data } = await supabase
            .from('equipe_buts_rang')
            .select('*')
            .eq('nom_saison', 'Saison 2025-2026')
            .eq('ligue', 'Celtiis Ligue 2')
            .order('total_buts_marques', { ascending: false })
        return data
    }

    return (
        <>
            <Head>
                <title>Celtiis Ligue 2 : calendrier, résultats et classement | Bencofoot</title>
                <meta
                    name="description"
                    content="Retrouvez le calendrier, les résultats, le classement et le calendrier de la Celtiis Ligue 2 du Bénin sur Bencofoot."
                />
                <link rel="canonical" href="https://www.bencofoot.com/LeagueTwo" />
            </Head>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/banner/cotonfc_banner.jpg')} alt="banner" />
            <TitleBis title="Tout savoir sur la Celtiis Ligue 2 2025-2026" />
            <Tabs defaultTab="calendrier">
                <TabsList items={tabItems} />

                <TabContent value="calendrier">
                    <Schedule
                        supabaseQuery={fetchLeague2Matches}
                        totalJournees={34}
                        showPhaseFilter={true}
                        showTeamFilter={true}
                        tableRef={scheduleTableRef}
                        logoUrl={getSupabaseImageUrl('medias/icons/logo_no.png')}
                        title="Celtiis Ligue 2 / 2025-2026"
                        subtitle="www.bencofoot.com"
                        externalDownloadFilename={`calendrier-ligue2.png`}
                    />
                </TabContent>

                <TabContent value="classement">
                    <Standing
                        title="Classement Ligue 2"
                        titleCapture="Classement Celtiis Ligue 2 / 2025-2026"
                        supabaseQuery={fetchLeague2Standing}
                        logoUrl={getSupabaseImageUrl('medias/icons/logo_no.png')}
                        subtitle="www.bencofoot.com"
                        caption_green="Champion / Promu en Ligue 1"
                        caption_yellow="Promu en Ligue 1"
                        caption_red="Relégation en Ligue 3"
                        onDataLoaded={(data) => setJourneesJouees(data[0]?.matchs_joues ?? 0)}
                        externalDownloadFilename={`classement-ligue2-j${journeesJouees}.png`}
                    />
                </TabContent>

                <TabContent value="stats">
                    <div className="divide-y divide-gray-200">
                        <StatList
                            title="Joueurs"
                            supabaseQuery={(typeStats) => fetchStats(typeStats, 'joueur')()}
                            config={[
                                { label: 'Buts', type_stats: 'buts' },
                            ]}
                        />
                        <StatTeam
                            title="Équipes"
                            supabaseQuery={fetchLeague2TeamStats}
                        />
                    </div>
                </TabContent>
                {/*

                <TabContent value="stats">
                    <Statistics playerTitle="Joueurs" goalkeeperTitle="Gardiens"/>
                </TabContent>
*/}
            </Tabs>
            <Footer />

        </>
    )
}