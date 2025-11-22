import { useEffect, useState } from "react"
import { supabase } from "../Functions/SupabaseClient"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import ArticlePage from '../Components/ArticlePage';
import Paragraph from '../Components/Paragraph';
import { getSupabaseImageUrl } from "../assets/Helpers"



export default function Home() {
    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticle();
    }, []);

    const fetchArticle = async () => {
        try {
            setLoading(true);

            // Récupérer l'article principal
            const { data: article, error: articleError } = await supabase
                .from('articles')
                .select('*')
                .eq('category', 'Championship') // Remplacez par l'ID de votre article
                .single();

            if (articleError) throw articleError;

            // Récupérer les paragraphes
            const { data: paragraphs, error: paragraphsError } = await supabase
                .from('article_paragraphs')
                .select('*')
                .eq('article_category', article.category)
                .order('order_index', { ascending: true });

            if (paragraphsError) throw paragraphsError;

            setArticleData({
                title: article.title,
                paragraphs: paragraphs
            });

        } catch (err) {
            console.error('Erreur lors du chargement:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/banner/dadje_un.jpg')} alt="équipe de dadje fc, champion en titre" />

            {/* Section Article */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-gray-600 text-lg">Chargement de l'article...</div>
                </div>
            ) : error ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-red-600 text-lg">Erreur: {error}</div>
                </div>
            ) : articleData ? (
                <ArticlePage title={articleData.title}>
                    {/* Rendu des paragraphes */}
                    {articleData.paragraphs.map((paragraph, index) => (
                        <Paragraph
                            key={paragraph.id}
                            heading={paragraph.heading}
                            text={paragraph.text}
                            image={getSupabaseImageUrl(paragraph.image_url)}
                            imageAlt={paragraph.image_alt}
                            imageOnRight={index % 2 === 0} // Alternance automatique
                            link={paragraph.link_url ? {
                                url: paragraph.link_url,
                                text: paragraph.link_text || 'En savoir plus'
                            } : null}
                        />
                    ))}
                </ArticlePage>
            ) : null}

            <Footer />
        </>
    );
}