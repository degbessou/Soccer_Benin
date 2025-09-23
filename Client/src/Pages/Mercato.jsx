import { useState } from "react"

import React from "react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Hero2 from "../Components/Hero2"

export default function Mercato() {

    const tableItems = [
        {
            label: "Équipe nationale",
            title: "Joueurs",
            items: [
                {
                    player: "Abdoul Rachid Moumini",
                    from: "Ayema",
                    to: "Sumgayit (AZE)",
                    detail: "Libre"
                },
                {
                    player: "Razack Rachidou",
                    from: "Sobemap FC",
                    to: "NK Kustosija (CRO)",
                    detail: "Transfert"
                },
                {
                    player: "Andreas Hountondji",
                    from: "Burnley (ENG)",
                    to: "Sankt Pauli (GER)",
                    detail: "Prêt"
                },
                {
                    player: "Stevee Yago Mounié",
                    from: "Augsbourg (GER)",
                    to: "Antalyaspor (TUR)",
                    detail: "Prêt"
                },
            ]
        },
        {
            label: "Ligue professionnel",
            title: "Joueurs",
            items: [
                {
                    player: "Feliciano Montcho",
                    from: "Dadjè FC",
                    to: "Hafia FC (GUI)",
                    detail: "Transfert"
                },
                {
                    player: "Idriss Bakary Abiodoun",
                    from: "Coton Sport FC",
                    to: "Dadjè FC",
                    detail: "Transfert"
                },
                {
                    player: "Aniyikaye Adeleye",
                    from: "Shooting Stars (NIG)",
                    to: "ASVO",
                    detail: "Transfert"
                },
                {
                    player: "Jerome Bonou",
                    from: "Requin FC",
                    to: "Remo Stars (NIG)",
                    detail: "Transfert"
                },
            ]
        }
    ]

    const [selectedItem, setSelectedItem] = useState(0)
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
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="text-sm mt-12 overflow-x-auto">
                        <ul rol="tablist" className="w-full flex items-center gap-x-3 overflow-x-auto">
                            {
                                tableItems.map((item, idx) => (
                                    <li key={idx} className={`py-2 border-b-2 ${selectedItem == idx ? "border-yellow-600 text-yellow-600" : "border-white text-gray-500"}`}>
                                        <button
                                            role="tab"
                                            aria-selected={selectedItem == idx ? true : false}
                                            aria-controls={`tabpanel-${idx + 1}`}
                                            className="py-2.5 px-4 rounded-lg duration-150 hover:text-yellow-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                                            onClick={() => setSelectedItem(idx)}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                        <table className="w-full table-auto text-left">
                            <thead className="text-gray-600 font-medium border-b border-gray-300">
                                <tr>
                                    <th className="w-9/12 py-4 pr-6">{tableItems[selectedItem].title}</th>
                                    <th className="py-4 pr-6">De</th>
                                    <th className="py-4 pr-6">Vers</th>
                                    <th className="py-4 pr-6">Détails</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y divide-gray-300">
                                {
                                    tableItems[selectedItem].items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="pr-6 py-4 whitespace-nowrap">{item.player}</td>
                                            <td className="pr-6 py-4 whitespace-nowrap text-600">{item.from}</td>
                                            <td className="pr-6 py-4 whitespace-nowrap text-600">{item.to}</td>
                                            <td className="pr-6 py-4 whitespace-nowrap">
                                                <span className={`py-2 px-3 rounded-full font-semibold text-xs ${labelColors[item?.detail]?.color || ""}`}>{item.detail}</span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )

}