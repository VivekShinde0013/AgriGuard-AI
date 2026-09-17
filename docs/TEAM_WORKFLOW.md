# AgriGuard AI — Team Workflow

## Branches
main = stable/demo-ready
develop = integration
feature/<name> = individual development

## One-step rule
ONE STEP → IMPLEMENT → TEST → SEND ACTUAL OUTPUT → REVIEW → PASS/FIX/BLOCKED → NEXT STEP

Do not report completion without evidence.

## Git
feature branch → test → commit → push → PR to develop → review → merge → integration test.

Never directly push feature work to main.

## Dependencies
T5 ML → T4 AI Backend
T4 AI Backend → T1 Farmer Frontend
T6 Weather → T4 Risk
T3 Core APIs → T1 Farmer Frontend
T3/T4 Cases + Validation → T2 Officer/GIS
T6 Advisory/Translation → T1/T2

If blocked:
DEPENDENCY REQUIRED
Owner:
Required:
Why:
Expected format:
Blocking step:

## Core demo
LOGIN → FARM → TOMATO → IMAGE → DISEASE → CONFIDENCE → SEVERITY → WEATHER → RISK → WARNING → ADVISORY → OFFICER → GIS → VALIDATION

Never commit .env, passwords, API keys, JWT secrets, or cloud credentials.
