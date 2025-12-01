import { useEffect, useRef, useState } from "react"
import { supabase } from "../Functions/SupabaseClient"
import { getSupabaseImageUrl } from "../assets/Helpers"
import { getPreposition } from "../assets/Helpers"
import Pagination from "../assets/Pagination"

export default function Cards() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [groupedActus, setGroupedActus] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const topRef = useRef(null)


    useEffect(() => {
        async function fetchnews() {
            setLoading(true)
            setError(null)

            const { data, error } = await supabase
                .from("news")
                .select("*")
                .order("years", { ascending: false })
                .order("month_number", { ascending: false })
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

    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [currentPage])


    if (loading) return <p className="text-center text-gray-500 animate-pulse">Chargement des actualités...</p>
    if (error) return <p className="text-center text-red-600">❌ Erreur : {error}</p>

    // Pagination logic
    const monthKeys = Object.keys(groupedActus)
    const totalPages = monthKeys.length
    const currentMonthKey = monthKeys[currentPage - 1]
    const currentNews = groupedActus[currentMonthKey] || []

    return (
        <section className="py-4">
            <div className="max-w-screen-lg mx-auto px-4 md:px-8">
                <div ref={topRef}></div>
                {/* TITRE DU MOIS */}
                <div className="mb-10">
                    <h1 className="text-gray-800 text-2xl font-extrabold sm:text-3xl mb-4">
                        L'actualité {getPreposition(currentMonthKey.split(" ")[0])}
                        {currentMonthKey}
                    </h1>

                    {/* LISTE DES NEWS */}
                    <ul>
                        {currentNews.map((item, idx) => (
                            <li
                                key={idx}
                                className="py-2 hover:bg-green-50 rounded-xl transition-colors"
                            >
                                <div className="flex items-center gap-x-1">
                                    <span className="text-sm w-30 md:w-28 font-semibold">{item.date}</span>
                                    <h3 className="text-red-700 text-sm font-semibold">{`#${item.tag_un}`}</h3>
                                    <h3 className="hidden md:block px-4 text-red-700 text-sm font-semibold">{`#${item.tag}`}</h3>
                                    {/*<h3 className="text-red-700 text-sm font-semibold">{item.tag_deux}</h3>*/}
                                </div>

                                {/* IMAGE */}
                                {item.has_image ? (
                                    <div className="px-4 flex flex-col-reverse md:flex-row items-start md:items-center gap-4 pt-2">
                                        <div className="w-[185px] md:w-[185px] h-[105px] flex items-center justify-center bg-gray-100 rounded-md overflow-hidden mx-auto md:mx-0"><img
                                            src={getSupabaseImageUrl(item.image)}
                                            alt="Image"
                                            className="w-full h-full object-cover"
                                        />
                                        </div>
                                        <p className="px-2 text-sm flex-1">
                                            {item.infos}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="pt-2">
                                        <p className="px-4 text-sm">{item.infos}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* PAGINATION */}
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />

            </div>
        </section>
    )
}
