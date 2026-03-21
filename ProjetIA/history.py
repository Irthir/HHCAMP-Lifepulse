# history.py

import json
import os

HISTORY_FILE = "history.json"


def save_events(events):
    """
    Sauvegarde les événements avec shared=False par défaut
    """
    # 🔹 on s'assure que chaque event a le champ shared
    for e in events:
        if "shared" not in e:
            e["shared"] = False

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2, ensure_ascii=False)


def load_history():
    """
    Charge l'historique
    """
    if not os.path.exists(HISTORY_FILE):
        return []

    with open(HISTORY_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def update_event_consent(index, consent):
    """
    Met à jour le consentement d'un événement spécifique
    """
    events = load_history()

    if 0 <= index < len(events):
        events[index]["shared"] = consent

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2, ensure_ascii=False)


def get_patient_view():
    """
    Vue patient → tous les événements
    """
    return load_history()


def get_doctor_view():
    """
    Vue médecin → uniquement événements partagés
    """
    events = load_history()

    shared_events = [e for e in events if e.get("shared")]

    if not shared_events:
        return "❌ Aucun événement partagé"

    return shared_events