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
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import FormStats from "../Components/FormStats";


export default () => {
    const tabItems = [
        { value: "calendrier", label: "CALENDRIER" },
        { value: "classement", label: "CLASSEMENT" },
        { value: "stats", label: "STATS" }
    ];

    // Créer des refs distinctes pour chaque composant
    const scheduleTableRef = useRef(null);
    //const standingTableRef = useRef(null);

    const [journeesJouees, setJourneesJouees] = useState(0)

    const fetchLeague1Matches = async () => {
        const { data, error } = await supabase
            .from('matchs')
            .select('*')
            .eq('nom_saison', 'Saison 2025-2026')
            .eq('ligue', 'Celtiis Ligue 1')
            .order('numero', { ascending: true })
            .order('date_match', { ascending: true })

        return data
    }

    const fetchLeague1Standing = async () => {
        const { data, error } = await supabase
            .from('std_v_lig_one_men')
            .select('*')
            .eq('nom_saison', 'Saison 2025-2026')
            .order('position', { ascending: true })

        //console.log('Classement:', data, error)
        return data
    }

    const fetchLeague1Form = async (phase) => {
        let query = supabase
            .from('equipe_forme_total')
            .select('*')
            .eq('nom_saison', 'Saison 2025-2026')
            .eq('ligue', 'Celtiis Ligue 1')
            .order('position', { ascending: true })

        if (phase) query = query.eq('phase', phase) // 👈 vérifie le nom exact de la colonne dans Supabase

        const { data, error } = await query
        return data
    }


    return (
        <>
            <Helmet>
                <title>Celtiis Ligue 1 : calendrier, résultats et classement | Bencofoot</title>
                <meta
                    name="description"
                    content="Suivez la Celtiis Ligue 1 sur BencoFoot : calendrier des matchs, résultats, classement et statistiques de la première ligue béninoise."
                />
            </Helmet>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/banner/cotonfc_banner.jpg')} alt="banner" />
            <TitleBis title="Tout savoir sur la Celtiis Ligue 1 2025-2026" />
            <Tabs defaultTab="calendrier">
                <TabsList items={tabItems} />
                <TabContent value="calendrier">
                    <Schedule
                        supabaseQuery={fetchLeague1Matches}
                        totalJournees={34}
                        showPhaseFilter={true}
                        showTeamFilter={true}
                        tableRef={scheduleTableRef}
                        logoUrl={getSupabaseImageUrl('medias/icons/logo_no.png')}
                        title="Celtiis Ligue 1 / 2025-2026"
                        subtitle="www.bencofoot.com"
                        externalDownloadFilename="calendrier-ligue1.png"
                    />
                </TabContent>
                <TabContent value="classement">
                    <div>
                        <Standing
                            title="Classement Ligue 1"
                            titleCapture="Classement Celtiis Ligue 1 / 2025-2026"
                            supabaseQuery={fetchLeague1Standing}
                            logoUrl={getSupabaseImageUrl('medias/icons/logo_no.png')}
                            subtitle="www.bencofoot.com"
                            caption_green="Champion / Ligue des Champions CAF"
                            caption_yellow="Coupe de la Confédération CAF"
                            caption_red="Relégation en Ligue 2"
                            onDataLoaded={(data) => setJourneesJouees(data[0]?.matchs_joues ?? 0)}
                            externalDownloadFilename={`classement-ligue1-j${journeesJouees}.png`}
                        />
                    </div>
                </TabContent>
                <TabContent value="stats">
                    <FormStats
                        supabaseQuery={fetchLeague1Form}
                    />
                </TabContent>
            </Tabs>
            <Footer />

        </>
    )
}