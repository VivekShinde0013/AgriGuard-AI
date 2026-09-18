import os
import httpx
from dotenv import load_dotenv

load_dotenv()

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_weather(latitude: float, longitude: float):
    if not WEATHER_API_KEY:
        raise RuntimeError("WEATHER_API_KEY is not configured")

    params = {
        "lat": latitude,
        "lon": longitude,
        "appid": WEATHER_API_KEY,
        "units": "metric",
    }

    try:
        response = httpx.get(
            OPENWEATHER_URL,
            params=params,
            timeout=10.0,
        )

        response.raise_for_status()

    except httpx.HTTPStatusError as exc:
        raise RuntimeError(
            f"Weather API returned HTTP {exc.response.status_code}"
        ) from exc

    except httpx.RequestError as exc:
        raise RuntimeError(
            "Unable to connect to the Weather API"
        ) from exc

    data = response.json()

    rainfall = data.get("rain", {}).get("1h")

    wind_speed_ms = data.get("wind", {}).get("speed")

    if wind_speed_ms is not None:
        wind_speed_kmh = wind_speed_ms * 3.6
    else:
        wind_speed_kmh = None

    weather = data.get("weather", [])

    if weather:
        weather_condition = weather[0].get("main")
    else:
        weather_condition = None

    return {
        "latitude": latitude,
        "longitude": longitude,
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "rainfall": rainfall,
        "wind_speed": wind_speed_kmh,
        "weather_condition": weather_condition,
    }
