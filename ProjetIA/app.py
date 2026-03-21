# app.py

from src.data import get_conversation
from src.extractor import extract_events
from history import (
    save_events,
    get_patient_view,
    get_doctor_view,
    update_event_consent   # 
)
import json


def main():
    conversation = get_conversation()
    all_events = []

    print("\n===== 💬 Entretien Patient =====\n")

    for msg in conversation:

        # 🔹 Gestion des deux formats (Q/A ou text)
        if "question" in msg and "answer" in msg:
            print(f"🤖 {msg['question']}")
            print(f"👤 {msg['answer']}")
            text = msg["answer"]

        elif "text" in msg:
            print(f"👤 Patient: {msg['text']}")
            text = msg["text"]

        else:
            print("⚠️ Format inconnu dans data.py")
            continue

        # 🔹 Extraction
        events = extract_events({
            "text": text,
            "date": msg["date"]
        })

        if events:
            print("🧠 Événements détectés :")
            for e in events:
                print(f"   - {e['type']} ({e['score']}/10) → {e['complement']}")

        all_events.extend(events)
        print()

    # 🔹 Gestion consentement uniquement si événements
    if len(all_events) > 0:

        save_events(all_events)
        print("\n💾 Historique sauvegardé")

        # 👤 Vue patient
        print("\n===== 👤 Historique Patient =====\n")
        print(json.dumps(get_patient_view(), indent=2, ensure_ascii=False))

        # 🔒 Consentement
        print("\n🔒 Choisissez quels événements partager avec le médecin :\n")

        events = get_patient_view()

        for i, e in enumerate(events):
            print(f"{i} → {e['type']} ({e['score']}/10) → {e['complement']}")
            choice = input("Partager cet événement ? (oui/non): ")
            consent = choice.lower() == "oui"
            update_event_consent(i, consent)

        # 🩺 Vue médecin
        print("\n===== 🩺 Vue Médecin =====\n")
        doctor_data = get_doctor_view()

        if isinstance(doctor_data, str):
            print(doctor_data)
        else:
            print(json.dumps(doctor_data, indent=2, ensure_ascii=False))

    else:
        print("\n✅ Aucun événement détecté")
        print("👉 Aucun partage nécessaire")


if __name__ == "__main__":
    main()