import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq"
import TitleBis from "../assets/TitleBis"
import Section404 from "../Components/Section404"


export default function Home() {
    return (
        <>
            <Navbar />
            <HeroStatiq src="/dadje-fc.jpeg" alt="équipe de dadje fc" />
            <TitleBis />
            <Section404 />
            <Footer />
        </>
    )

}