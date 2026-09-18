from pathlib import Path

import torch
import torch.nn as nn
from torchvision import models

from .classes import CLASS_NAMES


MODEL_PATH = (
    Path(__file__).resolve().parent.parent
    / "model"
    / "agri_guard_efficientnet_v2_s_domain_adapted_best.pth"
)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def build_model():
    model = models.efficientnet_v2_s(weights=None)

    model.classifier = nn.Sequential(
        nn.Dropout(p=0.35),
        nn.Linear(
            model.classifier[1].in_features,
            len(CLASS_NAMES),
        ),
    )

    return model


def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Model checkpoint not found: {MODEL_PATH}"
        )

    model = build_model()

    checkpoint = torch.load(
        MODEL_PATH,
        map_location=DEVICE,
    )

    if isinstance(checkpoint, dict):
        if "model_state_dict" in checkpoint:
            state_dict = checkpoint["model_state_dict"]
        elif "state_dict" in checkpoint:
            state_dict = checkpoint["state_dict"]
        else:
            state_dict = checkpoint
    else:
        state_dict = checkpoint

    state_dict = {
        key.replace("module.", "", 1): value
        for key, value in state_dict.items()
    }

    model.load_state_dict(state_dict)

    model.to(DEVICE)
    model.eval()

    return model


model = load_model()