# AgriGuard AI — Architecture

Status: Initial planned architecture

Farmer / Officer / Admin
→ Next.js Frontend
→ FastAPI Backend
→ PostgreSQL
→ ML / Weather / Risk / RAG / GIS services

## ML
Dataset → Preprocess → Train → Evaluate → Export → Inference → Backend

Production backend should consume a stable ML inference interface.

## Risk
Disease prediction + relevant weather/environment information → risk assessment → early warning.

## GIS
Backend case/farm/risk data → GeoJSON/API → Leaflet/React-Leaflet.

## Advisory
Prediction → trusted knowledge base → retrieval → LLM → farmer-friendly advisory.

## Security
Secrets in environment variables. Validate uploads. Apply role-based authorization. Never commit credentials.
