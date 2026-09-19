from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.risk import router as risk_router
from backend.app.auth.routes import router as auth_router
from backend.app.farms import router as farms_router
from backend.app.predictions.routes import router as predictions_router
from backend.app.weather import router as weather_router

app = FastAPI(
    title="AgriGuard AI API",
    version="0.1.0"
)
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(farms_router)
app.include_router(predictions_router)
app.include_router(weather_router)
app.include_router(risk_router)