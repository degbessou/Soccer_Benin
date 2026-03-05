// components/StandingPoolCapture.jsx
import { forwardRef } from 'react';
import { getSupabaseImageUrl } from '../assets/Helpers';

const backgroundUrl = '/background.svg';

const StandingPoolCapture = forwardRef(({
    logoUrl,
    title,
    subtitle,
    pouleAStanding = [],
    pouleBStanding = [],
    pouleALabel = 'A',
    pouleBLabel = 'B',
    captionGreen,
    captionRed,
    footerLeft = "Tout le classement détaillé est à retrouver sur notre site.",
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

    const getRowBg = (idx, total) => {
        if (idx === 0) return '#f0fdf4';
        if (idx === total - 1) return '#fef2f2';
        return idx % 2 === 0 ? '#ffffff' : '#fafafa';
    };

    const getRankColor = (idx, total) => {
        if (idx === 0) return '#16a34a';
        if (idx === total - 1) return '#dc2626';
        return colors.text.primary;
    };

    const renderPoolTable = (poolLabel, standing, poolColor) => (
        <div style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '16px',
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* En-tête de la poule */}
            <div style={{
                backgroundColor: poolColor,
                padding: '8px 14px',
            }}>
                <h3 style={{
                    margin: 0,
                    color: colors.primary,
                    fontSize: '15px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Poule {poolLabel}
                </h3>
            </div>

            {/* Tableau */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', tableLayout: 'fixed' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: `2px solid ${colors.border}` }}>
                        <th style={{ padding: '7px 10px', textAlign: 'center', fontWeight: '700', color: colors.text.secondary, fontSize: '11px', textTransform: 'uppercase', width: '36px' }}>#</th>
                        <th style={{ padding: '7px 10px', textAlign: 'left', fontWeight: '700', color: colors.text.secondary, fontSize: '11px', textTransform: 'uppercase' }}>Équipe</th>
                        <th style={{ padding: '7px 10px', textAlign: 'center', fontWeight: '700', color: colors.text.secondary, fontSize: '11px', textTransform: 'uppercase', width: '52px' }}>Pts</th>
                        <th style={{ padding: '7px 10px', textAlign: 'center', fontWeight: '700', color: colors.text.secondary, fontSize: '11px', textTransform: 'uppercase', width: '36px' }}>J</th>
                        <th style={{ padding: '7px 10px', textAlign: 'center', fontWeight: '700', color: colors.text.secondary, fontSize: '11px', textTransform: 'uppercase', width: '52px' }}>Diff</th>
                    </tr>
                </thead>
                <tbody>
                    {standing.length > 0 ? (
                        standing.map((team, idx) => (
                            <tr key={team.id_standing || team.abreviation} style={{
                                backgroundColor: getRowBg(idx, standing.length),
                                borderBottom: idx < standing.length - 1 ? `1px solid ${colors.border}` : 'none',
                            }}>
                                {/* Rang */}
                                <td style={{ padding: '7px 10px', textAlign: 'center' }}>
                                    <span style={{ fontWeight: '800', fontSize: '13px', color: getRankColor(idx, standing.length) }}>
                                        {team.position || idx + 1}
                                    </span>
                                </td>

                                {/* Équipe */}
                                <td style={{ padding: '7px 10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                        {team.logo_url && (
                                            <img
                                                src={team.logo_url}
                                                alt={team.nom_equipe}
                                                style={{ width: '20px', height: '20px', objectFit: 'contain', flexShrink: 0 }}
                                            />
                                        )}
                                        <span style={{
                                            fontWeight: '500',
                                            color: colors.text.primary,
                                            fontSize: '13px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: 'block'
                                        }}>
                                            {team.nom_equipe || team.abreviation}
                                        </span>
                                    </div>
                                </td>

                                {/* Points */}
                                <td style={{ padding: '7px 10px', textAlign: 'center' }}>
                                    <span style={{
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        color: colors.text.primary,
                                        padding: '2px 7px',
                                        borderRadius: '6px',
                                        display: 'inline-block',
                                        minWidth: '28px'
                                    }}>
                                        {team.points}
                                    </span>
                                </td>

                                {/* Journées */}
                                <td style={{ padding: '7px 10px', textAlign: 'center', color: colors.text.secondary, fontSize: '13px' }}>
                                    {team.matchs_joues}
                                </td>

                                {/* Diff */}
                                <td style={{ padding: '7px 10px', textAlign: 'center' }}>
                                    <span style={{
                                        fontWeight: '700',
                                        fontSize: '13px',
                                        color: team.difference_buts > 0 ? '#16a34a' :
                                            team.difference_buts < 0 ? '#dc2626' :
                                                colors.text.secondary
                                    }}>
                                        {team.difference_buts > 0 ? '+' : ''}{team.difference_buts}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: colors.text.light, fontSize: '13px' }}>
                                Aucune donnée pour cette poule
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    const LegendeDot = ({ color, borderColor, label }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '4px',
                backgroundColor: color,
                //border: `1px solid ${borderColor}`,
                flexShrink: 0
            }} />
            <span style={{ fontSize: '13px', color: colors.text.light, fontWeight: '500' }}>{label}</span>
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

                {/* En-tête */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                    width: '100%'
                }}>
                    {/* Logo gauche */}
                    <div style={{ width: '130px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {logoUrl ? (
                            <img src={logoUrl} alt="logo" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                        ) : (
                            <div style={{ width: '100px', height: '70px' }} />
                        )}
                    </div>

                    {/* Titre */}
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
                            <p style={{ fontSize: '16px', color: '#9ca3af', margin: '6px 0 0 0', fontWeight: '700' }}>
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Logo droit */}
                    <div style={{ width: '130px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <img
                            src={getSupabaseImageUrl('medias/icons/logo_fbf.png')}
                            alt="logo_fbf"
                            style={{ width: '100px', height: '60px', objectFit: 'contain' }}
                        />
                    </div>
                </div>

                {/* 2 tables côte à côte */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    gap: '15px',
                    marginBottom: '10px',
                    minHeight: 0
                }}>
                    {renderPoolTable(pouleALabel, pouleAStanding, '#ffffff')}
                    {renderPoolTable(pouleBLabel, pouleBStanding, '#ffffff')}
                </div>

                {/* Légendes */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    padding: '10px 0',
                    //borderTop: `1px solid ${colors.border}`,
                    //borderBottom: `1px solid ${colors.border}`,
                    marginBottom: '10px',
                    flexWrap: 'wrap'
                }}>
                    {captionGreen && <LegendeDot color="#86efac" borderColor="#86efac" label={captionGreen} />}
                    {captionRed && <LegendeDot color="#fca5a5" borderColor="#fca5a5" label={captionRed} />}
                </div>

                {/* Pied de page */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '10px',
                    //borderTop: `2px dashed ${colors.border}`,
                    color: colors.text.light,
                    fontSize: '13px',
                    fontWeight: '500'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: colors.primary, fontSize: '16px' }}>📊</span>
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

StandingPoolCapture.displayName = 'StandingPoolCapture';

export default StandingPoolCapture;