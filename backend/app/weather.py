from fastapi import APIRouter, HTTPException, Query

from integrations.weather.weather_service import get_weather

router = APIRouter(tags=["weather"])


@router.get("/weather")
def weather(
    lat: float = Query(...),
    lon: float = Query(...)
):
    try:
        return get_weather(lat, lon)
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc))
