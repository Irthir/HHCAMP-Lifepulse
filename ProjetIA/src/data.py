# src/data.py

from datetime import datetime, timedelta

def get_conversation():
    base_time = datetime.now()

    return [
        {
            "text": "Bonjour, je me sens très fatigué ces derniers jours",
            "date": (base_time - timedelta(days=3)).isoformat()
        },
        {
            "text": "Depuis environ une semaine, et je dors mal",
            "date": (base_time - timedelta(days=2)).isoformat()
        },
        {
            "text": "J’ai beaucoup de stress au travail et je fais moins de sport",
            "date": (base_time - timedelta(days=1)).isoformat()
        },
        {
            "text": "Je mange plus de snacks et moins équilibré",
            "date": base_time.isoformat()
        }
    ]