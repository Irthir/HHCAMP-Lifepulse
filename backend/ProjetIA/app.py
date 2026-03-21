from src.data import get_conversation
from src.extractor import extract_events
from history import (
    save_events,
    get_patient_view,
    get_doctor_view,
    update_event_consent_by_id
)
import json


def main():
    conversation = get_conversation()
    all_events = []
    current_id = 1

    print("\n===== 💬 Entretien Patient =====\n")

    for msg in conversation:

        if "question" in msg and "answer" in msg:
            print(f"🤖 {msg['question']}")
            print(f"👤 {msg['answer']}")
            text = msg["answer"]

        elif "text" in msg:
            print(f"👤 Patient: {msg['text']}")
            text = msg["text"]

        else:
            continue

        events, current_id = extract_events({
            "text": text,
            "date": msg["date"]
        }, start_id=current_id)

        if events:
            print("🧠 Événements détectés :")
            for e in events:
                print(f"   - {e['titre']} → {e['complement']}")

        all_events.extend(events)
        print()

    if len(all_events) > 0:

        save_events(all_events)
        print("\n💾 Historique sauvegardé")

        print("\n===== 👤 Historique Patient =====\n")
        events = get_patient_view()
        print(json.dumps(events, indent=2, ensure_ascii=False))

        print("\n🔒 Choisissez quels événements partager :\n")

        for e in events:
            print(f"{e['id']} → {e['titre']} → {e['complement']}")
            choice = input("Partager ? (oui/non): ")

            shared = True if choice.strip().lower() == "oui" else False
            update_event_consent_by_id(e["id"], shared)

        print("\n===== 🩺 Vue Médecin =====\n")
        doctor_data = get_doctor_view()
        print(json.dumps(doctor_data, indent=2, ensure_ascii=False))

    else:
        print("\n✅ Aucun événement détecté")


if __name__ == "__main__":
    main()