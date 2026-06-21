"""FastAPI application entrypoint for the Soccer Benin backend."""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.stats import router as stats_router

app = FastAPI(title="Soccer Benin API")

# Allow the Vite frontend (and configured origins) to call the API.
# Set CORS_ORIGINS as a comma-separated list, e.g.
# "http://localhost:5173,https://www.bencofoot.com".
_origins_env = os.environ.get("CORS_ORIGINS", "http://localhost:5173")
allowed_origins = [origin.strip() for origin in _origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers.
app.include_router(stats_router)


@app.get("/health")
def health():
    return {"status": "ok"}
