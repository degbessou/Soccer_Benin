import { useState, useEffect, useRef } from 'react'
import { getSupabaseImageUrl } from '../assets/Helpers'

// Onglets : meilleures attaques (tri rang_bm, valeur = buts marqués)
// et meilleures défenses (tri rang_be, valeur = buts encaissés)
const ONGLETS = [
    { label: 'Meilleures attaques', tri: 'rang_bm', valeur: 'total_buts_marques' },
    { label: 'Meilleures défenses', tri: 'rang_be', valeur: 'total_buts_encaisses' },
]

export default function StatTeam({ title = 'Équipes', supabaseQuery }) {

    const [ongletActif, setOngletActif] = useState(ONGLETS[0].label)
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [itemSelectionne, setItemSelectionne] = useState(null)

    const activeOnglet = ONGLETS.find(o => o.label === ongletActif) || ONGLETS[0]

    // Évite les setState après démontage
    const montéRef = useRef(true)
    useEffect(() => {
        montéRef.current = true
        return () => { montéRef.current = false }
    }, [])

    // Fetch une seule fois (les deux classements viennent de la même vue)
    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            if (supabaseQuery) {
                const data = await supabaseQuery()
                if (!montéRef.current) return
                setTeams(data || [])
            }
            if (montéRef.current) setLoading(false)
        }
        fetch()
    }, [supabaseQuery])

    // Reset de la sélection au changement d'onglet
    useEffect(() => {
        setItemSelectionne(null)
    }, [ongletActif])

    // Tri par rang de l'onglet actif, limité au top 10
    const items = [...teams]
        .sort((a, b) => (a[activeOnglet.tri] ?? 0) - (b[activeOnglet.tri] ?? 0))
        .slice(0, 10)

    const item = itemSelectionne || items[0]

    return (
        <div className="max-w-screen-lg mx-auto px-4 md:px-8 py-8">

            {/* Titre */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {title}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </h2>
            </div>

            {/* Onglets */}
            <div className="flex border-b border-gray-300 mb-8">
                {ONGLETS.map(tab => (
                    <button
                        key={tab.label}
                        onClick={() => setOngletActif(tab.label)}
                        className={`px-6 py-3 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px ${ongletActif === tab.label
                            ? 'text-yellow-600 border-yellow-600'
                            : 'text-gray-500 border-transparent hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Chargement...</p>
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Aucune statistique disponible</p>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Élément affiché à gauche */}
                    <div
                        key={item.nom_equipe}
                        className="lg:w-1/3 flex flex-col items-center text-center transition-opacity duration-200"
                    >
                        {item.logo_url ? (
                            <img
                                key={getSupabaseImageUrl(item.logo_url)}
                                src={getSupabaseImageUrl(item.logo_url)}
                                alt={item.nom_equipe}
                                className="w-32 h-32 object-contain rounded-full shadow-md border-4 border-yellow-100 bg-white p-2 transition-opacity duration-200"
                                style={{ opacity: 0 }}
                                onLoad={e => { e.target.style.opacity = 1 }}
                                onError={e => { e.target.style.display = 'none' }}
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-yellow-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L3 7v6c0 5 3.8 8.5 9 9 5.2-.5 9-4 9-9V7l-9-5z" />
                                </svg>
                            </div>
                        )}

                        <h3 className="text-2xl font-bold text-gray-900 mt-4">{item.nom_equipe || item.abreviation}</h3>

                        <div className="mt-6">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                                {ongletActif === 'Meilleures attaques' ? 'Buts marqués' : 'Buts encaissés'}
                            </p>
                            <span className="text-7xl font-extrabold text-gray-900">
                                {item[activeOnglet.valeur]}
                            </span>
                        </div>
                    </div>

                    {/* Liste à droite */}
                    <div className="lg:w-2/3 flex flex-col gap-2">
                        {items.map((team, index) => {
                            const isSelected = item.nom_equipe === team.nom_equipe
                            return (
                                <div
                                    key={team.nom_equipe}
                                    onMouseEnter={() => setItemSelectionne(team)}
                                    className={`flex justify-between items-center px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 ${isSelected
                                        ? 'bg-yellow-600 border-yellow-600 text-white'
                                        : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`w-6 text-sm font-bold ${isSelected ? 'text-yellow-200' : 'text-gray-400'}`}>
                                            {index + 1}.
                                        </span>
                                        {team.logo_url && (
                                            <img
                                                src={getSupabaseImageUrl(team.logo_url)}
                                                alt={team.nom_equipe}
                                                className="w-6 h-6 object-contain"
                                                onError={e => e.target.style.display = 'none'}
                                            />
                                        )}
                                        <span className="font-semibold text-sm">{team.nom_equipe || team.abreviation}</span>
                                    </div>
                                    <span className="font-bold text-lg">{team[activeOnglet.valeur]}</span>
                                </div>
                            )
                        })}
                    </div>

                </div>
            )}
        </div>
    )
}
