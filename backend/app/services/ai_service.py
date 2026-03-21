# services/ai_service.py

import sys
import os
from datetime import datetime

# 🔥 accès à ProjetIA
sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../../ProjetIA")
    )
)

from src.extractor import extract_events
from history import save_events


def process_message(text: str, date: str | None = None):
    """
    Pipeline principal IA
    """

    date = date or datetime.now().isoformat()

    events, _ = extract_events({
        "text": text,
        "date": date
    })

    if events:
        save_events(events)

    return events