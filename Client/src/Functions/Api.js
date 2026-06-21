// Base URL of the FastAPI backend (stats endpoints).
// Configurable via Vite env, falls back to local FastAPI.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"
