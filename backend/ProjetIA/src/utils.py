# src/utils.py

def compute_risk(events):
    """
    Niveau de risque basé sur le nombre d'événements
    """
    score = len(events)

    if score == 0:
        status = "Aucun"
    elif score <= 2:
        status = "Faible"
    elif score <= 4:
        status = "Modéré"
    else:
        status = "Élevé"

    return score, status


def format_event(event):
    """
    Formatage propre pour affichage
    """
    return f"- {event['type'].upper()} → '{event['complement']}'"