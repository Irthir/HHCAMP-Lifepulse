from flask import Flask, render_template, request
from logic.patient_logic import handle_patient
from logic.medecin_logic import handle_medecin

app = Flask(__name__)

# -----------------------------
# 🏠 Page d'accueil
# -----------------------------
@app.route("/")
def home():
    return render_template("home.html")
    """
    <h1>LifePulse</h1>
    <p>Application de détection d'événements patients</p>

    <ul>
        <li><a href='/patient'>Vue Patient</a></li>
        <li><a href='/medecin'>Vue Médecin</a></li>
    </ul>
    """

# -----------------------------
# 👤 Vue Patient (chat IA)
# -----------------------------
@app.route("/patient", methods=["GET", "POST"])
def patient():
    chat = []

    if request.method == "POST":
        message = request.form.get("message")
        chat = handle_patient(message)
    else:
        from logic.patient_logic import chat_history
        chat = chat_history

    return render_template("patient.html", chat=chat)

# -----------------------------
# 🩺 Vue Médecin (rapport)
# -----------------------------
@app.route("/medecin")
def medecin():
    report = handle_medecin()
    return render_template("medecin.html", report=report)


# -----------------------------
# 🚀 Lancement
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)