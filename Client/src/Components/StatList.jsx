import { useState, useEffect, useRef } from 'react'
import { getSupabaseImageUrl } from '../assets/Helpers'

export default function StatList({ title, supabaseQuery, config }) {

  const [ongletActif, setOngletActif] = useState(config[0].label)
  const [cache, setCache] = useState({})
  const [loading, setLoading] = useState(true)
  const [itemSelectionne, setItemSelectionne] = useState(null)

  const activeConfig = config.find(c => c.label === ongletActif) || config[0]

  // Évite les setState après démontage
  const montéRef = useRef(true)
  useEffect(() => {
    montéRef.current = true
    return () => { montéRef.current = false }
  }, [])

  // Items de l'onglet actif (depuis le cache)
  const items = cache[ongletActif] || []

  // Fetch une seule fois par onglet, puis on sert depuis le cache
  useEffect(() => {
    setItemSelectionne(null)

    // Déjà en cache → affichage instantané, aucun appel réseau
    if (cache[ongletActif]) {
      setLoading(false)
      return
    }

    const fetch = async () => {
      setLoading(true)
      if (supabaseQuery) {
        const data = await supabaseQuery(activeConfig.type_stats)
        if (!montéRef.current) return
        setCache(prev => ({ ...prev, [ongletActif]: data || [] }))
      }
      if (montéRef.current) setLoading(false)
    }
    fetch()
  }, [ongletActif])

  // Précharge toutes les photos dès que la liste est disponible
  useEffect(() => {
    items.forEach(item => {
      if (item.photo) {
        const img = new Image()
        img.src = getSupabaseImageUrl(item.photo)
      }
    })
  }, [items])

  const leader = itemSelectionne || items[0]

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
        {config.map(tab => (
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

          {/* Leader affiché à gauche */}
          <div
            key={leader.id_stat}
            className="lg:w-1/3 flex flex-col items-center text-center transition-opacity duration-200"
          >
            {leader.photo ? (
              <img
                key={leader.photo}
                src={getSupabaseImageUrl(leader.photo)}
                alt={leader.nom}
                className="w-32 h-32 object-cover rounded-full shadow-md border-4 border-yellow-100 transition-opacity duration-200"
                style={{ opacity: 0 }}
                onLoad={e => { e.target.style.opacity = 1 }}
                onError={e => { e.target.style.display = 'none' }}
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-yellow-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            )}

            <h3 className="text-2xl font-bold text-gray-900 mt-4">{leader.nom}</h3>

            <div className="flex items-center gap-2 text-gray-500 text-sm mt-2 flex-wrap justify-center">
              {leader.logo_club && (
                <img
                  src={getSupabaseImageUrl(leader.logo_club)}
                  alt={leader.club}
                  className="w-5 h-5 object-contain"
                  onError={e => e.target.style.display = 'none'}
                />
              )}
              <span className="font-medium text-gray-700">{leader.club}</span>
              {leader.numero_joueur && (
                <>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>#{leader.numero_joueur}</span>
                </>
              )}
              {leader.poste && (
                <>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{leader.poste}</span>
                </>
              )}
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                {ongletActif}
              </p>
              <span className="text-7xl font-extrabold text-gray-900">
                {leader.nombre}
              </span>
            </div>
          </div>

          {/* Liste à droite */}
          <div className="lg:w-2/3 flex flex-col gap-2">
            {items.map((item, index) => {
              const isSelected = leader.id_stat === item.id_stat
              return (
                <div
                  key={item.id_stat}
                  onMouseEnter={() => setItemSelectionne(item)}
                  className={`flex justify-between items-center px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 ${isSelected
                    ? 'bg-yellow-600 border-yellow-600 text-white'
                    : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-sm font-bold ${isSelected ? 'text-yellow-200' : 'text-gray-400'}`}>
                      {index + 1}.
                    </span>
                    {item.logo_club && (
                      <img
                        src={getSupabaseImageUrl(item.logo_club)}
                        alt={item.club}
                        className="w-6 h-6 object-contain"
                        onError={e => e.target.style.display = 'none'}
                      />
                    )}
                    <div>
                      <span className="font-semibold text-sm">{item.nom}</span>
                      <span className={`text-xs ml-2 ${isSelected ? 'text-yellow-200' : 'text-gray-400'}`}>
                        {item.club}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-lg">{item.nombre}</span>
                </div>
              )
            })}
          </div>

        </div>
      )}
    </div>
  )
}