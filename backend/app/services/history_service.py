import json
import os

HISTORY_FILE = "history.json"


# -----------------------------
# 🔹 Charger historique
# -----------------------------
def load_history():
    if not os.path.exists(HISTORY_FILE):
        return []

    with open(HISTORY_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


# -----------------------------
# 🔹 Sauvegarder événements
# -----------------------------
def save_events(events):
    history = load_history()

    # 🔥 Ajouter sans écraser
    history.extend(events)

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2, ensure_ascii=False)


# -----------------------------
# 🔹 Vue patient (format front)
# -----------------------------
def get_patient_history():
    events = load_history()

    return [
        {
            "id": e["id"],
            "date": e["date"],
            "titre": e["titre"],
            "description": e["complement"],  # mapping front
            "partage": e["partage"]
        }
        for e in events
    ]


# -----------------------------
# 🔹 Update consentement
# -----------------------------
def update_consent(event_id, consent):
    events = load_history()

    for e in events:
        if e["id"] == event_id:
            e["partage"] = consent

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2, ensure_ascii=False)

    return {"status": "updated"}