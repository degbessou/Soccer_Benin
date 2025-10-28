import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from '../assets/Helpers';
import TitleBis from "../assets/TitleBis"
import Tabs from "../Components/Tabs";
import Schedule from "../Components/Schedule";

export default () => {
    return (
        <>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/mjnt/u20_douze.jpg')} alt="équipe nationale féminine" />
            <TitleBis />
            <Tabs />
            <Schedule />
            <Footer />

        </>
    )
}