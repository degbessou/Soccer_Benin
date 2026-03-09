import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from '../assets/Helpers';
import TitleBis from "../assets/TitleBis"
import Tabs, { TabsList, TabContent } from '../Components/Tabs'
import Schedule from "../Components/Schedule";
import { supabase } from "../Functions/SupabaseClient"
import Standing from "../Components/Standing";
import Section404 from "../Components/Section404";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";

export default () => {
    const tabItems = [
        { value: "calendrier", label: "CALENDRIER" },
        { value: "classement", label: "CLASSEMENT" },
        { value: "stats", label: "STATS" }
    ];

    const scheduleTableRef = useRef(null);

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

        //console.log('Classement:', data, error)
        return data
    }

    return (
        <>
            <Helmet>
                <title>Celtiis Ligue 2 : calendrier, résultats et classement | Bencofoot</title>
                <meta
                    name="description"
                    content="Retrouvez le calendrier, les résultats, le classement et le calendrier de la Celtiis Ligue 2 du Bénin sur Bencofoot."
                />
            </Helmet>
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
                        externalDownloadFilename="calendrier-ligue2-homme.png"
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
                        externalDownloadFilename="classement-ligue2-homme.png"
                    />
                </TabContent>

                <TabContent value="stats">
                    <Section404 />
                </TabContent>
            </Tabs>
            <Footer />

        </>
    )
}