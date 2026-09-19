# T6 Weather ? Risk Integration Handoff

## Weather Service

File:
integrations/weather/weather_service.py

Provider:
OpenWeather Current Weather API

Input:
- latitude: decimal degrees
- longitude: decimal degrees

Normalized output:
{
  "latitude": <number>,
  "longitude": <number>,
  "temperature": <number>,
  "humidity": <number>,
  "rainfall": <number or null>,
  "wind_speed": <number or null>,
  "weather_condition": <string or null>
}

## Units

- temperature: °C
- humidity: %
- rainfall: mm
- wind_speed: km/h
- latitude/longitude: decimal degrees

## Environment Variable

WEATHER_API_KEY

The API key must remain in the local .env file and must never be committed.

## Error Handling

- Missing WEATHER_API_KEY ? RuntimeError
- Weather API HTTP error ? RuntimeError with HTTP status
- Connection/request failure ? RuntimeError indicating the Weather API could not be reached

## Integration Boundary

T6 provides normalized weather data to the backend/Risk integration.

T6 does not implement or modify Risk calculations.

T6 does not invent weather values when a provider field is unavailable.

## Tested

Real OpenWeather API request was successfully tested using:
latitude: 31.2240
longitude: 75.7708

The service returned normalized JSON successfully.

An invalid API key was also tested and correctly produced:
Weather API returned HTTP 401

## Limitation

Rainfall may be null when the provider does not return recent rainfall data.

## Integration Rule

Use the existing backend/API contract when integrating Weather with Risk.
Do not create a competing API or change the shared database schema without team agreement.

## Verified Risk Integration

T4 Risk implementation:
- Branch: feature/t4-ai-backend
- Commit: 71e6772
- File: app/ai/risk.py
- Endpoint: POST /risk

HTTP-level test was successfully completed using the finalized Weather + Prediction request.

Test request:
{
  "prediction": {
    "disease": "Tomato___Early_blight"
  },
  "weather": {
    "latitude": 31.224,
    "longitude": 75.7708,
    "temperature": 25.42,
    "humidity": 60,
    "rainfall": null,
    "wind_speed": 8.568,
    "weather_condition": "Clear"
  }
}

HTTP status:
200

Verified response:
{
  "disease": "Tomato___Early_blight",
  "risk_level": "favorable_conditions",
  "risk_factors": [
    "Temperature is within the documented favorable range",
    "Rainfall data unavailable; rainfall not evaluated"
  ],
  "basis": "University of Minnesota Extension"
}

Integration status:
Weather -> Risk contract verified successfully.

Note:
The HTTP test was isolated from ML model loading by supplying an already-produced prediction object, as agreed with T4.
