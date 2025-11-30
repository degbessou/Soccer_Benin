import { useState, useEffect } from 'react'

export default function Standing({ title = 'Classement', supabaseQuery, caption_green, caption_yellow, caption_red }) {
    const [standing, setStanding] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStanding = async () => {
            if (supabaseQuery) {
                const data = await supabaseQuery()
                setStanding(data || [])
            }
            setLoading(false)
        }
        fetchStanding()
    }, [supabaseQuery])

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Chargement du Standing...</p>
            </div>
        )
    }

    if (standing.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-red-600">Aucune donnée de classement disponible</p>
            </div>
        )
    }

    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

            <div className="rounded-lg overflow-hidden shadow-sm border border-gray-300">
                {/* Version Desktop */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full table-auto text-sm">
                        <thead className="bg-gray-50 font-medium border-b border-gray-300">
                            <tr>
                                <th className="py-3 px-4 text-left">#</th>
                                <th className="py-3 px-6 text-left">Équipe</th>
                                <th className="py-3 px-3 text-center">Pts</th>
                                <th className="py-3 px-3 text-center">J</th>
                                <th className="py-3 px-3 text-center">G</th>
                                <th className="py-3 px-3 text-center">N</th>
                                <th className="py-3 px-3 text-center">P</th>
                                <th className="py-3 px-3 text-center">BP</th>
                                <th className="py-3 px-3 text-center">BC</th>
                                <th className="py-3 px-3 text-center">Diff</th>
                            </tr>
                        </thead>
                        <tbody className=" divide-y divide-gray-300">
                            {standing.map((team, idx) => (
                                <tr
                                    key={team.id_standing}
                                    className={` ${idx === 0 ? 'bg-green-50' :
                                        idx === 1 ? 'bg-yellow-50' :
                                            idx >= standing.length - 2 ? 'bg-red-50' : ''
                                        }`}
                                >
                                    <td className="py-3 px-4">
                                        <span className={`font-bold ${idx === 0 ? 'text-green-600' :
                                            idx === 1 ? 'text-yellow-600' :
                                                idx >= standing.length - 2 ? 'text-red-600' :
                                                    'text-gray-800'
                                            }`}>
                                            {team.position || idx + 1}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <div className="flex items-center gap-3">
                                            {team.logo_url && (
                                                <img
                                                    src={team.logo_url}
                                                    alt={team.nom_equipe}
                                                    className="w-8 h-8 object-contain"
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                            )}
                                            <span className="font-medium">{team.nom_equipe || team.abreviation}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3 text-center font-bold text-gray-800">{team.points}</td>
                                    <td className="py-3 text-gray-600 px-3 text-center">{team.matchs_joues}</td>
                                    <td className="py-3 text-gray-600 px-3 text-center">{team.victoires}</td>
                                    <td className="py-3 text-gray-600 px-3 text-center">{team.nuls}</td>
                                    <td className="py-3 text-gray-600 px-3 text-center">{team.defaites}</td>
                                    <td className="py-3 text-gray-600 px-3 text-center">{team.buts_pour}</td>
                                    <td className="py-3 text-gray-600 px-3 text-center">{team.buts_contre}</td>
                                    <td className={`py-3 px-3 text-center font-medium ${team.difference_buts > 0 ? 'text-green-600' :
                                        team.difference_buts < 0 ? 'text-red-600' :
                                            ''
                                        }`}>
                                        {team.difference_buts > 0 ? '+' : ''}{team.difference_buts}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Version Mobile */}
                <div className="md:hidden">
                    {standing.map((team, idx) => (
                        <div
                            key={team.id_standing}
                            className={`p-4 border-b border-gray-300 ${idx === 0 ? 'bg-green-50' :
                                idx === 1 ? 'bg-yellow-50' :
                                    idx >= standing.length - 2 ? 'bg-red-50' : ''
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <span className={`text-lg font-bold ${idx === 0 ? 'text-green-600' :
                                        idx === 1 ? 'text-yellow-600' :
                                            idx >= standing.length - 2 ? 'text-red-600' :
                                                'text-gray-800'
                                        }`}>
                                        {team.position || idx + 1}
                                    </span>
                                    {team.logo_url && (
                                        <img
                                            src={team.logo_url}
                                            alt={team.nom_equipe}
                                            className="w-8 h-8 object-contain"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                    <span className="font-medium text-sm">{team.nom_equipe || team.abreviation}</span>
                                </div>
                                <span className="text-xl font-bold text-yellow-600">{team.points}</span>
                            </div>
                            <div className="grid grid-cols-5 gap-2 text-xs  mt-2">
                                <div className="text-center">
                                    <div className="font-medium">J</div>
                                    <div>{team.matchs_joues}</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-medium text-green-600">G</div>
                                    <div>{team.victoires}</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-medium">N</div>
                                    <div>{team.nuls}</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-medium text-red-600">P</div>
                                    <div>{team.defaites}</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-medium">Diff</div>
                                    <div className={
                                        team.difference_buts > 0 ? 'text-green-600' :
                                            team.difference_buts < 0 ? 'text-red-600' : ''
                                    }>
                                        {team.difference_buts > 0 ? '+' : ''}{team.difference_buts}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Légende */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm ">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span>{caption_green}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                    <span>{caption_yellow}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                    <span>{caption_red}</span>
                </div>
            </div>
        </div>
    )
}