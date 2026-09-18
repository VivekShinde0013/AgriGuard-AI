import os

import httpx
from dotenv import load_dotenv

load_dotenv()

SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")

SARVAM_TRANSLATE_URL = "https://api.sarvam.ai/translate"


def translate_text(
    text: str,
    source_language: str = "en-IN",
    target_language: str = "mr-IN",
) -> dict:
    """
    Translate text using Sarvam AI Translation API.
    """

    if not text or not text.strip():
        raise ValueError("Translation text cannot be empty")

    supported_languages = {
        "en-IN",
        "hi-IN",
        "mr-IN",
    }

    if source_language not in supported_languages:
        raise ValueError(
            f"Unsupported source language: {source_language}"
        )

    if target_language not in supported_languages:
        raise ValueError(
            f"Unsupported target language: {target_language}"
        )

    if not SARVAM_API_KEY:
        raise RuntimeError(
            "SARVAM_API_KEY is not configured"
        )

    payload = {
        "input": text.strip(),
        "source_language_code": source_language,
        "target_language_code": target_language,
        "model": "sarvam-translate:v1",
    }

    headers = {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json",
    }

    try:
        response = httpx.post(
            SARVAM_TRANSLATE_URL,
            json=payload,
            headers=headers,
            timeout=30.0,
        )

        response.raise_for_status()

    except httpx.HTTPStatusError as exc:
        raise RuntimeError(
            f"Translation API returned HTTP "
            f"{exc.response.status_code}"
        ) from exc

    except httpx.RequestError as exc:
        raise RuntimeError(
            "Unable to connect to the Translation API"
        ) from exc

    data = response.json()

    translated_text = data.get("translated_text")

    if not translated_text:
        raise RuntimeError(
            "Translation API returned no translated text"
        )

    return {
        "source_text": text.strip(),
        "translated_text": translated_text,
        "source_language": source_language,
        "target_language": target_language,
    }