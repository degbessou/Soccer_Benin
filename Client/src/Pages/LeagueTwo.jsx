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

export default () => {
    const tabItems = [
        { value: "calendrier", label: "CALENDRIER" },
        { value: "classement", label: "CLASSEMENT" },
        { value: "stats", label: "STATS" }
    ];

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
                    />
                </TabContent>

                <TabContent value="classement">
                    <Standing
                        title="Classement Ligue 2"
                        supabaseQuery={fetchLeague2Standing}
                        caption_green="Champion / Promu en Ligue 1"
                        caption_yellow="Promu en Ligue 1"
                        caption_red="Relégation en Ligue 3"
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