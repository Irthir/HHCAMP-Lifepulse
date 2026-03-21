from models.lifepulse_model import LifePulseModel

model = LifePulseModel()

# 🔹 historique chat
chat_history = []

# 🔹 historique événements (important pour le médecin)
event_history = []


def handle_patient(text):

    result = model.predict(text, event_history)

    # sauvegarde événements
    for event in result["events"]:
        event_history.append(event)

    # sauvegarde chat
    chat_history.append({
        "user": text,
        "bot": result["response"]
    })

    return chat_history