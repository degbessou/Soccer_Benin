export const getSupabaseImageUrl = (path) => {
    if (!path) return null;
    // Si c'est déjà une URL complète, la retourner telle quelle
    if (path.startsWith('http')) return path;
    // Sinon, construire l'URL complète
    return `https://balpqdcvdoytjtkscgxx.supabase.co/storage/v1/object/public/${path}`;
};