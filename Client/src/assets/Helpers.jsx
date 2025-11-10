export const getSupabaseImageUrl = (path) => {
    if (!path) return null;
    // Si c'est déjà une URL complète, la retourner telle quelle
    if (path.startsWith('http')) return path;
    // Sinon, construire l'URL complète
    return `https://balpqdcvdoytjtkscgxx.supabase.co/storage/v1/object/public/${path}`;
};

// Fonction pour gérer "d'" ou "de" selon la première lettre du mois
export const getPreposition = (month) => {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y']
    const firstLetter = month.charAt(0).toLowerCase()
    return vowels.includes(firstLetter) ? "d'" : "de "
}