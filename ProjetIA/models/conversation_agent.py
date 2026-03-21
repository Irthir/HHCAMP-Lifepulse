def generate_response(events):

    if not events:
        return "Pouvez-vous préciser comment vous vous sentez ces derniers jours ?"

    responses = []

    if "stress" in events:
        responses.append("Vous semblez stressé. Est-ce lié au travail ou à un événement particulier ?")

    if "fatigue" in events:
        responses.append("Depuis combien de temps ressentez-vous cette fatigue ?")

    if "sommeil perturbé" in events:
        responses.append("Votre sommeil est-il irrégulier ou de mauvaise qualité ?")

    return " ".join(responses)