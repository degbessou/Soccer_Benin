// Composant pour la publicité en bas de page (dans la largeur max-w-screen-lg)
export const AdBottom = ({ className = '' }) => {
    return (
        <div className={`w-full my-8 ${className}`}>
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4 shadow-md">
                <div className="text-xs text-gray-500 mb-2 text-center">PUBLICITÉ</div>
                <div className="bg-white w-full h-32 rounded flex items-center justify-center">
                    <div className="text-center p-4">
                        <div className="text-4xl mb-2">📢</div>
                        <p className="text-sm text-gray-600">Espace publicitaire horizontal</p>
                        <p className="text-xs text-gray-400 mt-2">728x90px (Leaderboard)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};