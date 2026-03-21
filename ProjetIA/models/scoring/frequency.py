def compute_frequency(events: list[str], history: list[str]) -> dict:
    scores = {}

    for event in events:
        freq = history.count(event) + 1

        if freq >= 5:
            niveau = "élevé"
        elif freq >= 3:
            niveau = "modéré"
        else:
            niveau = "faible"

        scores[event] = {
            "frequence": freq,
            "niveau": niveau,
        }

    return scores