from logic.patient_logic import event_history

def handle_medecin():

    if not event_history:
        return "Aucun événement enregistré"

    report = {}

    for event in event_history:
        report[event] = report.get(event, 0) + 1

    return report