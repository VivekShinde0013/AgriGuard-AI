from pathlib import Path

import torch
from PIL import Image
from torchvision import transforms

from .classes import CLASS_NAMES, DISPLAY_NAMES
from .model_loader import DEVICE, model


HIGH_CONFIDENCE = 0.80
MEDIUM_CONFIDENCE = 0.60


TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225],
    ),
])


def get_confidence_status(confidence):
    if confidence >= HIGH_CONFIDENCE:
        return (
            "high",
            "High confidence prediction. "
            "Verify the image and symptoms before taking treatment decisions."
        )

    if confidence >= MEDIUM_CONFIDENCE:
        return (
            "medium",
            "Moderate confidence prediction. "
            "Consider expert verification before treatment decisions."
        )

    return (
        "low",
        "Low confidence prediction. "
        "Please capture a clearer image or consult an agricultural expert."
    )


def predict_disease(image_path, top_k=3):
    image_path = Path(image_path)

    if not image_path.exists():
        raise FileNotFoundError(
            f"Image not found: {image_path}"
        )

    image = Image.open(image_path).convert("RGB")

    tensor = TRANSFORM(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        outputs = model(tensor)
        probabilities = torch.softmax(outputs, dim=1)

    top_probabilities, top_indices = torch.topk(
        probabilities,
        k=min(top_k, len(CLASS_NAMES)),
        dim=1,
    )

    top_probabilities = top_probabilities[0].cpu().tolist()
    top_indices = top_indices[0].cpu().tolist()

    predicted_index = top_indices[0]
    confidence = top_probabilities[0]

    class_name = CLASS_NAMES[predicted_index]
    display_name = DISPLAY_NAMES[class_name]

    confidence_level, confidence_message = get_confidence_status(
        confidence
    )

    top_predictions = []

    for probability, index in zip(
        top_probabilities,
        top_indices,
    ):
        current_class = CLASS_NAMES[index]

        top_predictions.append({
            "class_name": current_class,
            "display_name": DISPLAY_NAMES[current_class],
            "confidence": round(float(probability), 4),
            "confidence_percent": round(
                float(probability) * 100,
                2,
            ),
        })

    return {
        "disease": class_name,
        "display_name": display_name,
        "confidence": round(float(confidence), 4),
        "confidence_percent": round(
            float(confidence) * 100,
            2,
        ),
        "confidence_level": confidence_level,
        "confidence_message": confidence_message,
        "top_predictions": top_predictions,
    }