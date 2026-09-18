from fastapi import FastAPI, UploadFile, File
from ml.inference import predict_disease
import tempfile
import os

app = FastAPI(
    title="AgriGuard AI API",
    version="0.1.0",
)

@app.get("/")
def root():
    return {"message": "AgriGuard AI API is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/predictions/image")
async def predict_image(file: UploadFile = File(...)):
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