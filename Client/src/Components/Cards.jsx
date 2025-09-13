
import { useEffect, useState } from "react"
import { supabase } from "../Functions/SupabaseClient"

export default function Cards() {
    const [news, setnews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchnews() {
            setLoading(true)
            setError(null)
            const { data, error } = await supabase
                .from("news") // ta table Supabase
                .select("*")
                .order("id", { ascending: false })


            console.log("Supabase data:", data)
            console.log("Supabase error:", error)

            if (error) {
                setError(error.message)
            } else {
                setnews(data)
            }
            setLoading(false)
        }

        fetchnews()
    }, [])

    return (
        <section className="py-4">
            <div className="max-w-screen-lg mx-auto px-4 md:px-8">
                <div className="max-w-xl mb-8">
                    <h1 className="text-gray-800 text-2xl font-extrabold sm:text-3xl">
                        L’actualité de septembre 🍁
                    </h1>
                </div>

                {/* Loader */}
                {loading && (
                    <p className="text-center text-gray-500 animate-pulse">
                        Chargement des actualités...
                    </p>
                )}

                {/* Erreur */}
                {error && (
                    <p className="text-center text-red-600">
                        ❌ Erreur : {error}
                    </p>
                )}

                {/* Liste des news */}
                {!loading && !error && (
                    <ul>
                        {news.length === 0 ? (
                            <p className="text-center text-gray-600">
                                Aucune actualité pour le moment.
                            </p>
                        ) : (
                            news.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="px-4 py-2 duration-150 hover:border-white hover:rounded-xl hover:bg-green-50"
                                >
                                    <div className="flex items-center gap-x-3">
                                        <span className="items-center text-sm">{item.date}</span>
                                        <div>
                                            <h3 className="text-red-700 text-sm font-semibold">
                                                {item.tag}
                                            </h3>
                                        </div>
                                        <div className="bg-white w-4 h-4 flex items-center justify-center">
                                            <img src={item.icon} alt="icon" className="w-4 h-4" />
                                        </div>
                                    </div>

                                    <div className="items-center pt-2 grid grid-cols-[auto_1fr] gap-4">
                                        <div className="w-[185px] h-[105px] flex items-center justify-center bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt="Image"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-sm">{item.infos}</p>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </section>
    )
}
