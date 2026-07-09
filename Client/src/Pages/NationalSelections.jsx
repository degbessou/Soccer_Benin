import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq"
import TitleBis from "../assets/TitleBis"
import InternationalSchedule from "../Components/InternationalSchedule"
import { supabase } from "../Functions/SupabaseClient"
import { Head } from "vite-react-ssg"

export default function NationalSelections() {
    const fetchInternationalMatches = async () => {
        const { data } = await supabase
            .from('matchs_internationaux')
            .select('*')
            .order('date', { ascending: true })
            .order('heure', { ascending: true })

        return data
    }

    return (
        <>
            <Head>
                <title>Matchs des sélections nationales du Bénin : calendrier et résultats | BencoFoot</title>
                <meta
                    name="description"
                    content="Le calendrier et les résultats des sélections nationales du Bénin sur BencoFoot : Séniors, U23, U20, U17, U15, filles et garçons, en compétition et en amical."
                />
                <link rel="canonical" href="https://www.bencofoot.com/matchs-selections" />
            </Head>
            <Navbar />
            <HeroStatiq src="/en_benin.jpeg" alt="Sélections nationales du Bénin" />
            <TitleBis
                title="Matchs des sélections nationales du Bénin"
                description="Retrouvez le calendrier et les résultats de toutes les sélections nationales du Bénin."
            />
            <InternationalSchedule supabaseQuery={fetchInternationalMatches} />
            <Footer />
        </>
    )
}
