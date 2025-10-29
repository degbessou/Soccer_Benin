import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from '../assets/Helpers';
import TitleBis from "../assets/TitleBis"
import Tabs from "../Components/Tabs";
import Schedule from "../Components/Schedule";
import { supabase } from "../Functions/SupabaseClient"

export default () => {
    const fetchLeague1Matches = async () => {
        const { data, error } = await supabase
            .from('matchs')
            .select('*')
            .eq('nom_saison', 'Saison 2025-2026')
            .order('numero', { ascending: true })
            .order('date_match', { ascending: true })

        return data
    }

    return (
        <>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/banner/cotonfc_banner.jpg')} alt="banner" />
            <TitleBis title="Tout savoir sur la Celtiis Ligue 1 2025-2026" />
            <Tabs />
            <Schedule
                supabaseQuery={fetchLeague1Matches}
                totalJournees={34}
                showPhaseFilter={true}
                showTeamFilter={true}
            />
            <Footer />

        </>
    )
}