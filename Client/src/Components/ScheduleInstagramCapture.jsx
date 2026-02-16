// components/ScheduleInstagramCapture.jsx
import { forwardRef } from 'react';

const cellStyle = {
    padding: '8px 6px',
    textAlign: 'left',
    verticalAlign: 'middle',
    fontSize: '14px',
    borderBottom: '1px solid #e5e7eb',
    whiteSpace: 'nowrap',
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};

const headerStyle = {
    padding: '10px 6px',
    textAlign: 'left',
    fontSize: '15px',
    fontWeight: '600',
    backgroundColor: '#f3f4f6',
    borderBottom: '2px solid #d1d5db',
    whiteSpace: 'nowrap'
};

const getStatusStyle = (statut) => {
    const base = {
        padding: '4px 8px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        display: 'inline-block',
        whiteSpace: 'nowrap'
    };

    switch (statut) {
        case 'finished':
            return { ...base, backgroundColor: '#dcfce7', color: '#166534' };
        case 'live':
            return { ...base, backgroundColor: '#fee2e2', color: '#991b1b' };
        case 'postponed':
            return { ...base, backgroundColor: '#ffedd5', color: '#9a3412' };
        case 'pending':
            return { ...base, backgroundColor: '#f3f4f6', color: '#4b5563' };
        default:
            return { ...base, backgroundColor: '#fef9c3', color: '#854d0e' };
    }
};

const getStatusText = (statut) => {
    switch (statut) {
        case 'finished': return 'Terminé';
        case 'live': return 'En cours';
        case 'postponed': return 'Reporté';
        case 'pending': return 'En attente';
        default: return 'À venir';
    }
};


const ScheduleInstagramCapture = forwardRef(({
    logoUrl,
    title,
    subtitle,
    filtersInfo,
    groupedMatches,
    dateFormatter = (date) => new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short'
    }),
    footerLeft = "BencoFoot",
    footerRight = new Date().toLocaleDateString('fr-FR')
}, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'fixed',
                top: '-9999px',      // ✅ Hors écran
                left: '-9999px',     // ✅ Hors écran
                width: '1080px',
                height: '1350px',
                backgroundColor: 'white',
                padding: '30px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'Arial, sans-serif',
                overflow: 'visible'  // ✅ Garde visible pour la capture
            }}
        >
            {/* En-tête avec logo et titre */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                flexShrink: 0
            }}>
                {logoUrl ? (
                    <img
                        src={logoUrl}
                        alt="logo"
                        style={{ width: '80px', height: 'auto' }}
                    />
                ) : <div style={{ width: '80px' }} />}

                <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#111',
                    margin: '0 20px'
                }}>
                    {title}
                </h1>

                <div style={{ width: '80px' }} />
            </div>

            {/* Sous-titre et infos */}
            <div style={{
                textAlign: 'center',
                marginBottom: '20px',
                flexShrink: 0
            }}>
                {subtitle && (
                    <p style={{ fontSize: '20px', color: '#444', margin: '0 0 5px 0' }}>
                        {subtitle}
                    </p>
                )}
                {filtersInfo && (
                    <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>
                        {filtersInfo}
                    </p>
                )}
            </div>

            {/* Tableau avec défilement */}
            <div style={{
                flex: 1,
                overflowY: 'visible',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                maxHeight: 'none'  // ✅ Ajouté
            }}>
                {Object.entries(groupedMatches)
                    .sort(([a], [b]) => Number(a) - Number(b))
                    .map(([journee, journeeMatches]) => (
                        journeeMatches.length > 0 && (
                            <div key={journee} style={{ marginBottom: '20px' }}>
                                <h2 style={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    margin: '0 0 10px 10px',
                                    color: '#1f2937'
                                }}>
                                    Journée {journee}
                                    {journeeMatches[0]?.phase && ` - ${journeeMatches[0].phase}`}
                                </h2>

                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        fontSize: '14px',
                                        minWidth: '800px'
                                    }}>
                                        <thead>
                                            <tr>
                                                <th style={headerStyle}>Date</th>
                                                <th style={headerStyle}>Stade</th>
                                                <th style={headerStyle}>Domicile</th>
                                                <th style={headerStyle}>Score</th>
                                                <th style={headerStyle}>Extérieur</th>
                                                <th style={headerStyle}>Statut</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {journeeMatches.map(match => (
                                                <tr key={match.id_match}>
                                                    <td style={cellStyle}>{dateFormatter(match.date_match)}</td>
                                                    <td style={cellStyle}>{match.stade}</td>
                                                    <td style={cellStyle}>{match.equipe_domicile}</td>
                                                    <td style={cellStyle}>
                                                        {match.statut === 'finished' ? (
                                                            <span style={{ fontWeight: 'bold' }}>
                                                                {match.buts_domicile} - {match.buts_exterieur}
                                                            </span>
                                                        ) : (
                                                            <span style={{ color: '#9ca3af' }}>vs</span>
                                                        )}
                                                    </td>
                                                    <td style={cellStyle}>{match.equipe_exterieur}</td>
                                                    <td style={cellStyle}>
                                                        <span style={getStatusStyle(match.statut)}>
                                                            {getStatusText(match.statut)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    ))}
            </div>

            {/* Pied de page */}
            <div style={{
                marginTop: '15px',
                paddingTop: '10px',
                borderTop: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                color: '#999',
                fontSize: '14px',
                flexShrink: 0
            }}>
                <span>{footerLeft}</span>
                <span>{footerRight}</span>
            </div>
        </div>
    );
});

ScheduleInstagramCapture.displayName = 'ScheduleInstagramCapture';

export default ScheduleInstagramCapture;