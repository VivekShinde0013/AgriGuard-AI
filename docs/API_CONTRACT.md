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

## POST /predictions/image

Returns the actual response produced by T5 ML inference.

```json
{
  "disease": "Tomato___Septoria_leaf_spot",
  "display_name": "Septoria Leaf Spot",
  "confidence": 0.7379,
  "confidence_percent": 73.79,
  "confidence_level": "medium",
  "confidence_message": "Moderate confidence prediction. Consider expert verification before treatment decisions.",
  "top_predictions": [
    {
      "class_name": "Tomato___Septoria_leaf_spot",
      "display_name": "Septoria Leaf Spot",
      "confidence": 0.7379,
      "confidence_percent": 73.79
    }
  ]
}
```

The fields returned by T5 ML are:

- `disease`
- `display_name`
- `confidence`
- `confidence_percent`
- `confidence_level`
- `confidence_message`
- `top_predictions`

`severity` is not currently provided by T5 ML.

`model_version` is not currently provided by T5 ML.

Neither `severity` nor `model_version` should be fabricated or hardcoded in the `/predictions/image` endpoint.

The ML response structure should remain unchanged.

Do not silently change shared APIs. Document and communicate contract changes before integration.