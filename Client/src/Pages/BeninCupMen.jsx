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
            .eq('nom_saison', 'Saison 2025-2026')
            .order('date_match', { ascending: true })
            .order('id_match', { ascending: true })

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
                <div> <h2 class="py-2 text-lg underline underline-offset-3">
                    Déroulement de la <a class="font-semibold">Coupe du Bénin</a> 2025-2026:
                </h2>

                    <p className="py-2">
                        <ul className="space-y-2">
                            <li className="grid grid-cols-[130px_1fr] gap-2">
                                <span className="font-semibold text-right italic">1er tour :</span>
                                <span>28 équipes s’affrontent en match unique à élimination directe ; 14 sont éliminées tandis que 14 se qualifient.</span>
                            </li>

                            <li className="grid grid-cols-[130px_1fr] gap-2">
                                <span className="font-semibold text-right italic">2e tour :</span>
                                <span>14 équipes disputent un match unique à élimination directe ; 7 obtiennent leur qualification et un meilleur perdant est repêché.</span>
                            </li>

                            <li className="grid grid-cols-[130px_1fr] gap-2">
                                <span className="font-semibold text-right italic">Quart de finale :</span>
                                <span>Place aux quarts de finale avec la participation de 8 équipes.</span>
                            </li>

                            <li className="grid grid-cols-[130px_1fr] gap-2">
                                <span className="font-semibold text-right italic">Demi-finale :</span>
                                <span>Les demi-finales réunissent les 4 équipes restantes.</span>
                            </li>

                            <li className="grid grid-cols-[130px_1fr] gap-2">
                                <span className="font-semibold text-right italic">Finale :</span>
                                <span>Les deux équipes victorieuses des demi-finales s’affrontent pour remporter le titre de champion.</span>
                            </li>
                        </ul>
                    </p>
                </div>
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