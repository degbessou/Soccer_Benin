import { useState, useEffect } from 'react'
import * as Select from "@radix-ui/react-select"
import React from "react"

export default function LeagueCalendar({
    supabaseQuery,
    totalJournees = 34,
    showPhaseFilter = true,
    showTeamFilter = true
}) {
    const [selectedJournee, setSelectedJournee] = useState(1)
    const [selectedPhase, setSelectedPhase] = useState('all')
    const [selectedTeam, setSelectedTeam] = useState('all')
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch des données
    useEffect(() => {
        const fetchMatches = async () => {
            if (supabaseQuery) {
                const data = await supabaseQuery()
                console.log('Données reçues:', data) // Pour debug
                setMatches(data || [])
            }
            setLoading(false)
        }
        fetchMatches()
    }, [supabaseQuery])

    // Extraire les équipes uniques depuis les données
    const teams = [...new Set(matches.flatMap(m => [m.equipe_domicile, m.equipe_exterieur]))].sort()

    const handlePreviousJournee = () => {
        setSelectedJournee(prev => prev > 1 ? prev - 1 : totalJournees)
    }

    const handleNextJournee = () => {
        setSelectedJournee(prev => prev < totalJournees ? prev + 1 : 1)
    }

    // Filtrer les matchs avec la phase maintenant disponible
    const filteredMatches = matches.filter(match => {
        const journeeMatch = match.numero === selectedJournee
        const phaseMatch = !showPhaseFilter || selectedPhase === 'all' || match.phase === selectedPhase
        const teamMatch = !showTeamFilter || selectedTeam === 'all' ||
            match.equipe_domicile === selectedTeam ||
            match.equipe_exterieur === selectedTeam
        return journeeMatch && phaseMatch && teamMatch
    })

    console.log('Matchs filtrés:', filteredMatches) // Debug

    return (
        <div className="max-w-screen-lg mx-auto px-4 md:px-8 py-8">
            {/* Filtres */}
            <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Filtre Journée avec flèches */}
                    <div className="flex items-center gap-2">
                        <div className="h-10 flex items-center gap-1 bg-white border border-gray-300 rounded-lg shadow-sm">
                            <button
                                onClick={handlePreviousJournee}
                                className="px-1 py-2 text-gray-600 hover:bg-gray-50 hover:text-yellow-600 transition-colors rounded-l-lg"
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
                                className="px-1 py-2 text-gray-600 hover:bg-gray-50 hover:text-yellow-600 transition-colors rounded-r-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Filtre Phase avec Radix */}
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
                                    <Select.Content position="popper" className="w-[var(--radix-select-trigger-width)] mt-3 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-sm text-sm z-50">
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

                    {/* Filtre Équipe avec Radix */}
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
                                    <Select.Content
                                        position="popper"
                                        side="bottom"
                                        align="start"
                                        sideOffset={5}
                                        className="w-[var(--radix-select-trigger-width)] max-h-[300px] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg text-sm z-50"
                                    >
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
                </div>
            </div>

            {/* Tableau des matchs */}
            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">Chargement...</p>
                </div>
            ) : filteredMatches.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-red-600">Aucun match trouvé pour cette sélection</p>
                    <p className="text-sm text-gray-500 mt-2">Journée {selectedJournee} - Phase: {selectedPhase === 'all' ? 'Toutes' : selectedPhase}</p>
                </div>
            ) : (
                <div className="rounded-lg overflow-hidden shadow-sm border-gray-300">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
                        <h4 className="font-semibold text-gray-800">
                            Journée {selectedJournee}
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto text-sm">
                            <tbody className="text-gray-600 divide-y divide-gray-300">
                                {filteredMatches.map(match => (
                                    <tr key={match.id_match} className="hover:bg-gray-50">
                                        {/* Version Desktop */}
                                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                            {new Date(match.date_match).toLocaleDateString('fr-FR', {
                                                weekday: 'short',
                                                day: '2-digit',
                                                month: 'short'
                                            })}
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                            {match.stade}
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 text-right font-medium">{match.equipe_domicile}</td>
                                        <td className="hidden md:table-cell px-6 py-4 text-center">
                                            {match.statut === 'finished' ? (
                                                <span className="font-bold text-gray-800">
                                                    {match.buts_domicile} - {match.buts_exterieur}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">vs</span>
                                            )}
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 font-medium">{match.equipe_exterieur}</td>
                                        <td className="hidden md:table-cell px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${match.statut === 'finished'
                                                ? 'bg-green-100 text-green-700'
                                                : match.statut === 'postponed'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {match.statut === 'finished' ? 'Terminé' :
                                                    match.statut === 'postponed' ? 'Reporté' : 'À venir'}
                                            </span>
                                        </td>

                                        {/* Version Mobile */}
                                        <td className="md:hidden px-4 py-2 w-full" colSpan="6">
                                            <div className="flex flex-col space-y-2">
                                                <div className="text-xs text-gray-500">
                                                    {new Date(match.date_match).toLocaleDateString('fr-FR', {
                                                        weekday: 'short',
                                                        day: '2-digit',
                                                        month: 'short'
                                                    })}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm font-medium text-right flex-1">{match.equipe_domicile}</div>
                                                    <div className="flex flex-col items-center mx-4 min-w-[60px]">
                                                        <div className="text-xs text-gray-500 mb-1">
                                                            {match.stade}
                                                        </div>
                                                        {match.statut === 'finished' ? (
                                                            <span className="font-bold text-gray-800 text-base">
                                                                {match.buts_domicile} - {match.buts_exterieur}
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400 text-sm">vs</span>
                                                        )}
                                                        <span className={`mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${match.statut === 'finished'
                                                            ? 'bg-green-100 text-green-700'
                                                            : match.statut === 'postponed'
                                                                ? 'bg-red-100 text-red-700'
                                                                : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {match.statut === 'finished' ? 'Terminé' :
                                                                match.statut === 'postponed' ? 'Reporté' : 'À venir'}
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
            )}
        </div>
    )
}

// Composant SelectItem pour Radix
const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
    return (
        <Select.Item
            className="flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-600 data-[state=checked]:text-yellow-600 data-[state=checked]:bg-yellow-50 data-[highlighted]:text-yellow-600 data-[highlighted]:bg-yellow-50 outline-none"
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