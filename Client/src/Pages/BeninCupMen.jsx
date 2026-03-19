import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from '../assets/Helpers';
import TitleBis from "../assets/TitleBis"
import Tabs, { TabsList, TabContent } from '../Components/Tabs'
import ScheduleTournament from "../Components/ScheduleTournament";
import { supabase } from "../Functions/SupabaseClient"
import Section404 from "../Components/Section404";
import { Helmet } from "react-helmet-async";

export default function CoupeDuBenin() {
    const tabItems = [
        { value: "calendrier", label: "CALENDRIER" },
        { value: "stats", label: "STATS" }
    ];

    const fetchCoupeMatches = async () => {
        const { data } = await supabase
            .from('matchs_coupe')
            .select('*')
            .eq('nom_saison', 'Coupe 2025-2026')
            .order('date_match', { ascending: true })
        return data
    }

    return (
        <>
            <Helmet>
                <title>Coupe du Bénin : calendrier et résultats | Bencofoot</title>
                <meta
                    name="description"
                    content="Suivez la Coupe du Bénin sur BencoFoot : calendrier des matchs, résultats et statistiques de la coupe béninoise."
                />
            </Helmet>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/banner/cotonfc_banner.jpg')} alt="banner" />
            <TitleBis title="Tout savoir sur la Coupe du Bénin 2025-2026" />
            <Tabs defaultTab="calendrier">
                <TabsList items={tabItems} />
                <TabContent value="calendrier">
                    <ScheduleTournament
                        supabaseQuery={fetchCoupeMatches}
                        logoUrl={getSupabaseImageUrl('medias/icons/logo_no.png')}
                        title="Coupe du Bénin / 2025-2026"
                        subtitle="www.bencofoot.com"
                        externalDownloadFilename="coupe-benin-25-26.png"
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