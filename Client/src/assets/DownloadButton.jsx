// assets/DownloadButton.jsx
import * as htmlToImage from "html-to-image";

export default function DownloadButton({ refToCapture, filename, label, onCapturing, disabled = false }) {

    const handleCapture = async () => {
        if (!refToCapture?.current || disabled) return;

        onCapturing?.(true);

        const container = refToCapture.current;

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

        // 1. Déplacer dans le viewport
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
        await new Promise(resolve => setTimeout(resolve, 600));

        // 3. Si les données ne sont pas encore là, attendre un peu plus
        const isEmpty = container.querySelector('td[colspan]') !== null;
        if (isEmpty) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        try {
            const dataUrl = await htmlToImage.toPng(container, {
                cacheBust: true,
                pixelRatio: 2,
                width: 940,
                height: 788,
                skipAutoScale: true,
                includeQueryParams: true
            });

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = filename;
            link.click();

        } catch (err) {
            console.error("❌ Erreur capture :", err);
        } finally {
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
            title={disabled ? "Chargement..." : "Télécharger"}
            disabled={disabled}
            className="hover:opacity-80 active:opacity-60 transition-opacity disabled:opacity-30 disabled:cursor-wait"
            style={{
                background: 'transparent',
                border: 'none',
                cursor: disabled ? 'wait' : 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 0
            }}
        >
            <img
                src="/download.svg"
                alt={label}
                style={{ width: '36px', display: 'block' }}
            />
        </button>
    );
}