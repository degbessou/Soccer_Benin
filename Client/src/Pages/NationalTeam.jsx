import { useEffect, useState } from "react"
import { supabase } from "../Functions/SupabaseClient"
import * as Tabs from "@radix-ui/react-tabs";
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import ArticlePage from '../Components/ArticlePage';
import Paragraph from '../Components/Paragraph';
import Table from '../Components/Table';
import SidebarNav from '../assets/SidebarNav';

export default function NationalTeam() {
    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSection, setSelectedSection] = useState('');

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
                .eq('category', 'Senior') // Remplacez par la catégorie voulue
                .single();

            if (articleError) throw articleError;

            // Récupérer les paragraphes
            const { data: paragraphs, error: paragraphsError } = await supabase
                .from('article_paragraphs')
                .select('*')
                .eq('article_category', article.category)
                .order('order_index', { ascending: true });

            if (paragraphsError) throw paragraphsError;

            // Récupérer le tableau si présent
            let tableData = null;
            if (article.has_table) {
                const { data: tableRows, error: tableError } = await supabase
                    .from('article_tables')
                    .select('*')
                    .eq('article_category', article.category)
                    .order('year', { ascending: false });

                if (!tableError && tableRows) {
                    tableData = {
                        title: article.table_title || 'Résultats',
                        description: article.table_description,
                        rows: tableRows
                    };
                }
            }

            setArticleData({
                title: article.title,
                paragraphs: paragraphs,
                table: tableData
            });

        } catch (err) {
            console.error('Erreur lors du chargement:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour extraire le texte avant les ":"
    const cleanLabel = (label) => {
        if (!label) return label;
        const colonIndex = label.indexOf(':');
        return colonIndex !== -1 ? label.substring(0, colonIndex).trim() : label;
    };

    // Créer les sections pour la navigation
    const sections = articleData ? [
        ...articleData.paragraphs
            .map((p, idx) => ({
                id: `section-${idx}`,
                label: cleanLabel(p.heading) || `Section ${idx + 1}`,
                hasHeading: !!p.heading
            }))
            .filter(s => s.hasHeading),
        ...(articleData.table ? [{
            id: 'table-section',
            label: cleanLabel(articleData.table.title) || 'Tableau'
        }] : [])
    ] : [];

    // Initialiser la première section
    useEffect(() => {
        if (sections.length > 0 && !selectedSection) {
            setSelectedSection(sections[0].id);
        }
    }, [sections.length, selectedSection]);

    // Fonction pour faire défiler vers une section
    const scrollToSection = (sectionId) => {
        setSelectedSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 120; // Augmenté pour plus de marge
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Détecter la section visible lors du scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150; // Offset pour la détection

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i].id);
                if (element) {
                    const elementTop = element.offsetTop;
                    if (scrollPosition >= elementTop) {
                        setSelectedSection(sections[i].id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    return (
        <>
            <Navbar />
            <HeroStatiq src="/en_benin.jpeg" alt="équipe nationale senior homme" />

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
                    {sections.length > 0 ? (
                        <Tabs.Root
                            value={selectedSection}
                            onValueChange={scrollToSection}
                        >
                            <div className="relative">
                                {/* Navigation latérale - ABSOLUE À GAUCHE */}
                                <div className="hidden xl:block xl:fixed xl:left-8 2xl:left-16 xl:top-90 xl:w-64">
                                    <SidebarNav
                                        sections={sections}
                                        selectedSection={selectedSection}
                                        onSectionChange={scrollToSection}
                                    />
                                </div>
                                {/* Contenu principal - GARDE SON max-w-screen-lg */}
                                <div className="md:block px-4 space-y-3 mt-6 sm:px-0 md:mt-0 md:py-4 lg:max-w-screen-lg lg:mx-auto">
                                    {/* Rendu des paragraphes */}
                                    {articleData.paragraphs.map((paragraph, index) => (
                                        <Paragraph
                                            key={paragraph.id}
                                            sectionId={`section-${index}`}
                                            heading={paragraph.heading}
                                            text={paragraph.text}
                                            image={paragraph.image_url}
                                            imageAlt={paragraph.image_alt}
                                            imageOnRight={index % 2 === 0}
                                            link={paragraph.link_url ? {
                                                url: paragraph.link_url,
                                                text: paragraph.link_text || 'En savoir plus'
                                            } : null}
                                        />
                                    ))}

                                    {/* Rendu du tableau si présent */}
                                    {articleData.table && (
                                        <Table
                                            title={articleData.table.title}
                                            description={articleData.table.description}
                                            rows={articleData.table.rows}
                                        />
                                    )}
                                </div>
                            </div>
                        </Tabs.Root>
                    ) : (
                        // Sans navigation si pas de sections
                        <>
                            {articleData.paragraphs.map((paragraph, index) => (
                                <Paragraph
                                    key={paragraph.id}
                                    heading={paragraph.heading}
                                    text={paragraph.text}
                                    image={paragraph.image_url}
                                    imageAlt={paragraph.image_alt}
                                    imageOnRight={index % 2 === 0}
                                    link={paragraph.link_url ? {
                                        url: paragraph.link_url,
                                        text: paragraph.link_text || 'En savoir plus'
                                    } : null}
                                />
                            ))}

                            {articleData.table && (
                                <Table
                                    title={articleData.table.title}
                                    description={articleData.table.description}
                                    rows={articleData.table.rows}
                                />
                            )}
                        </>
                    )}
                </ArticlePage>
            ) : null}

            <Footer />
        </>
    );
}