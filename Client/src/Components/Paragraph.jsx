import React from 'react';

/**
 * Composant Paragraph réutilisable
 * @param {Object} props
 * @param {string} props.heading - Titre du paragraphe (optionnel)
 * @param {string} props.text - Contenu textuel du paragraphe
 * @param {string} props.image - URL de l'image (optionnel)
 * @param {string} props.imageAlt - Texte alternatif de l'image (optionnel)
 * @param {Object} props.link - Objet lien {url, text} (optionnel)
 * @param {boolean} props.imageOnRight - Position de l'image (true = droite, false = gauche)
 */
const Paragraph = ({
    heading,
    text,
    image,
    imageAlt,
    link,
    imageOnRight = true,
    sectionId
}) => {
    if (image) {
        // Paragraphe avec image
        return (
            <section id={sectionId} className="py-2 scroll-mt-32">
                <div className="max-w-screen-xl mx-auto md:px-8">
                    <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                        {imageOnRight ? (
                            <>
                                <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                                    {heading && (
                                        <h3 className="text-indigo-600 font-semibold text-lg">
                                            {heading}
                                        </h3>
                                    )}
                                    <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                                        {text}
                                    </p>
                                    {link && (
                                        <a
                                            href={link.url}
                                            className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
                                        >
                                            {link.text}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                                <div className="flex-1 sm:hidden lg:block">
                                    <img
                                        src={image}
                                        className="md:max-w-lg sm:rounded-lg object-cover w-full"
                                        alt={imageAlt || "Image"}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex-1 sm:hidden lg:block">
                                    <img
                                        src={image}
                                        className="md:max-w-lg sm:rounded-lg object-cover w-full"
                                        alt={imageAlt || "Image"}
                                    />
                                </div>
                                <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                                    {heading && (
                                        <h3 className="text-indigo-600 font-semibold text-lg">
                                            {heading}
                                        </h3>
                                    )}
                                    <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                                        {text}
                                    </p>
                                    {link && (
                                        <a
                                            href={link.url}
                                            className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
                                        >
                                            {link.text}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // Paragraphe sans image
    return (
        <section id={sectionId} className="py-2 scroll-mt-32">
            <div className="max-w-screen-xl mx-auto md:px-8">
                <div className="mx-auto space-y-3">
                    {heading && (
                        <h3 className="text-indigo-600 font-semibold text-lg">
                            {heading}
                        </h3>
                    )}
                    <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                        {text}
                    </p>
                    {link && (
                        <a
                            href={link.url}
                            className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
                        >
                            {link.text}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};
export default Paragraph;