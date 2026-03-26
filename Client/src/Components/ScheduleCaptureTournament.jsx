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
        case 'finished': return { ...base, backgroundColor: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' };
        case 'live': return { ...base, backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' };
        case 'postponed': return { ...base, backgroundColor: '#ffedd5', color: '#9a3412', border: '1px solid #fed7aa' };
        case 'pending': return { ...base, backgroundColor: '#f3f4f6', color: '#4b5563', border: '1px solid #e5e7eb' };
        default: return { ...base, backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' };
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
    dateFormatter = (date) => new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
    footerLeft = "Le calendrier et les résultats détaillés sont à retrouver sur notre site.",
    footerRight = new Date().toLocaleDateString('fr-FR')
}, ref) => {

    const colors = {
        primary: '#1C5937',
        text: { primary: '#000000', secondary: '#374151', light: '#ffffff' },
        border: '#e5e7eb',
    };

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
            <div style={{
                width: '860px',
                height: '720px',
                padding: '16px 25px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.04)',
            }}>

                {/* En-tête — logos réduits pour gagner de la place */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    width: '100%'
                }}>
                    <div style={{ width: '80px' }}>
                        {logoUrl && (
                            <img src={logoUrl} alt="logo" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
                        )}
                    </div>

                    <div style={{ textAlign: 'center', flex: 1, padding: '0 16px' }}>
                        <h1 style={{
                            fontSize: '26px',
                            fontWeight: '800',
                            background: 'white',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: '0',
                            lineHeight: '1.3',
                            letterSpacing: '-0.5px'
                        }}>
                            {title}
                        </h1>
                        {subtitle && (
                            <p style={{
                                fontSize: '13px',
                                color: '#9ca3af',
                                margin: '2px 0 0 0',
                                fontWeight: '700',
                                lineHeight: '1.2'
                            }}>
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <div style={{ width: '80px', display: 'flex', justifyContent: 'flex-end' }}>
                        <img
                            src={getSupabaseImageUrl('medias/icons/logo_fbf.png')}
                            alt="logo_fbf"
                            style={{ width: '70px', height: '55px', objectFit: 'contain' }}
                        />
                    </div>
                </div>

                {/* Tableau des matchs */}
                <div style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                    marginBottom: '10px'
                }}>
                    <div style={{
                        height: '100%',
                        overflowY: 'hidden',
                        padding: '8px',
                        fontSize: '13px',
                    }}>
                        {Object.entries(groupedMatches)
                            .sort(([a], [b]) => Number(a) - Number(b))
                            .map(([journee, journeeMatches], index) => (
                                journeeMatches.length > 0 && (
                                    <div key={journee} style={{
                                        marginBottom: index < Object.keys(groupedMatches).length - 1 ? '10px' : 0
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            marginBottom: '5px'
                                        }}>
                                            <div style={{
                                                backgroundColor: colors.primary,
                                                color: 'white',
                                                padding: '4px 12px',
                                                borderRadius: '30px',
                                                fontWeight: '600',
                                                fontSize: '12px',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <span>📅</span>
                                                <span>{journee}</span>
                                            </div>

                                        </div>

                                        <div style={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: '12px',
                                            border: `1px solid ${colors.border}`,
                                            overflow: 'hidden'
                                        }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr style={{ backgroundColor: '#f9fafb' }}>
                                                        <th style={{ padding: '4px 8px', textAlign: 'left', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '10px' }}>Date</th>
                                                        <th style={{ padding: '4px 8px', textAlign: 'left', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.3px', fontSize: '10px' }}>Stade</th>
                                                        <th style={{ padding: '4px 8px', textAlign: 'right', width: '25%' }}></th>
                                                        <th style={{ padding: '4px 8px', textAlign: 'center', width: '75px' }}></th>
                                                        <th style={{ padding: '4px 8px', textAlign: 'left', width: '25%' }}></th>
                                                        <th style={{ padding: '4px 8px', textAlign: 'center' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {journeeMatches.map((match, idx) => (
                                                        <tr key={match.id_match} style={{
                                                            backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                                                            borderBottom: idx < journeeMatches.length - 1 ? `1px solid ${colors.border}` : 'none'
                                                        }}>
                                                            <td style={{ padding: '4px 8px', color: colors.text.primary, fontWeight: '500', fontSize: '12px' }}>
                                                                {dateFormatter(match.date_match)}
                                                            </td>
                                                            <td style={{ padding: '4px 8px', color: colors.text.secondary, fontSize: '12px' }}>
                                                                {match.stade}
                                                            </td>
                                                            <td style={{ padding: '4px 8px', textAlign: 'right', fontWeight: '600', color: colors.text.primary, fontSize: '12px' }}>
                                                                {match.equipe_domicile}
                                                            </td>
                                                            <td style={{ padding: '4px 8px', textAlign: 'center', fontWeight: '700' }}>
                                                                {match.statut === 'finished' ? (
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
                                                                        <span style={{ backgroundColor: '#e5e7eb', padding: '3px 6px', borderRadius: '6px', display: 'inline-block', minWidth: '50px', fontSize: '12px' }}>
                                                                            {match.buts_domicile} - {match.buts_exterieur}
                                                                        </span>
                                                                        {match.buts_peno_domicile !== null && match.buts_peno_exterieur !== null && (
                                                                            <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: '500' }}>
                                                                                TAB {match.buts_peno_domicile}-{match.buts_peno_exterieur}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <span style={{ color: colors.text.secondary, fontWeight: '400', fontSize: '12px' }}>vs</span>
                                                                )}
                                                            </td>
                                                            <td style={{ padding: '4px 8px', textAlign: 'left', fontWeight: '600', color: colors.text.primary, fontSize: '12px' }}>
                                                                {match.equipe_exterieur}
                                                            </td>
                                                            <td style={{ padding: '4px 8px', textAlign: 'center' }}>
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
                    paddingTop: '8px',
                    color: colors.text.light,
                    fontSize: '12px',
                    fontWeight: '500'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: colors.primary, fontSize: '14px' }}>🏁</span>
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