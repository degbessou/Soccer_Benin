
import React from 'react';

// Composant pour la publicité latérale (droite de l'écran)
export const AdSidebar = ({ className = '' }) => {
    return (
        <div className={`hidden xl:block fixed right-4 top-24 w-64 ${className}`}>
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4 shadow-lg sticky top-24">
                <div className="text-xs text-gray-500 mb-2 text-center">PUBLICITÉ</div>
                <div className="bg-white aspect-[3/4] rounded flex items-center justify-center">
                    <div className="text-center p-4">
                        <div className="text-4xl mb-2">📢</div>
                        <p className="text-sm text-gray-600">Espace publicitaire</p>
                        <p className="text-xs text-gray-400 mt-2">300x400px</p>
                    </div>
                </div>
            </div>
        </div>
    );
};