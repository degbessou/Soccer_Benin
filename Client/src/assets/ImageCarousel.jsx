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
            {/* Conteneur d'image avec transition */}
            <div className="overflow-hidden md:max-w-lg">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute top-0'
                            }`}
                    >
                        <img
                            src={image.src}
                            className="object-cover md:max-w-lg sm:rounded-lg"
                            alt={image.alt}
                        />
                        <h3 className="text-yellow-700 text-sm mt-2">
                            {image.caption}
                        </h3>
                    </div>
                ))}
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