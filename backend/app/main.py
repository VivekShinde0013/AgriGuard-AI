from fastapi import FastAPI
from backend.app.auth.routes import router as auth_router
from backend.app.predictions.routes import router as predictions_router

app = FastAPI(
    title="AgriGuard AI API",
    version="0.1.0"
)


app.include_router(auth_router)
app.include_router(predictions_router)
