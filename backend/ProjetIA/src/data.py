from datetime import datetime, timedelta

def get_conversation():
    base_time = datetime.now()

    return [
        {
            "question": "Comment vous sentez-vous ces derniers jours ?",
            "answer": "Je suis très fatigué et stressé",
            "date": (base_time - timedelta(days=3)).isoformat()
        },
        {
            "question": "Comment se passe votre sommeil ?",
            "answer": "Je dors mal et je me réveille souvent",
            "date": (base_time - timedelta(days=2)).isoformat()
        },
        {
            "question": "Avez-vous changé vos habitudes alimentaires ?",
            "answer": "Je mange beaucoup de snacks",
            "date": (base_time - timedelta(days=1)).isoformat()
        },
        {
            "question": "Faites-vous du sport ?",
            "answer": "J’ai arrêté le sport",
            "date": base_time.isoformat()
        }
    ]