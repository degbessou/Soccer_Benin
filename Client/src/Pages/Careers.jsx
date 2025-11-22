import { useEffect, useState } from "react"
import { supabase } from "../Functions/SupabaseClient"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from "../assets/Helpers"



export default function Home() {
    const features = [
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>,
            desc_one: "Nous développons une plateforme dédiée au championnat béninois et souhaitons proposer des statistiques fiables, complètes et mises à jour après chaque journée. Pour cela, nous recherchons des personnes intéressées à contribuer à la collecte d’informations : buteurs, passes décisives, feuilles de match, cartons, expulsion…",
            desc_two: "Aucune compétence technique n’est requise : seulement de la passion pour le football et un peu de disponibilité. En participant, vous aidez à enrichir une plateforme qui met en valeur les clubs, les joueurs et tout le football béninois.",
            desc_three: "Si vous souhaitez prendre part au projet ou en savoir plus, ",
            href: "javascript:void(0)"
        }
    ];

    return (
        <>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/banner/damissa_un.jpg')} alt="équipe de damissa fc" />
            <section className="py-14">
                <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Participez à l’aventure BENCOFOOT
                        </h3>
                        <p className="mt-3 text-gray-600">
                            Aidez-nous à collecter et enrichir les statistiques du championnat béninois.
                        </p>
                    </div>
                    <div className="mt-12">
                        <ul className="gap-y-8 gap-x-12">
                            {
                                features.map((item, idx) => (
                                    <li key={idx} className="space-y-3">
                                        <div className="w-12 h-12 mx-auto bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div className="space-y-3">
                                            <p>{item.desc_one}</p>
                                            <p>{item.desc_two}</p>
                                            <p>
                                                {item.desc_three}
                                                <a href={item.href} className="text-yellow-700 duration-150 hover:text-yellow-400 font-medium inline-flex items-center gap-x-1">
                                                    contactez-nous
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                                                    </svg>
                                                </a>
                                            </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}