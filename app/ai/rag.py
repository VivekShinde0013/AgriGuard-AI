from integrations.rag.rag_service import retrieve_for_ml_prediction

def retrieve_knowledge(disease: str) -> dict:
    return retrieve_for_ml_prediction(disease)