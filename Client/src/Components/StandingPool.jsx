// components/StandingPool.jsx
import { useState, useEffect, useRef } from 'react'
import DownloadButton from '../assets/DownloadButton'
import CaptureOverlay from '../assets/CaptureOverlay'

export default function StandingPool({
    title = 'Classement',
    supabaseQuery,
    captionGreen,
    captionRed,
    // Props mode externe (2 poules)
    externalDownloadRef,
    externalOnCapturing,
    externalDownloadFilename,
    externalDataReady,
}) {
    const [standing, setStanding] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCapturing, setIsCapturing] = useState(false)

    const onCapturing = externalOnCapturing ?? setIsCapturing
    const showInternalCapture = !externalDownloadRef

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
                <p className="text-gray-600">Chargement du classement...</p>
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

    const lastIndex = standing.length - 1

    return (
        <>
            {showInternalCapture && <CaptureOverlay isCapturing={isCapturing} />}

            <div className="max-w-screen-lg mx-auto px-4 md:px-8 py-8">

                {/* Titre + bouton */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    {externalDownloadRef && (
                        <DownloadButton
                            refToCapture={externalDownloadRef}
                            filename={externalDownloadFilename ?? "classement-poules.png"}
                            label="Télécharger classement"
                            onCapturing={onCapturing}
                            disabled={externalDataReady === false}
                        />
                    )}
                </div>

                <div className="rounded-lg overflow-hidden shadow-sm border border-gray-300">
                    {/* Desktop */}
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
                            <tbody className="divide-y divide-gray-300">
                                {standing.map((team, idx) => {
                                    const isPromoted = idx === 0
                                    const isRelegated = idx === lastIndex
                                    return (
                                        <tr key={team.id_standing || team.abreviation}
                                            className={isPromoted ? 'bg-green-50' : isRelegated ? 'bg-red-50' : ''}
                                        >
                                            <td className="py-3 px-4 font-bold">
                                                <span className={isPromoted ? 'text-green-600' : isRelegated ? 'text-red-600' : 'text-gray-800'}>
                                                    {team.position || idx + 1}
                                                </span>
                                            </td>
                                            <td className="py-3 px-6">
                                                <div className="flex items-center gap-3">
                                                    {team.logo_url && (
                                                        <img src={team.logo_url} alt={team.nom_equipe}
                                                            className="w-8 h-8 object-contain"
                                                            onError={(e) => (e.currentTarget.style.display = 'none')} />
                                                    )}
                                                    <span className="font-medium">{team.nom_equipe || team.abreviation}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 text-center font-bold">{team.points}</td>
                                            <td className="py-3 px-3 text-center">{team.matchs_joues}</td>
                                            <td className="py-3 px-3 text-center">{team.victoires}</td>
                                            <td className="py-3 px-3 text-center">{team.nuls}</td>
                                            <td className="py-3 px-3 text-center">{team.defaites}</td>
                                            <td className="py-3 px-3 text-center">{team.buts_pour}</td>
                                            <td className="py-3 px-3 text-center">{team.buts_contre}</td>
                                            <td className={`py-3 px-3 text-center font-medium ${team.difference_buts > 0 ? 'text-green-600' : team.difference_buts < 0 ? 'text-red-600' : ''}`}>
                                                {team.difference_buts > 0 ? '+' : ''}{team.difference_buts}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden">
                        {standing.map((team, idx) => {
                            const isPromoted = idx === 0
                            const isRelegated = idx === lastIndex
                            return (
                                <div key={team.id_standing || team.abreviation}
                                    className={`p-4 border-b border-gray-300 ${isPromoted ? 'bg-green-50' : isRelegated ? 'bg-red-50' : ''}`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-lg font-bold ${isPromoted ? 'text-green-600' : isRelegated ? 'text-red-600' : 'text-gray-800'}`}>
                                                {team.position || idx + 1}
                                            </span>
                                            {team.logo_url && (
                                                <img src={team.logo_url} alt={team.nom_equipe}
                                                    className="w-8 h-8 object-contain"
                                                    onError={(e) => (e.currentTarget.style.display = 'none')} />
                                            )}
                                            <span className="font-medium text-sm">{team.nom_equipe || team.abreviation}</span>
                                        </div>
                                        <span className="text-xl font-bold text-gray-800">{team.points}</span>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2 text-xs mt-2">
                                        <div className="text-center"><div className="font-medium">J</div><div>{team.matchs_joues}</div></div>
                                        <div className="text-center"><div className="font-medium text-green-600">G</div><div>{team.victoires}</div></div>
                                        <div className="text-center"><div className="font-medium">N</div><div>{team.nuls}</div></div>
                                        <div className="text-center"><div className="font-medium text-red-600">P</div><div>{team.defaites}</div></div>
                                        <div className="text-center">
                                            <div className="font-medium">Diff</div>
                                            <div className={team.difference_buts > 0 ? 'text-green-600' : team.difference_buts < 0 ? 'text-red-600' : ''}>
                                                {team.difference_buts > 0 ? '+' : ''}{team.difference_buts}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Légende */}
                <div className="mt-6 flex flex-col gap-2 text-sm md:flex-row md:gap-4">
                    {captionGreen && (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                            <span>{captionGreen}</span>
                        </div>
                    )}
                    {captionRed && (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                            <span>{captionRed}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}