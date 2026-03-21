# src/utils.py

def compute_risk(events):
    """
    Score global patient basé sur nombre d'événements
    """
    score = len(events) * 10

    if score < 20:
        status = "Faible"
    elif score < 50:
        status = "Modéré"
    else:
        status = "Élevé"

    return score, status


def format_event(event):
    """
    Formatage propre pour affichage
    """
    return (
        f"- {event['event'].upper()} "
        f"(score: {event['confidence']}) "
        f"→ '{event['source']}'"
    )