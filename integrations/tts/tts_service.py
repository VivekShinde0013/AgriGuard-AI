def speak_text(text: str, language: str = "en") -> dict:
    """
    Prepare text for browser-based Text-to-Speech.

    The actual speech playback will be handled by the frontend
    using the browser's built-in SpeechSynthesis API.
    """

    if not text or not text.strip():
        raise ValueError("TTS text cannot be empty")

    supported_languages = {
        "en": "en-IN",
        "mr": "mr-IN",
        "hi": "hi-IN",
    }

    if language not in supported_languages:
        raise ValueError(
            f"Unsupported TTS language: {language}"
        )

    return {
        "text": text.strip(),
        "language": language,
        "locale": supported_languages[language],
    }