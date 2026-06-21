"""Matchday-by-matchday standings evolution.

Computes, for a given league and season, the cumulative ranking of every team
after each matchday. The result is shaped for a "bump chart" on the frontend:
one position series per team across all matchdays.
"""

import os

import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine

# Points awarded by match outcome.
WIN_POINTS = 3
DRAW_POINTS = 1
LOSS_POINTS = 0

# Lazily created, process-wide SQLAlchemy engine (connection pooling).
_engine: Engine | None = None


def _get_engine() -> Engine:
    """Return a shared SQLAlchemy engine built from SUPABASE_DB_URL."""
    global _engine
    if _engine is None:
        db_url = os.environ.get("SUPABASE_DB_URL")
        if not db_url:
            raise RuntimeError("SUPABASE_DB_URL environment variable is not set")
        _engine = create_engine(db_url, pool_pre_ping=True, future=True)
    return _engine


def _build_ranking(matches: pd.DataFrame, teams: list[str]) -> dict[str, int]:
    """Rank every team from a slice of finished matches.

    Returns a mapping ``team -> rank`` where rank 1 is the best. Ties are broken
    by goal difference, then goals scored, then team name (alphabetical), so the
    ranking is strict: every team gets a unique position from 1 to N.
    """
    stats = {team: {"points": 0, "gf": 0, "ga": 0} for team in teams}

    for match in matches.itertuples(index=False):
        home, away = match.equipe_domicile, match.equipe_exterieur
        home_goals = int(match.buts_domicile)
        away_goals = int(match.buts_exterieur)

        stats[home]["gf"] += home_goals
        stats[home]["ga"] += away_goals
        stats[away]["gf"] += away_goals
        stats[away]["ga"] += home_goals

        if home_goals > away_goals:
            stats[home]["points"] += WIN_POINTS
            stats[away]["points"] += LOSS_POINTS
        elif home_goals < away_goals:
            stats[away]["points"] += WIN_POINTS
            stats[home]["points"] += LOSS_POINTS
        else:
            stats[home]["points"] += DRAW_POINTS
            stats[away]["points"] += DRAW_POINTS

    # Build sortable rows: (team, points, goal_difference, goals_for).
    rows = []
    for team in teams:
        goal_diff = stats[team]["gf"] - stats[team]["ga"]
        rows.append((team, stats[team]["points"], goal_diff, stats[team]["gf"]))

    # Sort by points, then goal difference, then goals scored (all descending),
    # and finally by team name (alphabetical) to break perfect ties. This last
    # criterion guarantees every team gets a unique, sequential position instead
    # of many teams piling up on the same rank when they are still tied at 0
    # (e.g. teams that have not played yet on matchday 1).
    rows.sort(key=lambda r: (-r[1], -r[2], -r[3], r[0]))

    # Strict ranking: 1..N, one distinct position per team.
    ranking: dict[str, int] = {}
    for index, (team, _points, _goal_diff, _goals_for) in enumerate(rows):
        ranking[team] = index + 1

    return ranking


def compute_standing_evolution(ligue: str, nom_saison: str) -> dict:
    """Compute the standings evolution for a league/season.

    For every matchday J from 1 to J_max (the last matchday holding at least one
    finished match), the cumulative ranking is computed from all finished
    matches with ``numero <= J``. Incomplete matchdays are still computed with
    the finished matches available (provisional standings).
    """
    engine = _get_engine()

    query = text(
        """
        SELECT numero,
               equipe_domicile,
               equipe_exterieur,
               buts_domicile,
               buts_exterieur,
               statut
        FROM matchs
        WHERE ligue = :ligue
          AND nom_saison = :saison
        ORDER BY numero ASC
        """
    )

    df = pd.read_sql(query, engine, params={"ligue": ligue, "saison": nom_saison})

    # Every team that appears in the season/league, regardless of match status.
    teams = sorted(
        set(df["equipe_domicile"]).union(set(df["equipe_exterieur"]))
    ) if not df.empty else []
    nb_equipes = len(teams)

    # Keep only finished matches that actually have a score recorded.
    finished = df[df["statut"] == "finished"].dropna(
        subset=["buts_domicile", "buts_exterieur"]
    )

    if finished.empty:
        return {
            "journees": [],
            "nb_equipes": nb_equipes,
            "series": [{"equipe": team, "positions": []} for team in teams],
        }

    j_max = int(finished["numero"].max())
    journees = list(range(1, j_max + 1))

    positions_by_team: dict[str, list[int]] = {team: [] for team in teams}

    for matchday in journees:
        played = finished[finished["numero"] <= matchday]
        ranking = _build_ranking(played, teams)
        for team in teams:
            positions_by_team[team].append(ranking[team])

    series = [
        {"equipe": team, "positions": positions_by_team[team]} for team in teams
    ]

    return {
        "journees": journees,
        "nb_equipes": nb_equipes,
        "series": series,
    }
