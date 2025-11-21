import React from 'react';

/**
 * Page d'article complète
 * Utilise les composants Paragraph et Table
 */
const ArticlePage = ({ title, children }) => {
    return (
        <article className="py-2">
            <div className="md:block px-4 space-y-3 mt-6 sm:px-0 md:mt-0 md:py-4 lg:max-w-screen-lg lg:mx-auto">
                {/* Titre principal de l'article */}
                <div className="max-w-3xl mx-auto px-4 mb-12 text-center">
                    <h1 className="text-gray-800 text-2xl font-extrabold sm:text-3xl underline underline-offset-3">
                        {title}
                    </h1>
                </div>

                {/* Contenu de l'article (Paragraphs, Tables, etc.) */}
                {children}
            </div>
        </article>
    );
};
export default ArticlePage;