import { useState, useEffect, useRef } from 'react'
import * as Select from "@radix-ui/react-select"
import React from "react"
import DownloadButton from '../assets/DownloadButton'
import ScheduleCapture from './ScheduleCapture'
import CaptureOverlay from '../assets/CaptureOverlay'

export default function LeagueCalendar({
    supabaseQuery,
    totalJournees = 34,
    showPhaseFilter = true,
    showTeamFilter = true,
    logoUrl, title, subtitle,
    // Props pour le mode "2 poules" : le bouton pointe vers une ref externe
    // et ScheduleCapture interne n'est pas rendu
    externalDownloadRef,
    externalOnCapturing,
    externalDownloadFilename,
}) {
    const [selectedJournee, setSelectedJournee] = useState(null)
    const [showAllJournees, setShowAllJournees] = useState(false)
    const [selectedPhase, setSelectedPhase] = useState('all')
    const [selectedTeam, setSelectedTeam] = useState('all')
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)

    // Ref interne — utilisée seulement si pas de ref externe (mode poule unique)
    const internalCaptureRef = useRef(null)
    const captureRef = externalDownloadRef ?? internalCaptureRef

    const [isCapturing, setIsCapturing] = useState(false)
    const onCapturing = externalOnCapturing ?? setIsCapturing

    // Détermine si on affiche le ScheduleCapture interne
    const showInternalCapture = !externalDownloadRef

    useEffect(() => {
        const fetchMatches = async () => {
            if (supabaseQuery) {
                const data = await supabaseQuery()

                const now = new Date()
                const matchesWithStatus = data.map(match => {
                    if (match.statut === 'postponed') return match
                    if (match.buts_domicile !== null && match.buts_exterieur !== null) {
                        return { ...match, statut: 'finished' }
                    }

                    const matchesSameJournee = data.filter(m =>
                        m.numero === match.numero && m.statut !== 'postponed'
                    )
                    const datesJournee = matchesSameJournee.map(m => new Date(m.date_match))
                    const minDate = new Date(Math.min(...datesJournee))
                    const maxDate = new Date(Math.max(...datesJournee))
                    const journeeStart = new Date(minDate)
                    journeeStart.setHours(0, 0, 0, 0)
                    const journeeEnd = new Date(maxDate)
                    journeeEnd.setHours(23, 59, 59, 999)

                    if (now >= journeeStart && now <= journeeEnd) return { ...match, statut: 'live' }
                    if (now < journeeStart) return { ...match, statut: 'upcoming' }
                    return { ...match, statut: 'pending' }
                })

                setMatches(matchesWithStatus)

                if (selectedJournee === null && matchesWithStatus.length > 0) {
                    const currentJournee = getCurrentJournee(matchesWithStatus)
                    setSelectedJournee(currentJournee)
                }
            }
            setLoading(false)
        }
        fetchMatches()
    }, [supabaseQuery])

    const getCurrentJournee = (matchesData) => {
        const now = new Date()
        const journeesUniques = [...new Set(matchesData.map(m => m.numero))].sort((a, b) => a - b)
        for (let journee of journeesUniques) {
            const matchsJournee = matchesData.filter(m => m.numero === journee)
            const datesJournee = matchsJournee.map(m => new Date(m.date_match))
            const maxDate = new Date(Math.max(...datesJournee))
            maxDate.setDate(maxDate.getDate() + 2)
            if (now <= maxDate) return journee
        }
        return journeesUniques[journeesUniques.length - 1] || 1
    }

    const teams = [...new Set(matches.flatMap(m => [m.equipe_domicile, m.equipe_exterieur]))].sort()

    const getJourneeRange = () => {
        if (selectedPhase === 'aller') return { min: 1, max: Math.floor(totalJournees / 2) }
        if (selectedPhase === 'retour') return { min: Math.floor(totalJournees / 2) + 1, max: totalJournees }
        return { min: 1, max: totalJournees }
    }

    const journeeRange = getJourneeRange()

    const handlePreviousJournee = () => {
        setSelectedJournee(prev => prev > journeeRange.min ? prev - 1 : journeeRange.max)
    }
    const handleNextJournee = () => {
        setSelectedJournee(prev => prev < journeeRange.max ? prev + 1 : journeeRange.min)
    }

    useEffect(() => {
        if (selectedPhase !== 'all') {
            const range = getJourneeRange()
            if (selectedJournee < range.min || selectedJournee > range.max) {
                setSelectedJournee(range.min)
            }
        }
    }, [selectedPhase])

    useEffect(() => {
        setShowAllJournees(false)
    }, [selectedTeam])

    const filteredMatches = matches.filter(match => {
        const journeeMatch = showAllJournees ? true : match.numero === selectedJournee
        const phaseMatch = !showPhaseFilter || selectedPhase === 'all' || match.phase === selectedPhase
        const teamMatch = !showTeamFilter || selectedTeam === 'all' ||
            match.equipe_domicile === selectedTeam ||
            match.equipe_exterieur === selectedTeam
        return journeeMatch && phaseMatch && teamMatch
    })

    const groupedMatches = showAllJournees
        ? filteredMatches.reduce((acc, match) => {
            const key = match.numero
            if (!acc[key]) acc[key] = []
            acc[key].push(match)
            return acc
        }, {})
        : { [selectedJournee]: filteredMatches }

    return (
        <>
            {/* CaptureOverlay interne seulement si pas de gestion externe */}
            {showInternalCapture && <CaptureOverlay isCapturing={isCapturing} />}

            <div className="max-w-screen-lg mx-auto px-4 md:px-8 py-8">
                {/* Filtres */}
                <div className="mb-8 hide-on-capture">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Filtre Journée */}
                        {!showAllJournees && (
                            <div className="flex items-center gap-2">
                                <div className="h-10 flex items-center gap-1 bg-white border border-gray-300 rounded-lg shadow-sm">
                                    <button
                                        onClick={handlePreviousJournee}
                                        className="px-1 py-2 hover:bg-gray-50 hover:text-yellow-600 transition-colors rounded-l-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <div className="px-2 py-2 min-w-[70px] text-center font-semibold text-yellow-600 border-x border-gray-300">
                                        J{selectedJournee}
                                    </div>
                                    <button
                                        onClick={handleNextJournee}
                                        className="px-1 py-2 hover:bg-gray-50 hover:text-yellow-600 transition-colors rounded-r-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Toutes les journées — seulement si équipe sélectionnée */}
                        {selectedTeam !== 'all' && (
                            <div className="flex items-center gap-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showAllJournees}
                                        onChange={(e) => setShowAllJournees(e.target.checked)}
                                        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-600"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Toutes les journées</span>
                                </label>
                            </div>
                        )}

                        {/* Filtre Phase */}
                        {showPhaseFilter && (
                            <div className="flex items-center gap-2">
                                <Select.Root value={selectedPhase} onValueChange={setSelectedPhase}>
                                    <Select.Trigger className="w-48 inline-flex items-center justify-between px-3 py-2 text-sm text-yellow-600 bg-white border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-yellow-600 focus:ring-2">
                                        <Select.Value placeholder="Choisir une phase" />
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
                                                <SelectItem value="all">Toutes les phases</SelectItem>
                                                <SelectItem value="aller">ALLER</SelectItem>
                                                <SelectItem value="retour">RETOUR</SelectItem>
                                            </Select.Viewport>
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Root>
                            </div>
                        )}

                        {/* Filtre Équipe */}
                        {showTeamFilter && (
                            <div className="flex items-center gap-2">
                                <Select.Root value={selectedTeam} onValueChange={setSelectedTeam}>
                                    <Select.Trigger className="w-48 inline-flex items-center justify-between px-3 py-2 text-sm text-yellow-600 bg-white border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-yellow-600 focus:ring-2">
                                        <Select.Value placeholder="Choisir une équipe" />
                                        <Select.Icon className="text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                            </svg>
                                        </Select.Icon>
                                    </Select.Trigger>
                                    <Select.Portal>
                                        <Select.Content position="popper" side="bottom" align="start" sideOffset={5}
                                            className="w-[var(--radix-select-trigger-width)] max-h-[300px] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg text-sm z-50">
                                            <Select.Viewport>
                                                <SelectItem value="all">Toutes les équipes</SelectItem>
                                                {teams.map(team => (
                                                    <SelectItem key={team} value={team}>{team}</SelectItem>
                                                ))}
                                            </Select.Viewport>
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Root>
                            </div>
                        )}

                        {/* Bouton téléchargement — toujours dans la ligne des filtres */}
                        <div className='flex-1 flex justify-end'>
                            <DownloadButton
                                refToCapture={captureRef}
                                filename={externalDownloadFilename ?? "calendrier.png"}
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
                    ) : Object.keys(groupedMatches).length === 0 || Object.values(groupedMatches).every(arr => arr.length === 0) ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-red-600">Aucun match trouvé pour cette sélection</p>
                            <p className="text-sm text-gray-500 mt-2">
                                {!showAllJournees && `Journée ${selectedJournee} - `}
                                Phase: {selectedPhase === 'all' ? 'Toutes' : selectedPhase}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {Object.entries(groupedMatches).sort(([a], [b]) => Number(a) - Number(b)).map(([journee, journeeMatches]) => (
                                journeeMatches.length > 0 && (
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
                                                            <td className="hidden md:table-cell text-gray-500 px-6 py-4 whitespace-nowrap">{match.stade}</td>
                                                            <td className="hidden md:table-cell px-6 py-4 text-right font-medium">{match.equipe_domicile}</td>
                                                            <td className="hidden md:table-cell px-6 py-4 text-center">
                                                                {match.statut === 'finished' ? (
                                                                    <span className="font-bold text-gray-800">{match.buts_domicile} - {match.buts_exterieur}</span>
                                                                ) : (
                                                                    <span className="text-gray-400">vs</span>
                                                                )}
                                                            </td>
                                                            <td className="hidden md:table-cell px-6 py-4 font-medium">{match.equipe_exterieur}</td>
                                                            <td className="hidden md:table-cell px-6 py-4 text-center">
                                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${match.statut === 'finished' ? 'bg-green-100 text-green-700' :
                                                                    match.statut === 'live' ? 'bg-red-100 text-red-700' :
                                                                        match.statut === 'postponed' ? 'bg-orange-100 text-orange-700' :
                                                                            match.statut === 'pending' ? 'bg-gray-100 text-gray-700' :
                                                                                'bg-yellow-100 text-yellow-700'
                                                                    }`}>
                                                                    {match.statut === 'finished' ? 'Terminé' :
                                                                        match.statut === 'live' ? 'En cours' :
                                                                            match.statut === 'postponed' ? 'Reporté' :
                                                                                match.statut === 'pending' ? 'En attente' : 'À venir'}
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
                                                                                <span className="font-bold text-gray-800 text-base">{match.buts_domicile} - {match.buts_exterieur}</span>
                                                                            ) : (
                                                                                <span className="text-gray-400 text-sm">vs</span>
                                                                            )}
                                                                            <span className={`mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${match.statut === 'finished' ? 'bg-green-100 text-green-700' :
                                                                                match.statut === 'live' ? 'bg-red-100 text-red-700' :
                                                                                    match.statut === 'postponed' ? 'bg-orange-100 text-orange-700' :
                                                                                        match.statut === 'pending' ? 'bg-gray-100 text-gray-700' :
                                                                                            'bg-yellow-100 text-yellow-700'
                                                                                }`}>
                                                                                {match.statut === 'finished' ? 'Terminé' :
                                                                                    match.statut === 'live' ? 'En cours' :
                                                                                        match.statut === 'postponed' ? 'Reporté' :
                                                                                            match.statut === 'pending' ? 'En attente' : 'À venir'}
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

                    {/* ScheduleCapture interne — seulement en mode poule unique */}
                    {showInternalCapture && (
                        <ScheduleCapture
                            ref={internalCaptureRef}
                            logoUrl={logoUrl}
                            title={title}
                            subtitle={subtitle}
                            filtersInfo={`Journée ${selectedJournee} • ${selectedPhase === 'all' ? 'Toutes phases' : selectedPhase}${selectedTeam !== 'all' ? ` • ${selectedTeam}` : ''}`}
                            groupedMatches={groupedMatches}
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