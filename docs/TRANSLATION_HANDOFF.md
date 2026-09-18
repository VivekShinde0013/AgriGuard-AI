# AgriGuard AI - Translation Handoff

Status: Implemented and tested

## Provider

Sarvam AI Translation API

Endpoint:

POST https://api.sarvam.ai/translate

## Environment Variable

The service requires:

SARVAM_API_KEY

The API key must be stored only in `.env`.

Never commit or expose the API key.

## Supported Languages

Current AgriGuard implementation supports:

- English: `en-IN`
- Hindi: `hi-IN`
- Marathi: `mr-IN`

Primary translation requirements:

- English -> Hindi
- English -> Marathi

## Service

File:

`integrations/translation/translation_service.py`

Main function:

`translate_text()`

## Integration Flow

Disease Detection
-> Risk Assessment
-> Agricultural Advisory
-> Translation
-> Marathi/Hindi Advisory
-> TTS
-> Farmer

Translation only translates already-generated advisory text.

It must not generate or invent agricultural recommendations.

## TTS Integration

The translated text can be passed to the existing browser-based TTS component.

Supported TTS locales:

- English: `en-IN`
- Marathi: `mr-IN`
- Hindi: `hi-IN`

Translation and TTS are separate services.

## Testing Completed

- Python compilation: PASS
- English -> Marathi: PASS
- English -> Hindi: PASS
- Empty input validation: PASS
- Unsupported target language validation: PASS
- Unsupported source language validation: PASS

## Integration Boundary

T6 owns the Translation integration.

Other modules should call the translation service rather than creating a competing translation implementation.

Do not modify the shared prediction API contract for Translation.

Do not add translation credentials to source code.

Do not commit `.env`.

## Current Limitation

The current implementation supports English, Hindi, and Marathi only.

Additional languages should be added only after confirming provider support and project requirements.