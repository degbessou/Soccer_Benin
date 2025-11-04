
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
            src: "medias/mjnt/u20_douze.jpg",
            alt: "espoirs Misserete",
            caption: "Cover : Jeunes espoirs du centre de formation national de Misserete"
        },
        {
            src: "medias/wnt/wnt_quatre.jpg",
            alt: "WNT",
            caption: "Cover : Équipe nationale féminine du Bénin 2025"
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