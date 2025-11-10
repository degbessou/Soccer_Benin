import { useEffect, useState } from "react"
import { supabase } from "../Functions/SupabaseClient"
import { getSupabaseImageUrl } from "../assets/Helpers"
import { getPreposition } from "../assets/Helpers"

export default function Cards() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [groupedActus, setGroupedActus] = useState({})

    useEffect(() => {
        async function fetchnews() {
            setLoading(true)
            setError(null)
            const { data, error } = await supabase
                .from("news")
                .select("*")
                .order("years", { ascending: false })
                .order("month_number", { ascending: false })  // ← Utilise month_number
                .order("date", { ascending: false })
                .order("id", { ascending: false })

            if (error) {
                setError(error.message)
            } else {
                const grouped = data.reduce((acc, item) => {
                    const key = `${item.months} ${item.years}`
                    if (!acc[key]) acc[key] = []
                    acc[key].push(item)
                    return acc
                }, {})
                setGroupedActus(grouped)
            }
            setLoading(false)
        }
        fetchnews()
    }, [])

    if (loading) return <p className="text-center text-gray-500 animate-pulse">Chargement des actualités...</p>
    if (error) return <p className="text-center text-red-600">❌ Erreur : {error}</p>

    return (
        <section className="py-4">
            <div className="max-w-screen-lg mx-auto px-4 md:px-8">
                {Object.entries(groupedActus).map(([title, news]) => {
                    const month = title.split(' ')[0]
                    const year = title.split(' ')[1]
                    return (
                        <div key={title} className="mb-10">
                            <h1 className="text-gray-800 text-2xl font-extrabold sm:text-3xl mb-4">
                                L'actualité {getPreposition(month)}{month} {year}
                            </h1>
                            <ul>
                                {news.map((item, idx) => (
                                    <li key={idx} className="px-4 py-2 hover:bg-green-50 rounded-xl transition-colors">
                                        <div className="flex gap-x-3">
                                            <span className="text-sm">{item.date}</span>
                                            <h3 className="text-red-700 text-sm font-semibold">
                                                {item.tag}
                                            </h3>
                                            <h3 className="text-red-700 text-sm font-semibold">
                                                {item.tag_un}
                                            </h3>
                                            <h3 className="text-red-700 text-sm font-semibold">
                                                {item.tag_deux}
                                            </h3>
                                            {/*<div className="bg-white w-4 h-4 pt-1 flex items-center justify-center">
                                                <img src={item.icon} alt="icon" className="w-4 h-4" />
                                            </div> */}
                                        </div>
                                        {item.has_image ? (
                                            <div className="grid grid-cols-[auto_1fr] gap-4 pt-2">
                                                <div className="w-[185px] h-[105px] flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                                                    <img
                                                        src={getSupabaseImageUrl(item.image)}
                                                        alt="Image"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <p className="text-sm">{item.infos}</p>
                                            </div>
                                        ) : (
                                            <div className="pt-2">
                                                <p className="text-sm">{item.infos}</p>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}