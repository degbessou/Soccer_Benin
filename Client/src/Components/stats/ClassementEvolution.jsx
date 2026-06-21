import { useState, useEffect, useCallback, useMemo } from "react"
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceArea,
    Label,
} from "recharts"
import { supabase } from "../../Functions/SupabaseClient"
import { API_BASE_URL } from "../../Functions/Api"

// Base palette of well-contrasted colors. Cycled if there are more teams.
const COLOR_PALETTE = [
    "#e63946", "#2a9d8f", "#e9c46a", "#f4a261", "#264653", "#6a0572",
    "#1d3557", "#457b9d", "#a8dadc", "#f77f00", "#d62828", "#023e8a",
    "#80b918", "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7",
    "#dfe6e9", "#b2bec3",
]

// Per-club colors based on each team's logo. Clubs sharing colors (e.g. the
// many green/white sides) get distinct shades so every line stays readable.
const TEAM_COLORS = {
    "AS Cotonou": "#f59e0b",     // jaune et noir (amber)
    "ASPAC": "#facc15",          // jaune et bleu (yellow)
    "ASVO": "#14532d",           // vert et noir (dark green)
    "Ayema": "#16a34a",          // vert et blanc (green)
    "Bani Gansè": "#22c55e",     // vert et blanc (bright green)
    "Buffles": "#15803d",        // vert et blanc (forest green)
    "Cavaliers": "#1f2937",      // blanc et noir (near-black)
    "Coton": "#38bdf8",          // bleu clair et blanc (light blue)
    "Dadjè": "#1e3a8a",          // bleu marine et blanc (navy)
    "Damissa": "#84cc16",        // jaune et vert (yellow-green)
    "Dragons": "#ea580c",        // orange et noir (orange)
    "Dynamo Abomey": "#4d7c0f",  // vert et blanc (olive green)
    "Espoir": "#172554",         // bleu nuit (midnight blue)
    "Hodio": "#2563eb",          // bleu et blanc (blue)
    "JSP": "#a3e635",            // jaune et vert (light lime)
    "Loto Popo": "#65a30d",      // vert et blanc (lime green)
    "Sobemap": "#047857",        // vert et blanc (emerald)
    "USS Kraké": "#0ea5e9",      // bleu clair et blanc (sky blue)
}

// Resolve a team's color: club color if known, otherwise cycle the palette.
const colorForTeam = (team, index) =>
    TEAM_COLORS[team] || COLOR_PALETTE[index % COLOR_PALETTE.length]

/**
 * Custom tooltip: lists every team ranked by position for the hovered matchday,
 * highlighting the line currently under the cursor.
 */
function EvolutionTooltip({ active, payload, label, hoveredTeam }) {
    if (!active || !payload || payload.length === 0) return null

    // Sort series entries by their position value (1 = best).
    const ranked = [...payload]
        .filter((entry) => entry.value != null)
        .sort((a, b) => a.value - b.value)

    return (
        <div className="rounded-md border border-gray-200 bg-white/95 px-3 py-2 shadow-lg text-xs">
            <p className="mb-1 font-semibold text-gray-800">Journée {label}</p>
            <ul className="space-y-0.5">
                {ranked.map((entry) => {
                    const isHovered = entry.name === hoveredTeam
                    return (
                        <li
                            key={entry.name}
                            className={`flex items-center gap-2 rounded px-1 ${
                                isHovered ? "bg-gray-100 font-semibold" : ""
                            }`}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="tabular-nums text-gray-500">
                                {entry.value}.
                            </span>
                            <span className="text-gray-800">{entry.name}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

/**
 * Standings evolution (bump chart): each team's rank per matchday.
 *
 * @param {string} ligue  League name (e.g. "Celtiis Ligue 1")
 * @param {string} saison Season name (e.g. "Saison 2025-2026")
 */
export default function ClassementEvolution({ ligue, saison }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [hiddenTeams, setHiddenTeams] = useState({})
    const [hoveredTeam, setHoveredTeam] = useState(null)

    const fetchData = useCallback(
        async (forceRefresh = false) => {
            setLoading(true)
            setError(false)
            try {
                const params = new URLSearchParams({ ligue, saison })
                if (forceRefresh) params.set("force_refresh", "true")
                const response = await fetch(
                    `${API_BASE_URL}/api/stats/classement-evolution?${params.toString()}`
                )
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                const json = await response.json()
                setData(json)
            } catch (err) {
                setError(true)
            } finally {
                setLoading(false)
            }
        },
        [ligue, saison]
    )

    // Initial fetch (and refetch when league/season changes).
    useEffect(() => {
        fetchData()
    }, [fetchData])

    // Realtime: refetch when a match becomes "finished".
    useEffect(() => {
        const channel = supabase
            .channel(`classement-evolution-${ligue}-${saison}`)
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "matchs" },
                (payload) => {
                    if (payload.new?.statut === "finished") {
                        fetchData(true)
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [ligue, saison, fetchData])

    // Reshape series into Recharts row format: one object per matchday.
    const chartData = useMemo(() => {
        if (!data) return []
        return data.journees.map((journee, idx) => {
            const row = { journee }
            data.series.forEach((serie) => {
                row[serie.equipe] = serie.positions[idx]
            })
            return row
        })
    }, [data])

    const oddTicks = useMemo(
        () => (data ? data.journees.filter((j) => j % 2 === 1) : []),
        [data]
    )

    const yTicks = useMemo(
        () =>
            data
                ? Array.from({ length: data.nb_equipes }, (_, i) => i + 1)
                : [],
        [data]
    )

    const toggleTeam = (team) => {
        setHiddenTeams((prev) => ({ ...prev, [team]: !prev[team] }))
    }

    // Loading skeleton, same footprint as the chart.
    if (loading) {
        return (
            <div className="mx-auto w-full max-w-screen-lg">
                <div className="aspect-[2/1] w-full animate-pulse rounded-lg bg-gray-200" />
                <div className="mt-3 flex flex-wrap gap-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-5 w-20 animate-pulse rounded bg-gray-200"
                        />
                    ))}
                </div>
            </div>
        )
    }

    // Error state with retry.
    if (error) {
        return (
            <div className="mx-auto flex aspect-[2/1] w-full max-w-screen-lg flex-col items-center justify-center gap-3 rounded-lg bg-gray-50">
                <p className="text-red-600">
                    Une erreur est survenue lors du chargement du graphique.
                </p>
                <button
                    onClick={() => fetchData(true)}
                    className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                    Réessayer
                </button>
            </div>
        )
    }

    if (!data || data.journees.length === 0) {
        return (
            <div className="mx-auto flex aspect-[2/1] w-full max-w-screen-lg items-center justify-center rounded-lg bg-gray-50">
                <p className="text-gray-600">
                    Aucun classement disponible pour le moment.
                </p>
            </div>
        )
    }

    const { nb_equipes, series } = data

    return (
        <div className="mx-auto w-full max-w-screen-lg">
            <div className="relative aspect-[2/1] w-full">
                {/* Single centered "BENCOFOOT" watermark behind the chart. Sits
                    under the lines but is captured by any screenshot of the graph. */}
                <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none">
                    <span className="rotate-[-30deg] whitespace-nowrap text-5xl font-extrabold tracking-widest text-gray-400/15 sm:text-7xl">
                        BENCOFOOT
                    </span>
                </div>
                <div className="relative z-10 h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 80, bottom: 20, left: 10 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#e5e7eb"
                        />

                        {/* Background bands (behind the lines). */}
                        {/* Champion: position 1. */}
                        <ReferenceArea
                            y1={0.5}
                            y2={1.5}
                            fill="#16a34a"
                            fillOpacity={0.15}
                            ifOverflow="hidden"
                        >
                            <Label
                                value="Champion"
                                position="right"
                                fontSize={10}
                                fill="#16a34a"
                            />
                        </ReferenceArea>
                        {/* Runner-up: position 2. */}
                        <ReferenceArea
                            y1={1.5}
                            y2={2.5}
                            fill="#ca8a04"
                            fillOpacity={0.15}
                            ifOverflow="hidden"
                        >
                            <Label
                                value="Dauphin"
                                position="right"
                                fontSize={10}
                                fill="#ca8a04"
                            />
                        </ReferenceArea>
                        {/* Relegation: last two positions. */}
                        <ReferenceArea
                            y1={nb_equipes - 1.5}
                            y2={nb_equipes + 0.5}
                            fill="#dc2626"
                            fillOpacity={0.15}
                            ifOverflow="hidden"
                        >
                            <Label
                                value="Relégation"
                                position="right"
                                fontSize={10}
                                fill="#dc2626"
                            />
                        </ReferenceArea>

                        <XAxis
                            dataKey="journee"
                            type="number"
                            domain={[1, "dataMax"]}
                            ticks={oddTicks}
                            allowDecimals={false}
                            tick={{ fontSize: 11 }}
                        >
                            <Label
                                value="Journée"
                                position="insideBottom"
                                offset={-10}
                                fontSize={12}
                            />
                        </XAxis>

                        <YAxis
                            type="number"
                            reversed
                            domain={[1, nb_equipes]}
                            ticks={yTicks}
                            allowDecimals={false}
                            interval={0}
                            tick={{ fontSize: 11 }}
                            width={40}
                        >
                            <Label
                                value="Position"
                                angle={-90}
                                position="insideLeft"
                                style={{ textAnchor: "middle" }}
                                fontSize={12}
                            />
                        </YAxis>

                        <Tooltip
                            content={<EvolutionTooltip hoveredTeam={hoveredTeam} />}
                        />

                        {series.map((serie, index) => (
                            <Line
                                key={serie.equipe}
                                dataKey={serie.equipe}
                                name={serie.equipe}
                                stroke={colorForTeam(serie.equipe, index)}
                                strokeWidth={2}
                                type="monotone"
                                connectNulls
                                hide={!!hiddenTeams[serie.equipe]}
                                dot={{ r: 3, strokeWidth: 1 }}
                                activeDot={{ r: 5 }}
                                onMouseEnter={() => setHoveredTeam(serie.equipe)}
                                onMouseLeave={() => setHoveredTeam(null)}
                                isAnimationActive={false}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </div>

            {/* Clickable legend (toggle visibility). */}
            <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-2">
                {series.map((serie, index) => {
                    const isHidden = !!hiddenTeams[serie.equipe]
                    return (
                        <button
                            key={serie.equipe}
                            onClick={() => toggleTeam(serie.equipe)}
                            className={`flex items-center gap-1.5 rounded px-1.5 py-0.5 text-xs transition ${
                                isHidden
                                    ? "text-gray-400"
                                    : "text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                            <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{
                                    backgroundColor: isHidden
                                        ? "#cbd5e1"
                                        : colorForTeam(serie.equipe, index),
                                }}
                            />
                            <span className={isHidden ? "line-through" : ""}>
                                {serie.equipe}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
