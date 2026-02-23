// DownloadButton simplifié
import * as htmlToImage from "html-to-image";

export default function DownloadButton({ refToCapture, filename, label, onCapturing }) {
    // Dans DownloadButton.jsx
    const handleCapture = async () => {
        if (!refToCapture?.current) return;

        onCapturing?.(true);

        const container = refToCapture.current;

        // Sauvegarder les styles originaux
        const originalStyles = {
            position: container.style.position,
            top: container.style.top,
            left: container.style.left,
            opacity: container.style.opacity,
            zIndex: container.style.zIndex,
            transform: container.style.transform,
            overflow: container.style.overflow,
            visibility: container.style.visibility
        };

        // 1. Déplacer dans le viewport MAIS invisible pour l'utilisateur
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.transform = 'none';
        container.style.clip = 'rect(0, 1080px, 1350px, 0)';
        container.style.zIndex = '9999';
        container.style.overflow = 'visible';
        container.style.clipPath = 'inset(0)';
        container.style.pointerEvents = 'none';

        // 2. Attendre que le DOM se stabilise
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            console.log("📸 Tentative de capture...");

            // 3. Capturer (même si invisible, html2canvas peut capturer)
            const dataUrl = await htmlToImage.toPng(container, {
                cacheBust: true,
                pixelRatio: 2,
                width: 940,              // ✅ Changé
                height: 788,             // ✅ Changé
                skipAutoScale: true,
                includeQueryParams: true
            });

            console.log("✅ Capture réussie, téléchargement...");
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = filename;
            link.click();

        } catch (err) {
            console.error("❌ Erreur capture :", err);
        } finally {
            // 4. Remettre TOUS les styles originaux (hors écran)
            container.style.position = originalStyles.position || 'fixed';
            container.style.top = originalStyles.top || '-9999px';
            container.style.left = originalStyles.left || '-9999px';
            container.style.opacity = originalStyles.opacity || '1';
            container.style.zIndex = originalStyles.zIndex || 'auto';
            container.style.transform = originalStyles.transform || 'none';
            container.style.overflow = originalStyles.overflow || 'visible';
            container.style.visibility = originalStyles.visibility || 'visible';
            container.style.pointerEvents = 'none';

            onCapturing?.(false);
        }
    };

    return (
        <button
            onClick={handleCapture}
            title="Télécharger"
            className="hover:opacity-80 active:opacity-60 transition-opacity"
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 0 // Évite l'espace supplémentaire
            }}
        >
            <img
                src="/download.svg"
                alt={label}
                style={{
                    width: '36px', // Ajustez la taille selon vos besoins
                    //height: '32px',
                    display: 'block'
                }} />
        </button>
    );
}