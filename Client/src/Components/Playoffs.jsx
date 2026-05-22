
import { useState, useEffect, useRef } from 'react'
import { statutLabel, statutClass } from '../assets/matchsUtils'

export default function Playoffs({ supabaseQuery }) {

    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMatches = async () => {
            if (supabaseQuery) {
                const data = await supabaseQuery()

                const now = new Date()
                const matchesWithStatus = (data || []).map(match => {
                    if (match.statut === 'postponed') return match
                    if (match.buts_domicile !== null && match.buts_exterieur !== null) {
                        return { ...match, statut: 'finished' }
                    }
                    const matchDate = new Date(match.date_match)
                    const dayStart = new Date(matchDate); dayStart.setHours(0, 0, 0, 0)
                    const dayEnd = new Date(matchDate); dayEnd.setHours(23, 59, 59, 999)
                    if (now >= dayStart && now <= dayEnd) return { ...match, statut: 'live' }
                    if (now < dayStart) return { ...match, statut: 'upcoming' }
                    return { ...match, statut: 'pending' }
                })

                setMatches(matchesWithStatus)
            }
            setLoading(false)
        }
        fetchMatches()
    }, [supabaseQuery])

    // Grouper par numero (journée), trié par journée croissante
    const groupedByJournee = matches.reduce((acc, match) => {
        const key = match.journee
        if (!acc[key]) acc[key] = []
        acc[key].push(match)
        return acc
    }, {})

    const sortedJournees = Object.entries(groupedByJournee)
        .sort(([a], [b]) => Number(a) - Number(b))

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Chargement...</p>
            </div>
        )
    }

    if (matches.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-red-600">Aucun match disponible</p>
            </div>
        )
    }

    return (
        <div className="max-w-screen-lg mx-auto px-4 md:px-8 py-8">
            <div className="space-y-6">
                {sortedJournees.map(([journee, journeeMatches]) => (
                    <div key={journee} className="rounded-lg overflow-hidden shadow-sm">
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
                            <h4 className="font-semibold text-gray-800">
                                Journée {journee}
                                {journeeMatches[0]?.phase && ` - Phase ${journeeMatches[0].phase}`}
                            </h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto text-sm">
                                <tbody className="divide-y divide-gray-300">
                                    {journeeMatches.map(match => (
                                        <tr key={match.id_match} className="hover:bg-gray-50">

                                            {/* Desktop */}
                                            <td className="hidden md:table-cell text-gray-500 px-6 py-4 whitespace-nowrap">
                                                {new Date(match.date_match).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' })}
                                            </td>
                                            <td className="hidden md:table-cell text-gray-500 px-6 py-4 whitespace-nowrap">
                                                {match.stade}
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 text-right font-medium">
                                                {match.equipe_domicile}
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 text-center">
                                                {match.statut === 'finished' ? (
                                                    <span className="font-bold text-gray-800">
                                                        {match.buts_domicile} - {match.buts_exterieur}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">vs</span>
                                                )}
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 font-medium">
                                                {match.equipe_exterieur}
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statutClass(match.statut)}`}>
                                                    {statutLabel(match.statut)}
                                                </span>
                                            </td>

                                            {/* Mobile */}
                                            <td className="md:hidden px-4 py-2 w-full" colSpan="6">
                                                <div className="flex flex-col space-y-2">
                                                    <div className="text-xs text-gray-500">
                                                        {new Date(match.date_match).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' })}
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm font-medium text-right flex-1">{match.equipe_domicile}</div>
                                                        <div className="flex flex-col items-center mx-4 min-w-[80px]">
                                                            <div className="text-xs text-gray-500 mb-1">{match.stade}</div>
                                                            {match.statut === 'finished' ? (
                                                                <span className="font-bold text-gray-800 text-base">
                                                                    {match.buts_domicile} - {match.buts_exterieur}
                                                                </span>
                                                            ) : (
                                                                <span className="text-gray-400 text-sm">vs</span>
                                                            )}
                                                            <span className={`mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statutClass(match.statut)}`}>
                                                                {statutLabel(match.statut)}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm font-medium flex-1">{match.equipe_exterieur}</div>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}