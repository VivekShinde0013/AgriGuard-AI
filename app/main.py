from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.ai.risk import assess_risk
import tempfile
import os

app = FastAPI(
    title="AgriGuard AI API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RiskRequest(BaseModel):
    prediction: dict
    weather: dict

@app.get("/")
def root():
    return {"message": "AgriGuard AI API is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/predictions/image")
async def predict_image(file: UploadFile = File(...)):
    from ml.inference import predict_disease

    suffix = os.path.splitext(file.filename)[1]
    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
            temp_path = temp_file.name
            temp_file.write(await file.read())

        result = predict_disease(temp_path, top_k=3)
        return result

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)

@app.post("/risk")
def calculate_risk(request: RiskRequest):
    return assess_risk(request.prediction, request.weather)