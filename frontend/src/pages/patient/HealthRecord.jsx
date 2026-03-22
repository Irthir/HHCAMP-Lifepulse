import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { setPartage } from "../../services/api";
import { useState } from "react";

export default function HealthRecord() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    { id: "1", date: "2026-03-20", titre: "Bonne nuit", type: "sommeil", score: 3, partage: "N",
      detail: "Nuit complète de 8h avec un sommeil réparateur." },

    { id: "2", date: "2026-03-18", titre: "Course", type: "activite", score: 4, partage: "N",
      detail: "Course de 5 km avec de très bonnes sensations." },

    { id: "3", date: "2026-03-15", titre: "Bonne humeur", type: "humeur", score: 3, partage: "N",
      detail: "Journée positive avec une humeur stable et motivée." },

    { id: "4", date: "2026-03-10", titre: "Consultation", type: "evenement", score: 1, partage: "N",
      detail: "Consultation de routine globalement rassurante." },

    { id: "5", date: "2026-03-05", titre: "Poids stable", type: "poids", score: 1, partage: "N",
      detail: "Poids stable sans variation particulière cette semaine." },

    { id: "6", date: "2026-02-25", titre: "Fatigue", type: "humeur", score: -2, partage: "N",
      detail: "Sensation de fatigue persistante toute la journée." },

    { id: "7", date: "2026-02-20", titre: "Rhume", type: "maladie", score: -3, partage: "N",
      detail: "Rhume avec toux et congestion nasale." },

    { id: "8", date: "2026-02-15", titre: "Marche", type: "activite", score: 2, partage: "N",
      detail: "Marche de 30 minutes en extérieur, agréable." },

    { id: "9", date: "2026-02-10", titre: "Mauvaise nuit", type: "sommeil", score: -3, partage: "N",
      detail: "Nuit agitée avec plusieurs réveils." },

    { id: "10", date: "2026-02-05", titre: "Sortie amis", type: "evenement", score: 3, partage: "N",
      detail: "Soirée conviviale et détendue avec des amis." },

    { id: "11", date: "2026-01-28", titre: "Poids en baisse", type: "poids", score: 2, partage: "N",
      detail: "Légère baisse de poids encourageante." },

    { id: "12", date: "2026-01-25", titre: "Stress", type: "humeur", score: -3, partage: "N",
      detail: "Journée stressante avec difficulté à se concentrer." },

    { id: "13", date: "2026-01-20", titre: "Grippe", type: "maladie", score: -4, partage: "N",
      detail: "Grippe avec forte fatigue et fièvre." },

    { id: "14", date: "2026-01-15", titre: "Repos", type: "sommeil", score: 1, partage: "N",
      detail: "Temps de repos utile mais sommeil léger." },

    { id: "15", date: "2026-01-10", titre: "Sport", type: "activite", score: 3, partage: "N",
      detail: "Séance de sport dynamique avec bonne énergie." },

    { id: "16", date: "2025-12-28", titre: "Fête famille", type: "evenement", score: 4, partage: "N",
      detail: "Moment chaleureux et joyeux en famille." },

    { id: "17", date: "2025-12-20", titre: "Motivation", type: "humeur", score: 3, partage: "N",
      detail: "Bonne motivation et envie d’avancer sur les projets." },

    { id: "18", date: "2025-12-15", titre: "Poids +", type: "poids", score: -2, partage: "N",
      detail: "Prise de poids ressentie comme frustrante." },

    { id: "19", date: "2025-12-10", titre: "Insomnie", type: "sommeil", score: -4, partage: "N",
      detail: "Difficulté à s’endormir avec très peu de sommeil." },

    { id: "20", date: "2025-12-05", titre: "Jogging", type: "activite", score: 2, partage: "N",
      detail: "Petit jogging malgré un manque d’énergie." },

    { id: "21", date: "2025-11-28", titre: "Fatigue", type: "humeur", score: -1, partage: "N",
      detail: "Légère fatigue mais journée gérable." },

    { id: "22", date: "2025-11-25", titre: "Mal de tête", type: "maladie", score: -2, partage: "N",
      detail: "Maux de tête persistants une partie de la journée." },

    { id: "23", date: "2025-11-20", titre: "Sortie", type: "evenement", score: 1, partage: "N",
      detail: "Sortie agréable mais un peu fatigante." },

    { id: "24", date: "2025-11-15", titre: "Bonne nuit", type: "sommeil", score: 3, partage: "N",
      detail: "Sommeil profond avec réveil en forme." },

    { id: "25", date: "2025-11-10", titre: "Sport", type: "activite", score: -1, partage: "N",
      detail: "Séance difficile avec peu de motivation." },

    { id: "26", date: "2025-10-28", titre: "Poids stable", type: "poids", score: 1, partage: "N",
      detail: "Poids globalement stable sur la période." },

    { id: "27", date: "2025-10-20", titre: "Bonne humeur", type: "humeur", score: 3, partage: "N",
      detail: "Humeur positive et détendue toute la journée." },

    { id: "28", date: "2025-10-15", titre: "Rhume", type: "maladie", score: -2, partage: "N",
      detail: "Rhume léger avec gêne respiratoire." },

    { id: "29", date: "2025-10-10", titre: "Marche", type: "activite", score: 2, partage: "N",
      detail: "Balade agréable en plein air." },

    { id: "30", date: "2025-10-05", titre: "Sommeil OK", type: "sommeil", score: -1, partage: "N",
      detail: "Sommeil correct mais peu récupérateur." },
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