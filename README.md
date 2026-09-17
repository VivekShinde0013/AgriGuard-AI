# AgriGuard AI

SIH 2026 — Early Detection and Management of Crop Diseases and Pest Infestations

Problem: SIH26131
Organization: Government of Maharashtra
Theme: Agriculture, FoodTech & Rural Development

## Workflow
DETECT → ASSESS → PREDICT → MAP → ADVISE → VALIDATE → MONITOR → LEARN

## Users
- Farmer
- Extension Officer / Agriculture Expert
- Agriculture Administrator

## Initial MVP
Crop: Tomato

Disease classes:
- Healthy
- Early Blight
- Late Blight
- Leaf Mold
- Septoria Leaf Spot

## Core Demo
LOGIN → FARM → TOMATO → IMAGE UPLOAD → DISEASE PREDICTION → CONFIDENCE → SEVERITY → WEATHER → RISK → EARLY WARNING → ADVISORY → OFFICER DASHBOARD → GIS → EXPERT VALIDATION

## Stack
Frontend: Next.js, React, TypeScript, Tailwind CSS, React Query, Leaflet
Backend: Python, FastAPI, Pydantic, SQLAlchemy, PostgreSQL
ML: Python, PyTorch/OpenCV/NumPy/scikit-learn as actually required
GIS: Leaflet/GeoJSON
RAG/LLM: Prediction → Knowledge Base → Retrieval → LLM → Advisory

RAG/LLM is not the primary image diagnosis mechanism and must not invent unsupported agricultural or pesticide advice.

## Git
main = stable/demo-ready
develop = integration
feature/<name> = individual development

Workflow: feature → test → commit → push → PR → develop → integration test → main when stable.

Do not commit secrets, datasets, or large model artifacts without an agreed storage/Git LFS approach.

## Status
Repository initialization.
