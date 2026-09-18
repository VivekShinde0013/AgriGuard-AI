# AgriGuard AI — Master State

Current phase: MVP Frontend Integration
Current milestone: Officer Dashboard + Cases Route
Date: 18 September 2026
Hackathon: 18 September 2026

## Team
T1 — Farmer Frontend
T2 — Officer / GIS / Admin
T3 — Backend Core / Database
T4 — AI Backend / Monitoring
T5 — ML / AI
T6 — Integrations / RAG / Translation / TTS

## MVP
Tomato
Healthy, Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot

## Completed work
- T2 Officer Dashboard shell implemented.
- Officer Cases route implemented at `/cases`.
- Dashboard Cases navigation connected to the Cases route.
- Cases UI uses clearly labeled demonstration data; backend integration is pending.
- Changes merged into `develop` and production build verified successfully.

## Integration milestones
I1 Auth + DB
I2 Farm + Crop
I3 Image Upload
I4 Image → ML → Backend → Frontend
I5 Weather → Risk
I6 Risk → Early Warning → Notification
I7 Monitoring → Follow-up → Timeline
I8 Expert Validation
I9 GIS → Officer Dashboard
I10 RAG → Advisory
I11 Community → Translation → Voice
I12 Full End-to-End System

## Rules
Protect working functionality. Avoid major architecture changes. Fix blockers before adding features. Test real integrated flows. Never commit secrets. Never invent APIs, database structures, or ML interfaces.
