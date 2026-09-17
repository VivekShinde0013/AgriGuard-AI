# AgriGuard AI — API Contract

Status: Planned — NOT IMPLEMENTED

POST /auth/register
POST /auth/login
GET/POST/PUT /farms
GET /crops
POST /crop-cycles
GET /crop-cycles/{id}
POST /predictions/image
GET /weather
GET/POST /risk
POST/GET /reports
GET /validation/pending
POST /validation/{id}
GET /dashboard/farmer
GET /dashboard/officer
GET /dashboard/admin
GET/POST /monitoring/settings
GET /monitoring/history
POST /monitoring/observations

Conceptual prediction response:

```json
{
  "prediction": "Early Blight",
  "confidence": 0.94,
  "severity": "Moderate",
  "model_version": "v1"
}
```

Example values are illustrative, not actual model output.

Do not silently change shared APIs. Document and communicate contract changes before integration.
