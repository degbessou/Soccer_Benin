"""Statistics endpoints."""

import time

from fastapi import APIRouter, HTTPException, Query

from stats.classement_evolution import compute_standing_evolution

router = APIRouter(prefix="/api/stats", tags=["stats"])

# Simple in-memory cache: {(ligue, saison): (timestamp, payload)}.
_CACHE: dict[tuple[str, str], tuple[float, dict]] = {}
_CACHE_TTL_SECONDS = 60


@router.get("/classement-evolution")
def get_classement_evolution(
    ligue: str = Query(..., description="League name, e.g. 'Celtiis Ligue 1'"),
    saison: str = Query(..., description="Season name, e.g. 'Saison 2025-2026'"),
    force_refresh: bool = Query(
        False, description="Bypass and refresh the in-memory cache"
    ),
):
    """Return the matchday-by-matchday standings evolution.

    Results are cached in memory for 60 seconds per (league, season). Pass
    ``force_refresh=true`` to bypass and rebuild the cache entry.
    """
    cache_key = (ligue, saison)
    now = time.time()

    if not force_refresh and cache_key in _CACHE:
        cached_at, payload = _CACHE[cache_key]
        if now - cached_at < _CACHE_TTL_SECONDS:
            return payload

    try:
        payload = compute_standing_evolution(ligue, saison)
    except Exception as exc:  # noqa: BLE001 - surface a clean 500 to the client
        raise HTTPException(status_code=500, detail=str(exc))

    _CACHE[cache_key] = (now, payload)
    return payload
