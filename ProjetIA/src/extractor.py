# src/extractor.py

EVENT_KEYWORDS = {
    "fatigue": ["fatigué", "fatigue", "épuisé"],
    "sommeil perturbé": ["dors mal", "insomnie"],
    "stress": ["stress", "pression"],
    "baisse activité physique": ["moins de sport", "arrêt du sport"],
    "changement alimentaire": ["snacks", "mange plus", "mal manger"]
}


def extract_events(message, start_id=1):
    text = message["text"].lower()
    raw_date = message["date"]

    # 🔹 format date propre
    date = raw_date.split("T")[0]

    events = []
    current_id = start_id

    for event_type, keywords in EVENT_KEYWORDS.items():
        for kw in keywords:
            if kw in text:
                events.append({
                    "id": str(current_id).zfill(5),
                    "date": date,
                    "titre": event_type,
                    "complement": message["text"],
                    "partage": "N"
                })
                current_id += 1
                break

    return events, current_id