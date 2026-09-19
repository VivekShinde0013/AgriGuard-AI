from fastapi import APIRouter
from pydantic import BaseModel
from app.ai.risk import assess_risk


router = APIRouter(tags=["risk"])


class RiskRequest(BaseModel):
    prediction: dict
    weather: dict


@router.post("/risk")
def calculate_risk(request: RiskRequest):
    return assess_risk(request.prediction, request.weather)