import { useState, useEffect, useRef } from 'react'
import * as Select from "@radix-ui/react-select"
import React from "react"
import DownloadButton from '../assets/DownloadButton'
import CaptureOverlay from '../assets/CaptureOverlay'
import ScheduleCaptureTournament from './ScheduleCaptureTournament'

const TOURS = [
    { value: 'all', label: 'Tous les tours', order: 0 },
    { value: 'Tour 1', label: 'Tour 1', order: 1 },
    { value: 'Tour 2', label: 'Tour 2', order: 2 },
    { value: 'Quarts de finale', label: 'Quarts de finale', order: 3 },
    { value: 'Demi-finale', label: 'Demi-finale', order: 4 },
    { value: 'Finale', label: 'Finale', order: 5 },
]

export default function ScheduleTournament({
    supabaseQuery,
    logoUrl,
    title,
    subtitle,
    externalDownloadRef,
    externalOnCapturing,
    externalDownloadFilename,
}) {
    const [selectedTour, setSelectedTour] = useState('all')
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)

    const internalCaptureRef = useRef(null)
    const captureRef = externalDownloadRef ?? internalCaptureRef

    const [isCapturing, setIsCapturing] = useState(false)
    const onCapturing = externalOnCapturing ?? setIsCapturing

    const showInternalCapture = !externalDownloadRef

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
                setSelectedTour(getCurrentTour(matchesWithStatus))
            }
            setLoading(false)
        }
        fetchMatches()
    }, [supabaseQuery])

    const getCurrentTour = (matchesData) => {
        const orderedTours = TOURS.filter(t => t.value !== 'all').sort((a, b) => a.order - b.order)
        for (let tour of orderedTours) {
            const matchsTour = matchesData.filter(m => m.phase === tour.value)
            if (matchsTour.length === 0) continue
            const hasUnfinished = matchsTour.some(m => m.statut !== 'finished' && m.statut !== 'postponed')
            if (hasUnfinished) return tour.value
        }
        return 'Finale'
    }

    const toursDisponibles = TOURS.filter(t =>
        t.value === 'all' || matches.some(m => m.phase === t.value)
    )

    const filteredMatches = matches.filter(match =>
        selectedTour === 'all' || match.phase === selectedTour
    )

    const groupedByTour = filteredMatches.reduce((acc, match) => {
        const key = match.phase || 'Inconnu'
        if (!acc[key]) acc[key] = []
        acc[key].push(match)
        return acc
    }, {})

    const sortedTourEntries = Object.entries(groupedByTour).sort(([a], [b]) => {
        const orderA = TOURS.find(t => t.value === a)?.order ?? 99
        const orderB = TOURS.find(t => t.value === b)?.order ?? 99
        return orderA - orderB
    })

    const filtersInfo = selectedTour === 'all' ? 'Tous les tours' : selectedTour

    const statutLabel = (statut) =>
        statut === 'finished' ? 'Terminé' :
            statut === 'live' ? 'En cours' :
                statut === 'postponed' ? 'Reporté' :
                    statut === 'pending' ? 'En attente' : 'À venir'

    const statutClass = (statut) =>
        statut === 'finished' ? 'bg-green-100 text-green-700' :
            statut === 'live' ? 'bg-red-100 text-red-700' :
                statut === 'postponed' ? 'bg-orange-100 text-orange-700' :
                    statut === 'pending' ? 'bg-gray-100 text-gray-700' :
                        'bg-yellow-100 text-yellow-700'

    return (
        <>
            {showInternalCapture && <CaptureOverlay isCapturing={isCapturing} />}

            <div className="max-w-screen-lg mx-auto px-4 md:px-8 py-8">
                {/* Filtres */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Select.Root value={selectedTour} onValueChange={setSelectedTour}>
                                <Select.Trigger className="w-48 inline-flex items-center justify-between px-3 py-2 text-sm text-yellow-600 bg-white border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-yellow-600 focus:ring-2">
                                    <Select.Value placeholder="Choisir un tour" />
                                    <Select.Icon className="text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content position="popper" side="bottom" align="start" sideOffset={5}
                                        className="w-[var(--radix-select-trigger-width)] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg text-sm z-50">
                                        <Select.Viewport>
                                            {toursDisponibles.map(tour => (
                                                <SelectItem key={tour.value} value={tour.value}>
                                                    {tour.label}
                                                </SelectItem>
                                            ))}
                                        </Select.Viewport>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        </div>

                        <div className='flex-1 flex justify-end'>
                            <DownloadButton
                                refToCapture={captureRef}
                                filename={externalDownloadFilename ?? "tournoi.png"}
                                label="Télécharger"
                                onCapturing={onCapturing}
                            />
                        </div>
                    </div>
                </div>

                {/* Tableau des matchs */}
                <div>
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Chargement...</p>
                        </div>
                    ) : sortedTourEntries.length === 0 || sortedTourEntries.every(([, m]) => m.length === 0) ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-red-600">Aucun match trouvé pour ce tour</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {sortedTourEntries.map(([tour, tourMatches]) => (
                                tourMatches.length > 0 && (
                                    <div key={tour} className="rounded-lg overflow-hidden shadow-sm">
                                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
                                            <h4 className="font-semibold text-gray-800">{tour}</h4>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full table-auto text-sm">
                                                <tbody className="divide-y divide-gray-300">
                                                    {tourMatches.map(match => (
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
                                                                    <div className="flex flex-col items-center">
                                                                        <span className="font-bold text-gray-800">
                                                                            {match.buts_domicile} - {match.buts_exterieur}
                                                                        </span>
                                                                        {match.buts_peno_domicile !== null && match.buts_peno_exterieur !== null && (
                                                                            <span className="text-xs text-gray-500 mt-0.5">
                                                                                TAB {match.buts_peno_domicile}-{match.buts_peno_exterieur}
                                                                            </span>
                                                                        )}
                                                                    </div>
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
                                                                                <div className="flex flex-col items-center">
                                                                                    <span className="font-bold text-gray-800 text-base">
                                                                                        {match.buts_domicile} - {match.buts_exterieur}
                                                                                    </span>
                                                                                    {match.buts_peno_domicile !== null && match.buts_peno_exterieur !== null && (
                                                                                        <span className="text-xs text-gray-500">
                                                                                            TAB {match.buts_peno_domicile}-{match.buts_peno_exterieur}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
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
                                )
                            ))}
                        </div>
                    )}

                    {showInternalCapture && (
                        <ScheduleCaptureTournament
                            ref={internalCaptureRef}
                            logoUrl={logoUrl}
                            title={title}
                            subtitle={subtitle}
                            filtersInfo={filtersInfo}
                            groupedMatches={groupedByTour}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
    return (
        <Select.Item
            className="flex items-center justify-between px-3 cursor-default py-2 duration-150 data-[state=checked]:text-yellow-600 data-[state=checked]:bg-yellow-50 data-[highlighted]:text-yellow-600 data-[highlighted]:bg-yellow-50 outline-none"
            {...props}
            ref={forwardedRef}
        >
            <Select.ItemText>
                <div className="pr-4 line-clamp-1">{children}</div>
            </Select.ItemText>
            <div className="w-6">
                <Select.ItemIndicator>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </Select.ItemIndicator>
            </div>
        </Select.Item>
    )
})