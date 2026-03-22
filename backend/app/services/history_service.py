import json
import os

HISTORY_FILE = "history.json"


def load_history():
    if not os.path.exists(HISTORY_FILE):
        return []

    with open(HISTORY_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_events(events):
    history = load_history()

    # 🔥 éviter doublons par ID
    existing_ids = {e["id"] for e in history}

    for e in events:
        if "partage" not in e:
            e["partage"] = "N"

        if e["id"] not in existing_ids:
            history.append(e)

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2, ensure_ascii=False)


def get_patient_history():
    events = load_history()

    return [
        {
            "id": e.get("id"),
            "date": e.get("date"),
            "titre": e.get("titre"),
            "description": e.get("complement"),
            "partage": e.get("partage", "N")
        }
        for e in events
    ]


def update_consent(event_id, consent):
    events = load_history()

    for e in events:
        if e["id"] == event_id:
            e["partage"] = consent

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2, ensure_ascii=False)

    return {"status": "updated"}

def clear_history():
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump([], f)