// components/ScheduleCapture.jsx
import { forwardRef } from 'react';
import { getSupabaseImageUrl } from '../assets/Helpers';

const backgroundUrl = '/background.svg';

const getStatusStyle = (statut) => {
    const base = {
        padding: '4px 10px',
        borderRadius: '30px',
        fontSize: '11px',
        fontWeight: '600',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        letterSpacing: '0.3px'
    };

    switch (statut) {
        case 'finished':
            return { ...base, backgroundColor: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' };
        case 'live':
            return { ...base, backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' };
        case 'postponed':
            return { ...base, backgroundColor: '#ffedd5', color: '#9a3412', border: '1px solid #fed7aa' };
        case 'pending':
            return { ...base, backgroundColor: '#f3f4f6', color: '#4b5563', border: '1px solid #e5e7eb' };
        default:
            return { ...base, backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' };
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

const ScheduleCapture = forwardRef(({
    logoUrl,
    title,
    subtitle,
    groupedMatches,
    dateFormatter = (date) => new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short'
    }),
    footerLeft = "Le calendrier et les résultats détaillés sont à retrouver sur notre site.",
    footerRight = new Date().toLocaleDateString('fr-FR')
}, ref) => {

    const colors = {
        primary: '#1C5937',
        secondary: '#f59e0b',
        text: {
            primary: '#000000',
            secondary: '#374151',
            light: '#ffffff'
        },
        border: '#e5e7eb',
        light: '#f9fafb'
    };

    const allMatches = Object.values(groupedMatches).flat();
    const hasNonFinishedMatch = allMatches.some(match => match.statut !== 'finished');
    const globalFontSize = hasNonFinishedMatch ? '14px' : '14px';

    return (
        <div
            ref={ref}
            style={{
                position: 'fixed',
                top: '-10000px',
                left: '-10000px',
                width: '940px',
                height: '788px',
                backgroundImage: `url('${backgroundUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
        >
            {/* Conteneur intérieur avec marges */}
            <div style={{
                width: '860px',
                height: '720px',
                padding: '22px 25px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.04)',
            }}>

                {/* En-tête avec logo et titre */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '5px',
                    position: 'relative',
                    zIndex: 2,
                    width: '100%'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '150px'
                    }}>
                        {logoUrl ? (
                            <div style={{ borderRadius: '15px', padding: '8px' }}>
                                <img src={logoUrl} alt="logo" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                            </div>
                        ) : (
                            <div style={{ width: '120px', height: '70px' }} />
                        )}
                    </div>

                    <div style={{ textAlign: 'center', flex: 1, padding: '0 20px' }}>
                        <h1 style={{
                            fontSize: '32px',
                            fontWeight: '800',
                            background: 'white',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: '0 0 2px 0',
                            lineHeight: '1.5',
                            letterSpacing: '-0.5px'
                        }}>
                            {title}
                        </h1>
                        {subtitle && (
                            <p style={{
                                fontSize: '16px',
                                color: '#9ca3af',
                                margin: '8px 0 4px 0',
                                fontWeight: '700',
                                lineHeight: '1.2'
                            }}>
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: '150px'
                    }}>
                        <div style={{ borderRadius: '15px', padding: '8px' }}>
                            <img
                                src={getSupabaseImageUrl('medias/icons/logo_fbf.png')}
                                alt="logo_fbf"
                                style={{ width: '120px', height: '70px', objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Tableau des matchs */}
                <div style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        height: '100%',
                        overflowY: 'hidden',
                        padding: '10px',
                        fontSize: globalFontSize,
                    }}>
                        {Object.entries(groupedMatches)
                            .sort(([a], [b]) => Number(a) - Number(b))
                            .map(([journee, journeeMatches], index) => (
                                journeeMatches.length > 0 && (
                                    <div key={journee} style={{
                                        marginBottom: index < Object.keys(groupedMatches).length - 1 ? '15px' : 0
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            marginBottom: '8px'
                                        }}>
                                            <div style={{
                                                backgroundColor: colors.primary,
                                                color: 'white',
                                                padding: '6px 16px',
                                                borderRadius: '30px',
                                                fontWeight: '600',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <span>📅</span>
                                                <span>Journée {journee}</span>
                                            </div>
                                            {journeeMatches[0]?.phase && (
                                                <span style={{
                                                    color: colors.text.primary,
                                                    fontWeight: '500',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    {journeeMatches[0].phase}
                                                </span>
                                            )}
                                        </div>

                                        <div style={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: '16px',
                                            border: `1px solid ${colors.border}`,
                                            overflow: 'hidden'
                                        }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Date</th>
                                                        <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Stade</th>
                                                        <th style={{ padding: '6px 8px', textAlign: 'right', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.3px', width: '25%' }}></th>
                                                        <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: '700', color: colors.text.primary, width: '80px' }}></th>
                                                        <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.3px', width: '25%' }}></th>
                                                        <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.3px' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {journeeMatches.map((match, idx) => (
                                                        <tr key={match.id_match} style={{
                                                            backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                                                            borderBottom: idx < journeeMatches.length - 1 ? `1px solid ${colors.border}` : 'none'
                                                        }}>
                                                            <td style={{ padding: '6px 8px', color: colors.text.primary, fontWeight: '500' }}>
                                                                {dateFormatter(match.date_match)}
                                                            </td>
                                                            <td style={{ padding: '6px 8px', color: colors.text.secondary }}>
                                                                {match.stade}
                                                            </td>
                                                            <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: '600', color: colors.text.primary }}>
                                                                {match.equipe_domicile}
                                                            </td>
                                                            <td style={{ padding: '6px 8px', textAlign: 'center', fontWeight: '700' }}>
                                                                {match.statut === 'finished' ? (
                                                                    <span style={{ backgroundColor: '#e5e7eb', padding: '4px 8px', borderRadius: '8px', display: 'inline-block', minWidth: '60px' }}>
                                                                        {match.buts_domicile} - {match.buts_exterieur}
                                                                    </span>
                                                                ) : (
                                                                    <span style={{ color: colors.text.secondary, fontWeight: '400' }}>vs</span>
                                                                )}
                                                            </td>
                                                            <td style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: colors.text.primary }}>
                                                                {match.equipe_exterieur}
                                                            </td>
                                                            <td style={{ padding: '6px 8px', textAlign: 'center' }}>
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
                </div>

                {/* Pied de page */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '15px',
                    //borderTop: `2px dashed ${colors.border}`,
                    color: colors.text.light,
                    fontSize: '13px',
                    fontWeight: '500'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: colors.primary, fontSize: '16px' }}>🏁</span>
                        <span>{footerLeft}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>📸</span>
                        <span>{footerRight}</span>
                    </div>
                </div>

            </div>
        </div>
    );
});

ScheduleCapture.displayName = 'ScheduleCapture';

export default ScheduleCapture;