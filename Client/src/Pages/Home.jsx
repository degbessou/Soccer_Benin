
import React from 'react'
import Navbar from '../Components/Navbar'
import HeroDynamiq from '../Components/HeroDynamiq'
import Cards from '../Components/Cards'
import Footer from '../Components/Footer'

export default function Home() {

    const carouselImages = [
        {
            src: "medias/mnt/nt_douze.jpg",
            alt: "MNT",
            caption: "Cover : Équipe nationale masculine du Bénin 2025"
        },
        {
            src: "medias/wnt/wnt_quatre.jpg",
            alt: "WNT",
            caption: "Cover : Équipe nationale féminine du Bénin 2025"
        },
        {
            src: "medias/news/can_scolaire_26_un.jpg",
            alt: "espoirs scolaire",
            caption: "Cover : Équipe nationale scolaire du Bénin 2026"
        },
        {
            src: "medias/banner/dadje_deux.jpg",
            alt: "WNT",
            caption: "Cover : Dadjè FC 2025"
        },
        {
            src: "medias/banner/buffle_deux.jpg",
            alt: "WNT",
            caption: "Cover : Buffles du Borgou 2025"
        }
    ];

    return (
        <>
            <Navbar />
            <HeroDynamiq images={carouselImages} />
            <Cards />
            <Footer />
        </>
    )

}