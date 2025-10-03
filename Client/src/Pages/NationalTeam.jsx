import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq"
import TitleBis from "../assets/TitleBis"


export default function Home() {
    return (
        <>
            <Navbar />
            <HeroStatiq src="/en_benin.jpeg" alt="équipe nationale senoir homme" />
            <TitleBis />
            <Footer />
        </>
    )

}