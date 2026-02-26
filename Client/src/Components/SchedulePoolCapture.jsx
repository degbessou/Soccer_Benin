// components/SchedulePoolCapture.jsx
import { forwardRef } from 'react';
import { getSupabaseImageUrl } from '../assets/Helpers';

const backgroundUrl = '/background.svg';

const getStatusStyle = (statut) => {
    const base = {
        padding: '3px 8px',
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
        case 'pending': return 'Programmé';
        default: return 'À venir';
    }
};

const SchedulePoolCapture = forwardRef(({
    logoUrl,
    title,
    subtitle,
    filtersInfo,
    pouleAMatches = [],
    pouleBMatches = [],
    pouleALabel = 'A',
    pouleBLabel = 'B',
    pouleAJournee = null,
    pouleBJournee = null,
    pouleAPhase = null,
    pouleBPhase = null,
    dateFormatter = (date) => new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short'
    }),
    footerLeft = "BencoFoot",
    footerRight = new Date().toLocaleDateString('fr-FR')
}, ref) => {

    // Limiter à 6 matchs par poule pour que ça rentre dans 788px
    const pouleALimited = pouleAMatches.slice(0, 6);
    const pouleBLimited = pouleBMatches.slice(0, 6);

    const colors = {
        primary: '#925c13',
        text: {
            primary: '#000000',
            secondary: '#374151',
            light: '#9ca3af'
        },
        border: '#e5e7eb',
    };

    const renderPoolTable = (poolLabel, matches, poolColor, journeeNum, phase, originalMatches) => (
        <div style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '16px',
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* En-tête de la poule */}
            <div style={{
                //backgroundColor: poolColor,
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <h3 style={{
                    backgroundColor: colors.primary,
                    color: 'white',
                    margin: 0,
                    padding: '6px 14px',
                    borderRadius: '30px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Poule {poolLabel}
                </h3>
                {journeeNum && (
                    <span style={{
                        color: '#925c13',
                        fontSize: '13px',
                        fontWeight: '600',
                        letterSpacing: '0.1px'
                    }}>
                        📅 Journée {journeeNum}{phase && phase !== 'all' ? ` — ${phase.charAt(0).toUpperCase() + phase.slice(1)}` : ''}
                    </span>
                )}
            </div>

            {/* Tableau des matchs */}
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '13px',
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: `1px solid ${colors.border}` }}>
                        <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.3px' }}>Date</th>
                        <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.3px' }}>Stade</th>
                        <th style={{ padding: '6px 8px', textAlign: 'right', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', fontSize: '11px', width: '22%' }}></th>
                        <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: '700', color: colors.text.primary, width: '70px' }}></th>
                        <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', fontSize: '11px', width: '22%' }}></th>
                        <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: '600', color: colors.text.secondary, textTransform: 'uppercase', fontSize: '11px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {matches.length > 0 ? (
                        matches.map((match, idx) => (
                            <tr key={match.id_match} style={{
                                backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                                borderBottom: idx < matches.length - 1 ? `1px solid ${colors.border}` : 'none'
                            }}>
                                <td style={{ padding: '6px 8px', color: colors.text.primary, fontWeight: '500', fontSize: '12px' }}>
                                    {dateFormatter(match.date_match)}
                                </td>
                                <td style={{ padding: '6px 8px', color: colors.text.secondary, fontSize: '12px', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {match.stade}
                                </td>
                                <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: '600', color: colors.text.primary, fontSize: '13px' }}>
                                    {match.equipe_domicile}
                                </td>
                                <td style={{ padding: '6px 8px', textAlign: 'center', fontWeight: '700', fontSize: '13px' }}>
                                    {match.statut === 'finished' ? (
                                        <span style={{ backgroundColor: '#e5e7eb', padding: '3px 6px', borderRadius: '6px', display: 'inline-block', minWidth: '52px' }}>
                                            {match.buts_domicile} - {match.buts_exterieur}
                                        </span>
                                    ) : (
                                        <span style={{ color: colors.text.light, fontWeight: '400' }}>vs</span>
                                    )}
                                </td>
                                <td style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: colors.text.primary, fontSize: '13px' }}>
                                    {match.equipe_exterieur}
                                </td>
                                <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                                    <span style={getStatusStyle(match.statut)}>
                                        {getStatusText(match.statut)}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: colors.text.light, fontSize: '13px' }}>
                                Aucun match pour cette poule
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Indicateur si matchs tronqués */}
            {originalMatches.length > 6 && (
                <div style={{
                    padding: '5px 10px',
                    backgroundColor: '#f3f4f6',
                    borderTop: `1px solid ${colors.border}`,
                    textAlign: 'center',
                    color: colors.text.secondary,
                    fontSize: '11px',
                    fontStyle: 'italic'
                }}>
                    + {originalMatches.length - 6} match(s) non affiché(s)
                </div>
            )}
        </div>
    );

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
                padding: '22px 25px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.04)',
            }}>
                {/* En-tête */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    position: 'relative',
                    zIndex: 2,
                    width: '100%'
                }}>
                    {/* Logo gauche */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '130px' }}>
                        {logoUrl ? (
                            <img src={logoUrl} alt="logo" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                        ) : (
                            <div style={{ width: '100px', height: '70px' }} />
                        )}
                    </div>

                    {/* Titre centré */}
                    <div style={{ textAlign: 'center', flex: 1, padding: '0 20px' }}>
                        <h1 style={{
                            fontSize: '28px',
                            fontWeight: '800',
                            background: 'white',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: '0 0 4px 0',
                            lineHeight: '1',
                            letterSpacing: '-0.5px'
                        }}>
                            {title}
                        </h1>
                        {subtitle && (
                            <p style={{ fontSize: '14px', color: '#9ca3af', margin: '6px 0 0 0', fontWeight: '500' }}>
                                {subtitle}
                            </p>
                        )}
                        {filtersInfo && (
                            <p style={{ fontSize: '13px', color: colors.primary, margin: '4px 0 0 0', fontWeight: '600' }}>
                                {filtersInfo}
                            </p>
                        )}
                    </div>

                    {/* Logo droit */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '130px' }}>
                        <img
                            src={getSupabaseImageUrl('medias/icons/logo_fbf.png')}
                            alt="logo_fbf"
                            style={{ width: '100px', height: '60px', objectFit: 'contain' }}
                        />
                    </div>
                </div>

                {/* Tables des 2 poules l'une au-dessus de l'autre */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '16px',
                    minHeight: 0
                }}>
                    {renderPoolTable(pouleALabel, pouleALimited, '#3b82f6', pouleAJournee, pouleAPhase, pouleAMatches)}
                    {renderPoolTable(pouleBLabel, pouleBLimited, '#10b981', pouleBJournee, pouleBPhase, pouleBMatches)}
                </div>

                {/* Pied de page */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: `2px dashed ${colors.border}`,
                    color: colors.text.light,
                    fontSize: '13px',
                    fontWeight: '500'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: colors.primary, fontSize: '16px' }}>🌍</span>
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

SchedulePoolCapture.displayName = 'SchedulePoolCapture';

export default SchedulePoolCapture;