import { useState, useEffect } from 'react';

const HeroDynamiq = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Défilement automatique
    useEffect(() => {
        if (images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    // Animation d'expansion au chargement
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpanded(true);
        }, 100);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const handleImageLoad = () => {
        setHasLoaded(true);
        setIsExpanded(true); // Lancer l'expansion dès que l'image est chargée
    };

    // Si pas d'images, retourner null ou un message
    if (images.length === 0) {
        return null;
    }

    const currentImage = images[currentIndex];

    return (
        <section className="pt-8 pb-8">
            <div className="max-w-screen-lg mx-auto md:px-8">
                <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                    <div className="w-full">
                        {/* Conteneur d'image avec animation d'expansion */}
                        <div className={`
    relative w-full overflow-hidden
    transition-all duration-700 ease-in-out
    ${isExpanded ? 'h-96' : 'h-20'}
    ${hasLoaded ? 'opacity-100' : 'opacity-0'}
`}>
                            <img
                                src={currentImage.src}
                                alt={currentImage.alt}
                                onLoad={handleImageLoad}
                                className={`
                                    absolute inset-0 w-full h-full object-cover rounded-lg
                                    transition-transform duration-1000 ease-out
                                    ${isExpanded ? 'scale-100' : 'scale-110'}
                                `}
                            />

                            {/* Overlay de chargement */}
                            {!hasLoaded && (
                                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            {/* Légende */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <p className="text-white text-sm font-medium">
                                    {currentImage.caption}
                                </p>
                            </div>

                            {/* Indicateurs de slide */}
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentIndex(index);
                                            setIsExpanded(false);
                                            setHasLoaded(false);
                                            setTimeout(() => setIsExpanded(true), 100);
                                        }}
                                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                            ? 'bg-white'
                                            : 'bg-white/50 hover:bg-white/70'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroDynamiq;