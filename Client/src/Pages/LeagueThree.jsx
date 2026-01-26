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

export default function LeagueThree() {

    const tabItems = [
        { value: "calendrier", label: "CALENDRIER" },
        { value: "classement", label: "CLASSEMENT" }
    ];

    const poules = [
        { value: "A", label: "Poule A" },
        { value: "B", label: "Poule B" }
    ];

    const fetchMatchesByPoule = (poule) => async () => {
        const { data } = await supabase
            .from("matchs_poule")
            .select("*")
            .eq("nom_saison", "Saison 2025-2026")
            .eq("ligue", "Ligue 3")
            .eq("poule", poule)
            .order("numero", { ascending: true })
            .order("date_match", { ascending: true });

        return data;
    };

    const fetchStandingByPoule = (poule) => async () => {
        const { data } = await supabase
            .from("std_v_lig_three_men")
            .select("*")
            .eq("nom_saison", "Saison 2025-2026")
            .eq("poule", poule)
            .order("position", { ascending: true });

        return data;
    };

    return (
        <>
            <Navbar />


            <HeroStatiq src={getSupabaseImageUrl('medias/banner/sobemap_un.jpg')} alt="banner" />
            <TitleBis title="Tout savoir sur la Ligue Amateur, 2025-2026" />
            <Tabs defaultTab="calendrier">
                <TabsList items={tabItems} />

                <TabContent value="calendrier">
                    <PouleTabs poules={poules} defaultPoule="A">
                        {poules.map(poule => (
                            <PouleContent key={poule.value} value={poule.value}>
                                <Schedule
                                    supabaseQuery={fetchMatchesByPoule(poule.value)}
                                    totalJournees={7}
                                    showPhaseFilter={true}
                                    showTeamFilter={true}
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
