import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { setPartage } from "../../services/api";
import { useState } from "react";

export default function HealthRecord() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
  { id: "1", date: "2026-03-20", titre: "Arrêt d'activité", type: "activite", score: -3, partage: "N",
    detail: "Cessation temporaire des activités sportives pour cause de fatigue." },

  { id: "2", date: "2026-03-10", titre: "Retour à la salle de sport", type: "activite", score: 3, partage: "N",
    detail: "Reprise progressive des séances de sport en salle." },

  { id: "3", date: "2026-02-25", titre: "Changement de travail", type: "evenement", score: -2, partage: "N",
    detail: "Nouveau poste avec horaires et responsabilités différentes." },

  { id: "4", date: "2026-02-18", titre: "Horaires irrégulières", type: "humeur", score: -2, partage: "N",
    detail: "Difficultés à maintenir un rythme stable à cause du travail." },

  { id: "5", date: "2026-02-12", titre: "Fatigue accumulée", type: "humeur", score: -3, partage: "N",
    detail: "Sensation de fatigue générale sur plusieurs semaines." },

  // 🔹 Événements secondaires / médicaux
  { id: "6", date: "2026-03-18", titre: "Petite grippe", type: "maladie", score: -2, partage: "N",
    detail: "Fatigue et légers symptômes respiratoires." },

  { id: "7", date: "2026-03-05", titre: "Sommeil perturbé", type: "sommeil", score: -2, partage: "N",
    detail: "Nuits courtes avec réveils fréquents." },

  { id: "8", date: "2026-02-28", titre: "Maux de tête", type: "maladie", score: -1, partage: "N",
    detail: "Douleur légère mais récurrente en fin de journée." },

  { id: "9", date: "2026-02-20", titre: "Marche courte", type: "activite", score: 1, partage: "N",
    detail: "Marche de 20 minutes pour maintenir une activité légère." },

  { id: "10", date: "2026-02-15", titre: "Journée stressante", type: "humeur", score: -2, partage: "N",
    detail: "Stress au travail impactant le sommeil et l'énergie." },

  { id: "11", date: "2026-02-10", titre: "Repos partiel", type: "sommeil", score: 1, partage: "N",
    detail: "Repos intermédiaire mais sommeil non réparateur." },

  { id: "12", date: "2026-01-30", titre: "Consultation médicale", type: "evenement", score: 1, partage: "N",
    detail: "Contrôle médical rassurant sur la santé générale." },

  { id: "13", date: "2026-01-25", titre: "Petite baisse de poids", type: "poids", score: 1, partage: "N",
    detail: "Variation légère du poids, pas d'inquiétude." },

  { id: "14", date: "2026-01-20", titre: "Fatigue persistante", type: "humeur", score: -2, partage: "N",
    detail: "Sentiment de fatigue continue, rythme à réguler." },

  { id: "15", date: "2026-01-15", titre: "Sortie conviviale", type: "evenement", score: 2, partage: "N",
    detail: "Moment agréable avec amis pour relâcher le stress." },

  { id: "16", date: "2026-01-10", titre: "Séance de sport légère", type: "activite", score: 2, partage: "N",
    detail: "Maintien de l'activité physique malgré la fatigue." },

  { id: "17", date: "2025-12-28", titre: "Sommeil réparateur", type: "sommeil", score: 3, partage: "N",
    detail: "Nuit complète et récupératrice." },

  { id: "18", date: "2025-12-20", titre: "Humeur positive", type: "humeur", score: 2, partage: "N",
    detail: "Journée motivante avec bonne énergie." },
  ]);
  
  const [editingId, setEditingId] = useState(null); // ← Événement actuellement éditable

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleToggle = async (id, newValue) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, partage: newValue ? "O" : "N" } : e
      )
    );

    try {
      await setPartage(parseInt(id), newValue);
    } catch (err) {
      console.error("Erreur API :", err);
    }
  };

  const handleDetailChange = (id, newDetail) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, detail: newDetail } : e
      )
    );
  };

  return (
    <div
      style={{
        padding: 16,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 600 }}>
        <button className="back-btn" onClick={() => navigate("/")}>
          ←
        </button>

        <h2 style={{ color: "#4f7df3" }}>Mon historique</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sortedEvents.map((event) => {
            const isEditing = editingId === event.id;
            return (
              <div
                key={event.id}
                className="card"
                style={{
                  border: "2px solid #4f7df3",
                  padding: 12,
                  borderRadius: 10,
                }}
              >
                <div style={{ fontSize: 12, color: "#666" }}>
                  {new Date(event.date).toLocaleDateString("fr-FR")}
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    color: "#4f7df3",
                    fontSize: 16,
                    marginTop: 4,
                  }}
                >
                  {event.titre}
                </div>

                {/* Détail modifiable selon le mode */}
                {isEditing ? (
                  <textarea
                    value={event.detail}
                    onChange={(e) => handleDetailChange(event.id, e.target.value)}
                    style={{
                      marginTop: 6,
                      fontSize: 14,
                      width: "100%",
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      padding: 6,
                      resize: "vertical",
                    }}
                  />
                ) : (
                  <div style={{ marginTop: 6, fontSize: 14 }}>{event.detail}</div>
                )}

                {/* Boutons */}
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  <button
                    onClick={() =>
                      setEditingId(isEditing ? null : event.id)
                    }
                    style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      border: "1px solid #4f7df3",
                      background: "#4f7df3",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {isEditing ? "Valider" : "Modifier"}
                  </button>

                  <span style={{ marginLeft: 12, fontWeight: 500 }}>
                    Partager :
                  </span>

                  <button
                    onClick={() => handleToggle(event.id, true)}
                    style={{
                      marginRight: 6,
                      padding: "4px 10px",
                      borderRadius: 20,
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "bold",
                      background: event.partage === "O" ? "#28a745" : "#e6f4ea",
                      color: event.partage === "O" ? "white" : "#28a745",
                      border: "1px solid #28a745",
                      transition: "0.2s",
                    }}
                  >
                    ✔ Oui
                  </button>

                  <button
                    onClick={() => handleToggle(event.id, false)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 20,
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "bold",
                      background: event.partage === "N" ? "#dc3545" : "#fdeaea",
                      color: event.partage === "N" ? "white" : "#dc3545",
                      border: "1px solid #dc3545",
                      transition: "0.2s",
                    }}
                  >
                    ✖ Non
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav role="patient" />
    </div>
  );
}