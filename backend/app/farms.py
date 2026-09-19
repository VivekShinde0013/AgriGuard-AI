from fastapi import APIRouter, HTTPException

from backend.app.db.database import get_connection

router = APIRouter(prefix="/farms", tags=["farms"])


@router.get("/{farm_id}")
def get_farm_location(farm_id: int):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, latitude, longitude
                FROM farmers
                WHERE id = %s
                """,
                (farm_id,)
            )

            farm = cur.fetchone()

    if not farm:
        raise HTTPException(
            status_code=404,
            detail="Farm not found"
        )

    farm_id, latitude, longitude = farm

    if latitude is None or longitude is None:
        raise HTTPException(
            status_code=404,
            detail="Farm location not configured"
        )

    return {
        "farm_id": farm_id,
        "latitude": latitude,
        "longitude": longitude
    }