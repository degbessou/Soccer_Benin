import { useState, useEffect } from 'react'
import * as Select from "@radix-ui/react-select"
import React from "react"

// Libellés + couleurs des statuts, alignés sur les valeurs stockées en base
// par le back-office ("a_venir", "en_cours", "termine", "reporte", "annule").
const STATUTS = {
    a_venir: { label: 'À venir', cls: 'bg-yellow-100 text-yellow-700' },
    en_cours: { label: 'En cours', cls: 'bg-red-100 text-red-700' },
    termine: { label: 'Terminé', cls: 'bg-green-100 text-green-700' },
    reporte: { label: 'Reporté', cls: 'bg-orange-100 text-orange-700' },
    annule: { label: 'Annulé', cls: 'bg-red-200 text-red-800' },
}

const statutLabel = (s) => STATUTS[s]?.label ?? 'À venir'
const statutClass = (s) => STATUTS[s]?.cls ?? 'bg-gray-100 text-gray-700'

const formatDate = (d) =>
    d ? new Date(`${d}T00:00:00`).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : ''

const formatHeure = (h) => (h ? h.slice(0, 5) : null)

// Met le Bénin en valeur dans la ligne (nom en gras + accent).
const isBenin = (name) => (name || '').trim().toLowerCase() === 'bénin'
const teamClass = (name) => (isBenin(name) ? 'font-bold text-yellow-700' : 'font-medium text-gray-800')

export default function InternationalSchedule({ supabaseQuery }) {
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategorie, setSelectedCategorie] = useState('all')
    const [selectedCompetition, setSelectedCompetition] = useState('all')

    useEffect(() => {
        const fetchMatches = async () => {
            if (supabaseQuery) {
                const data = await supabaseQuery()
                setMatches(data || [])
            }
            setLoading(false)
        }
        fetchMatches()
    }, [supabaseQuery])

    const categories = [...new Set(matches.map(m => m.categorie).filter(Boolean))]
    const competitions = [...new Set(matches.map(m => m.competition).filter(Boolean))]

    const filtered = matches.filter(m =>
        (selectedCategorie === 'all' || m.categorie === selectedCategorie) &&
        (selectedCompetition === 'all' || m.competition === selectedCompetition)
    )

    // Comparateur date + heure croissant
    const byDateAsc = (a, b) =>
        `${a.date}T${a.heure || '00:00:00'}`.localeCompare(`${b.date}T${b.heure || '00:00:00'}`)

    // « Résultats » = matchs terminés, plus récents en premier.
    const resultats = filtered.filter(m => m.statut === 'termine').sort((a, b) => byDateAsc(b, a))
    // « À venir » = tout le reste (à venir, en cours, reporté, annulé), plus proches en premier.
    const aVenir = filtered.filter(m => m.statut !== 'termine').sort(byDateAsc)

    const renderScore = (m) => {
        if (m.statut === 'termine' && m.buts_domicile != null && m.buts_exterieur != null) {
            return (
                <div className="flex flex-col items-center">
                    <span className="text-base font-bold text-gray-800 whitespace-nowrap">{m.buts_domicile} - {m.buts_exterieur}</span>
                    {m.tab && m.tab_domicile != null && m.tab_exterieur != null && (
                        <span className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">
                            t.a.b. {m.tab_domicile}-{m.tab_exterieur}
                        </span>
                    )}
                </div>
            )
        }
        return <span className="text-base text-gray-400">vs</span>
    }

    const Section = ({ titre, data }) => {
        if (data.length === 0) return null
        return (
            <div className="rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
                    <h4 className="font-semibold text-gray-800">{titre}</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed text-sm">
                        {/* Largeurs fixes pour aligner toutes les lignes (pas de zig-zag) */}
                        <colgroup className="hidden md:table-column-group">
                            <col className="w-[13%]" />{/* date */}
                            <col className="w-[16%]" />{/* compétition • lieu */}
                            <col className="w-[10%]" />{/* catégorie */}
                            <col className="w-[22%]" />{/* domicile */}
                            <col className="w-[8%]" />{/* score */}
                            <col className="w-[22%]" />{/* extérieur */}
                            <col className="w-[9%]" />{/* statut */}
                        </colgroup>
                        <tbody className="divide-y divide-gray-300">
                            {data.map(m => (
                                <tr key={m.id} className="hover:bg-gray-50">

                                    {/* Desktop */}
                                    <td className="hidden md:table-cell text-gray-400 px-4 py-4 whitespace-nowrap align-middle">
                                        <div className="text-xs">{formatDate(m.date)}</div>
                                        {formatHeure(m.heure) && (
                                            <div className="text-xs">{formatHeure(m.heure)}</div>
                                        )}
                                    </td>
                                    <td className="hidden md:table-cell text-gray-400 px-3 py-4 text-xs align-middle">
                                        {m.competition}{m.lieu ? ` • ${m.lieu}` : ''}
                                    </td>
                                    <td className="hidden md:table-cell px-3 py-4 align-middle">
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs">
                                            {m.categorie}
                                        </span>
                                    </td>
                                    <td className={`hidden md:table-cell px-3 py-4 text-right text-base align-middle ${teamClass(m.equipe_domicile)}`}>
                                        {m.equipe_domicile}
                                    </td>
                                    <td className="hidden md:table-cell px-2 py-4 text-center align-middle">
                                        {renderScore(m)}
                                    </td>
                                    <td className={`hidden md:table-cell px-3 py-4 text-base align-middle ${teamClass(m.equipe_exterieur)}`}>
                                        {m.equipe_exterieur}
                                    </td>
                                    <td className="hidden md:table-cell px-2 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statutClass(m.statut)}`}>
                                            {statutLabel(m.statut)}
                                        </span>
                                    </td>

                                    {/* Mobile */}
                                    <td className="md:hidden px-4 py-3 w-full" colSpan="7">
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    {formatDate(m.date)}{formatHeure(m.heure) ? ` • ${formatHeure(m.heure)}` : ''}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statutClass(m.statut)}`}>
                                                    {statutLabel(m.statut)}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
                                                <span>{m.competition}</span>
                                                <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                                    {m.categorie}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className={`text-base text-right flex-1 ${teamClass(m.equipe_domicile)}`}>
                                                    {m.equipe_domicile}
                                                </div>
                                                <div className="flex flex-col items-center mx-3 min-w-[70px]">
                                                    {renderScore(m)}
                                                </div>
                                                <div className={`text-base flex-1 ${teamClass(m.equipe_exterieur)}`}>
                                                    {m.equipe_exterieur}
                                                </div>
                                            </div>
                                            {m.lieu && (
                                                <div className="text-xs text-gray-400 text-center">📍 {m.lieu}</div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-screen-lg mx-auto px-4 md:px-8 py-8">
            {/* Filtres */}
            <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Filtre Catégorie */}
                    <FilterSelect
                        value={selectedCategorie}
                        onValueChange={setSelectedCategorie}
                        placeholder="Choisir une catégorie"
                        allLabel="Toutes les catégories"
                        options={categories}
                    />
                    {/* Filtre Compétition */}
                    <FilterSelect
                        value={selectedCompetition}
                        onValueChange={setSelectedCompetition}
                        placeholder="Choisir une compétition"
                        allLabel="Toutes les compétitions"
                        options={competitions}
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">Chargement...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-red-600">Aucun match trouvé pour cette sélection</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <Section titre="À venir" data={aVenir} />
                    <Section titre="Résultats" data={resultats} />
                </div>
            )}
        </div>
    )
}

function FilterSelect({ value, onValueChange, placeholder, allLabel, options }) {
    return (
        <div className="flex items-center gap-2">
            <Select.Root value={value} onValueChange={onValueChange}>
                <Select.Trigger className="w-56 inline-flex items-center justify-between px-3 py-2 text-sm text-yellow-600 bg-white border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-yellow-600 focus:ring-2">
                    <Select.Value placeholder={placeholder} />
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
                            <SelectItem value="all">{allLabel}</SelectItem>
                            {options.map(opt => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
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
