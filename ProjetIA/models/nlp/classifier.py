def predict_events(text: str):

    text = text.lower()

    events = []

    if "stress" in text or "pression" in text:
        events.append("stress")

    if "fatigue" in text or "épuisé" in text:
        events.append("fatigue")

    if "dorm" in text or "insomnie" in text:
        events.append("sommeil perturbé")

    if "mange" in text or "grignote" in text:
        events.append("changement alimentaire")

    if "sport" in text or "activité" in text:
        events.append("baisse activité physique")

    return list(set(events))