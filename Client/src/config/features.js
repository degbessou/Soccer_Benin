// Bascule globale de la fonctionnalité de capture / téléchargement d'image
// (calendriers & classements).
//
// Quand elle vaut `false`, la possibilité de faire une capture est retirée :
// - le bouton de téléchargement n'est plus rendu,
// - les composants de capture cachés (rendus hors écran pour être photographiés)
//   ne sont plus produits dans le DOM.
//
// Passer à `true` pour réactiver la fonctionnalité.
export const CAPTURE_ENABLED = false
