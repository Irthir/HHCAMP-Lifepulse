# src/extractor.py

import random

EVENT_KEYWORDS = {
    "fatigue": ["fatigué", "fatigue", "épuisé"],
    "sommeil perturbé": ["dors mal", "insomnie"],
    "stress": ["stress", "pression"],
    "baisse activité physique": ["moins de sport", "arrêt du sport"],
    "changement alimentaire": ["snacks", "mange plus", "mal manger"]
}

EVENT_SCORE_RANGE = {
    "fatigue": (5, 8),
    "sommeil perturbé": (6, 9),
    "stress": (7, 10),
    "baisse activité physique": (4, 7),
    "changement alimentaire": (5, 8)
}


def compute_score(event_type):
    min_s, max_s = EVENT_SCORE_RANGE.get(event_type, (3, 7))
    return random.randint(min_s, max_s)


def extract_events(message):
    text = message["text"].lower()
    date = message["date"]

    events = []

    for event_type, keywords in EVENT_KEYWORDS.items():
        for kw in keywords:
            if kw in text:
                events.append({
                    "date": date,
                    "type": event_type,
                    "score": compute_score(event_type),
                    "complement": message["text"] ,
                     "shared": False 
                })
                break

    return events