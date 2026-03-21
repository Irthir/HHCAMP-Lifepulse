from models.nlp.extractor import extract_events
from models.scoring.frequency import compute_frequency
from models.conversation_agent import generate_response


def run_pipeline(text: str, history: list[str]) -> dict:
    events = extract_events(text)
    scores = compute_frequency(events, history)
    response = generate_response(events)

    return {
        "events": events,
        "scores": scores,
        "response": response,
    }