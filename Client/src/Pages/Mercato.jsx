import { useEffect, useState } from "react"
import { supabase } from "../Functions/SupabaseClient"

import React from "react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroDynamiq from "../Components/HeroDynamiq"
import Title from "../assets/Title"
import TitleBis from "../assets/TitleBis"

export default function Mercato() {
    const [mercato, setMercato] = useState([])
    const [selectedItem, setSelectedItem] = useState(0)
    const [loading, setLoading] = useState(true)

    const carouselImages = [
        {
            src: "/steeve_mounie.jpg",
            alt: "Steeve Yago Mounié",
            caption: "Cover : Steeve Yago Mounié"
        },
        {
            src: "/women-soccer.jpeg",
            alt: "Équipe féminine de football",
            caption: "Cover : Équipe féminine de football"
        },
        {
            src: "/dadje-fc.jpeg",
            alt: "Dadjè FC",
            caption: "Cover : Dadjè FC, champion du Bénin 2025-2026"
        }
    ];

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const { data, error } = await supabase
                .from("mercato")
                .select("id, *")
                .order("category", { ascending: true })
                .order("player", { ascending: true })

            if (error) {
                console.error("Erreur lors de la récupération des données :", error)
                setLoading(false)
            } else {
                //console.log("Données reçues:", data)
                //console.log("Nombre de lignes:", data?.length)

                // Regrouper les joueurs par catégorie/titre
                const grouped = data.reduce((acc, row) => {
                    const key = `${row.category}-${row.title}`
                    if (!acc[key]) {
                        acc[key] = {
                            category: row.category,
                            title: row.title,
                            items: [],
                        }
                    }
                    acc[key].items.push({
                        player: row.player,
                        from: row.from_team,
                        to: row.to_team,
                        detail: row.detail,
                    })
                    return acc
                }, {})
                //console.log("Données groupées:", Object.values(grouped))
                setMercato(Object.values(grouped))
                setLoading(false)
            }
        }
        fetchData()
    }, [])


    const labelColors = {
        "Transfert": {
            color: "text-green-600 bg-green-50",
        },
        "Libre": {
            color: "text-yellow-600 bg-yellow-50",
        },
        "Prêt": {
            color: "text-red-600 bg-red-50",
        },
    }
    return (
        <>
            <Navbar />
            <HeroDynamiq images={carouselImages} />
            <TitleBis title="Le mercato béninois, c'est ici."
                description="Suivez pas à pas l’actualité du marché des transferts des béninois d'ici et d'ailleurs. Rumeurs, officialisations et mouvements de joueurs : ne manquez aucune information sur vos clubs et stars préférés." />
            <main>
                <div className="max-w-screen-lg mx-auto px-4 md:px-8">
                    <div className="text-sm mt-12 overflow-x-auto">
                        <ul role="tablist" className="w-full flex items-center gap-x-3 overflow-x-auto">
                            {
                                mercato.map((item, idx) => (
                                    <li key={`${item.category}-${item.title}`} className={`py-2 border-b-2 ${selectedItem == idx ? "border-yellow-600 text-yellow-600" : "border-white text-gray-500"}`}>
                                        <button
                                            role="tab"
                                            aria-selected={selectedItem == idx ? true : false}
                                            aria-controls={`tabpanel-${idx + 1}`}
                                            className="py-2.5 px-4 rounded-lg duration-150 hover:text-yellow-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                                            onClick={() => setSelectedItem(idx)}
                                        >
                                            {item.category}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                        {loading ? (
                            <p className="text-center py-8 text-gray-500">Chargement...</p>
                        ) : mercato.length === 0 ? (
                            <p className="text-center py-8 text-gray-500">Aucune donnée disponible.</p>
                        ) : (
                            <table className="w-full table-auto text-left">
                                <thead className="text-gray-600 font-medium border-b border-gray-300">
                                    <tr>
                                        <th className="w-5/12 py-4 pr-6">{mercato[selectedItem].title}</th>
                                        <th className="text-center py-4 pr-6">De</th>
                                        <th className="py-4 pr-6"></th>
                                        <th className="text-center py-4 pr-6">Vers</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 divide-y divide-gray-300">
                                    {
                                        mercato[selectedItem]?.items?.map((item, idx) => (
                                            <tr key={item.id}>
                                                <td className="pr-6 py-4 whitespace-nowrap">{item.player}</td>
                                                <td className="pr-6 py-4 whitespace-nowrap text-600 text-center">{item.from}</td>
                                                <td className="pr-6 py-4 whitespace-nowrap text-center">
                                                    <span className={`py-2 px-3 rounded-full font-semibold text-xs ${labelColors[item?.detail]?.color || ""}`}>{item.detail}</span>
                                                </td>
                                                <td className="pr-6 py-4 whitespace-nowrap text-600 text-center">{item.to}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )

}