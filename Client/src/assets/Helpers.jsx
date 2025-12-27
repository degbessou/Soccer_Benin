export const getSupabaseImageUrl = (path) => {
    if (!path) return null;
    // Si c'est déjà une URL complète, la retourner telle quelle
    if (path.startsWith('http')) return path;
    // Sinon, construire l'URL complète
    return `https://balpqdcvdoytjtkscgxx.supabase.co/storage/v1/object/public/${path}`;
};

export const getPreposition = (month) => {
    if (!month || month.length === 0) return "de "  // valeur par défaut
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'à', 'é', 'è', 'ù'] // ajouter accents si besoin
    const firstLetter = month.charAt(0).toLowerCase()
    return vowels.includes(firstLetter) ? "d'" : "de "
}