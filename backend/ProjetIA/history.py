import json
import os

HISTORY_FILE = "history.json"


def save_events(events):
    for e in events:
        if "shared" not in e:
            e["shared"] = False

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2, ensure_ascii=False)


def load_history():
    if not os.path.exists(HISTORY_FILE):
        return []

    with open(HISTORY_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def update_event_consent_by_id(event_id, shared):
    events = load_history()

    for e in events:
        if e["id"] == event_id:
            e["shared"] = shared

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2, ensure_ascii=False)


def get_patient_view():
    return load_history()


def get_doctor_view():
    events = load_history()

    shared_events = [e for e in events if e.get("shared") is True]

    if not shared_events:
        return "❌ Aucun événement partagé"

    return shared_events