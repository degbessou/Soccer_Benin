export default function CaptureOverlay({ isCapturing }) {
    if (!isCapturing) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px'
        }}>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-600 border-t-transparent"></div>
            <p className="text-lg font-medium text-gray-700">Génération de l'image...</p>
        </div>
    );
}