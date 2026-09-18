import json
from pathlib import Path


KNOWLEDGE_BASE_PATH = Path(__file__).parent / "knowledge_base.json"


def load_knowledge_base():
    with open(KNOWLEDGE_BASE_PATH, "r", encoding="utf-8") as file:
        data = json.load(file)

    return data.get("documents", [])


def retrieve_knowledge(disease: str):
    documents = load_knowledge_base()

    disease = disease.strip().lower()

    matches = []

    for document in documents:
        document_disease = document.get("disease", "").strip().lower()

        if disease == document_disease:
            matches.append(document)

    return matches


def get_advisory_knowledge(disease: str):
    matches = retrieve_knowledge(disease)

    if not matches:
        return {
            "status": "no_trusted_knowledge",
            "message": "No trusted agricultural knowledge is available for this disease.",
            "documents": []
        }

    return {
        "status": "knowledge_found",
        "message": "Trusted agricultural knowledge found.",
        "documents": matches
    }

ML_TO_RAG_DISEASE = {
    "Tomato___healthy": "Healthy",
    "Tomato___Bacterial_spot": "Bacterial Spot",
    "Tomato___Early_blight": "Early Blight",
    "Tomato___Late_blight": "Late Blight",
    "Tomato___Leaf_Mold": "Leaf Mold",
    "Tomato___Septoria_leaf_spot": "Septoria Leaf Spot",
    "Tomato___Spider_mites Two-spotted_spider_mite": "Spider Mites",
    "Tomato___Target_Spot": "Target Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Tomato Yellow Leaf Curl Virus",
    "Tomato___Tomato_mosaic_virus": "Tomato Mosaic Virus"
}


def map_ml_disease_to_rag(ml_disease: str):
    return ML_TO_RAG_DISEASE.get(ml_disease)
def retrieve_for_ml_prediction(ml_disease: str):
    rag_disease = map_ml_disease_to_rag(ml_disease)

    if not rag_disease:
        return {
            "status": "invalid_disease_class",
            "message": "The ML disease class is not recognized.",
            "documents": []
        }

    return get_advisory_knowledge(rag_disease)