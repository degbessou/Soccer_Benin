// components/ImageCarousel.jsx
import { useState, useEffect } from 'react';

const ImageCarousel = ({ images, interval = 5000 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Défilement automatique
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="relative">
            {/* Conteneur d'image avec dimensions fixes */}
            <div className="overflow-hidden h-80 bg-gray-100 rounded-lg">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`${index === currentImageIndex ? 'block' : 'hidden'}`}
                    >
                        <img
                            src={image.src}
                            className="w-full h-full object-cover"
                            alt={image.alt}
                        />
                    </div>
                ))}
            </div>

            {/* Légende en dehors du cadre fixe */}
            <div className="mt-2">
                <h3 className="text-yellow-700 text-sm text-center">
                    {images[currentImageIndex]?.caption}
                </h3>
            </div>

            {/* Indicateurs de slide */}
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-yellow-700' : 'bg-gray-300'
                            }`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Afficher l'image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;