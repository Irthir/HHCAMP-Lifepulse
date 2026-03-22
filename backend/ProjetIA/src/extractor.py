# src/extractor.py

EVENT_KEYWORDS = {
    "compulsion alimentaire": [
        "je mange sans faim", "compulsion", "je ne peux pas m'arrêter", "craving"
    ],
    "grignotage": [
        "snacks", "grignote", "je mange entre les repas"
    ],
    "excès alimentaire": [
        "je mange trop", "grosses portions", "excès"
    ],
    "alimentation déséquilibrée": [
        "mal manger", "fast food", "sucré", "gras"
    ],
    "sédentarité": [
        "je ne bouge pas", "je reste assis", "peu actif"
    ],
    "baisse activité physique": [
    "moins de sport",
    "arrêt du sport",
    "arrêté le sport",
    "j'ai arrêté le sport",
    "je ne fais plus de sport"
    ],
    "fatigue": [
        "fatigué", "épuisé", "manque d'énergie"
    ],
    "sommeil perturbé": [
        "dors mal", "insomnie", "mauvais sommeil"
    ],
    "stress émotionnel": [
        "stress", "angoisse", "pression", "je suis anxieux"
    ],
    "perte de motivation": [
        "je suis démotivé", "j'abandonne", "pas motivé"
    ],
    "non adhérence traitement": [
        "oublié mon traitement", "je ne prends plus", "j'ai arrêté le médicament"
    ]
}


def extract_events(message, start_id=1):
    text = message["text"].lower()
    date = message["date"].split("T")[0]

    events = []
    current_id = start_id

    for event_type, keywords in EVENT_KEYWORDS.items():
        for kw in keywords:
            if kw in text:
                events.append({
                    "id": str(current_id).zfill(5),  # 🔥 ID unique
                    "date": date,
                    "titre": event_type,
                    "complement": message["text"],
                    "partage": "N"
                })
                current_id += 1
                break

    return events, current_id