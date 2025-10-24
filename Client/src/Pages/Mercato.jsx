import { useEffect, useState } from "react"
import { supabase } from "../Functions/SupabaseClient"

import React from "react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Hero2 from "../Components/Hero2"

export default function Mercato() {
    const [mercato, setMercato] = useState([])
    const [selectedItem, setSelectedItem] = useState(0)
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
                .from("mercato")
                .select("*")
                .order("category", { ascending: true })
                .order("player", { ascending: true })

            if (error) {
                console.error("Erreur lors de la récupération des données :", error)
            } else {
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

                setMercato(Object.values(grouped))
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
            <Hero2 />
            <main>
                <div className="max-w-screen-lg mx-auto px-4 md:px-8">
                    <div className="text-sm mt-12 overflow-x-auto">
                        <ul role="tablist" className="w-full flex items-center gap-x-3 overflow-x-auto">
                            {
                                mercato.map((item, idx) => (
                                    <li key={idx} className={`py-2 border-b-2 ${selectedItem == idx ? "border-yellow-600 text-yellow-600" : "border-white text-gray-500"}`}>
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
                        {mercato.length === 0 ? (
                            <p className="text-center py-8 text-gray-500">Chargement...</p>
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
                                            <tr key={idx}>
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