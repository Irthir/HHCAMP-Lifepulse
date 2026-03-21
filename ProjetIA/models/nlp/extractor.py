from models.nlp.classifier import predict_events

def extract_events(text: str):
    return predict_events(text)