// assets/matchUtils.js

export const statutLabel = (statut) =>
    statut === 'finished' ? 'Terminé' :
        statut === 'live' ? 'En cours' :
            statut === 'postponed' ? 'Reporté' :
                statut === 'pending' ? 'En attente' : 'À venir'

export const statutClass = (statut) =>
    statut === 'finished' ? 'bg-green-100 text-green-700' :
        statut === 'live' ? 'bg-red-100 text-red-700' :
            statut === 'postponed' ? 'bg-orange-100 text-orange-700' :
                statut === 'pending' ? 'bg-gray-100 text-gray-700' :
                    'bg-yellow-100 text-yellow-700'