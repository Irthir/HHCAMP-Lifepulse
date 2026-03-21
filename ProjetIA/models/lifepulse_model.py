from models.lifepulse_pipeline import run_pipeline


class LifePulseModel:
    def predict(self, text: str, history: list[str]) -> dict:
        return run_pipeline(text, history)