
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from "../assets/Helpers"
import TitleBis from "../assets/TitleBis"
import MatchCard from "../Components/MatchCard";

export default function Live() {

    const posts = [
        {
            title: "Bénin vs Guinée",
            desc: "Guépards Senior",
            img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            date: "Jan 4 2022",
            heure: "16:00",
            href: "javascript:void(0)"
        },
    ]
    return (
        <>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/banner/sobemap_un.jpg')} alt="équipe de damissa fc" />
            <TitleBis title="Regardez les matchs des équipes nationales en direct" />
            <section className='pt-8'>
                <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3 max-w-screen-lg mx-auto px-4 md:px-8">
                    {posts.map((item, key) => (
                        <MatchCard
                            key={key}
                            href={item.href}
                            img={item.img}
                            date={item.date}
                            heure={item.heure}
                            title={item.title}
                            desc={item.desc}
                            isLive={true}
                        />
                    ))}
                </ul>
            </section>
            <Footer />
        </>
    );
}