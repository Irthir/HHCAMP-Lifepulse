import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TimelinePage() {
  const navigate = useNavigate();

  const [activeId, setActiveId] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const today = new Date();
  const minDate = new Date();
  minDate.setMonth(today.getMonth() - 6);
  today.setDate(today.getDate() + 7);

  // 🧠 catégories
  const categories = [
    { key: "sommeil", label: "Sommeil", icon: "😴" },
    { key: "humeur", label: "Humeur", icon: "😊" },
    { key: "activite", label: "Activité", icon: "🏃" },
    { key: "maladie", label: "Maladie", icon: "🤒" },
    { key: "evenement", label: "Vie", icon: "📅" },
    { key: "poids", label: "Poids", icon: "⚖️" },
  ];

  const colors = {
    sommeil: "#6f42c1",
    humeur: "#ffc107",
    activite: "#28a745",
    maladie: "#dc3545",
    evenement: "#17a2b8",
    poids: "#343a40",
  };

  // 📊 ~30 événements
  const events = [
    { id: "1", date: "2026-03-20", titre: "Bonne nuit", type: "sommeil", score: 3, partage: "O" },
    { id: "2", date: "2026-03-18", titre: "Course", type: "activite", score: 4, partage: "O" },
    { id: "3", date: "2026-03-15", titre: "Bonne humeur", type: "humeur", score: 3, partage: "O" },
    { id: "4", date: "2026-03-10", titre: "Consultation", type: "evenement", score: 2, partage: "O" },
    { id: "5", date: "2026-03-05", titre: "Poids stable", type: "poids", score: 1, partage: "O" },

    { id: "6", date: "2026-02-25", titre: "Fatigue", type: "humeur", score: -2, partage: "O" },
    { id: "7", date: "2026-02-20", titre: "Rhume", type: "maladie", score: -3, partage: "O" },
    { id: "8", date: "2026-02-15", titre: "Marche", type: "activite", score: 2, partage: "O" },
    { id: "9", date: "2026-02-10", titre: "Mauvaise nuit", type: "sommeil", score: -2, partage: "O" },
    { id: "10", date: "2026-02-05", titre: "Sortie amis", type: "evenement", score: 3, partage: "O" },

    { id: "11", date: "2026-01-28", titre: "Poids en baisse", type: "poids", score: 2, partage: "O" },
    { id: "12", date: "2026-01-25", titre: "Stress", type: "humeur", score: -2, partage: "O" },
    { id: "13", date: "2026-01-20", titre: "Grippe", type: "maladie", score: -4, partage: "O" },
    { id: "14", date: "2026-01-15", titre: "Repos", type: "sommeil", score: 1, partage: "O" },
    { id: "15", date: "2026-01-10", titre: "Sport", type: "activite", score: 3, partage: "O" },

    { id: "16", date: "2025-12-28", titre: "Fête famille", type: "evenement", score: 4, partage: "O" },
    { id: "17", date: "2025-12-20", titre: "Motivation", type: "humeur", score: 3, partage: "O" },
    { id: "18", date: "2025-12-15", titre: "Poids +", type: "poids", score: -1, partage: "O" },
    { id: "19", date: "2025-12-10", titre: "Insomnie", type: "sommeil", score: -3, partage: "O" },
    { id: "20", date: "2025-12-05", titre: "Jogging", type: "activite", score: 2, partage: "O" },

    { id: "21", date: "2025-11-28", titre: "Fatigue", type: "humeur", score: -1, partage: "O" },
    { id: "22", date: "2025-11-25", titre: "Mal de tête", type: "maladie", score: -2, partage: "O" },
    { id: "23", date: "2025-11-20", titre: "Sortie", type: "evenement", score: 2, partage: "O" },
    { id: "24", date: "2025-11-15", titre: "Bonne nuit", type: "sommeil", score: 3, partage: "O" },
    { id: "25", date: "2025-11-10", titre: "Sport", type: "activite", score: 2, partage: "O" },

    { id: "26", date: "2025-10-28", titre: "Poids stable", type: "poids", score: 1, partage: "O" },
    { id: "27", date: "2025-10-20", titre: "Bonne humeur", type: "humeur", score: 3, partage: "O" },
    { id: "28", date: "2025-10-15", titre: "Rhume", type: "maladie", score: -2, partage: "O" },
    { id: "29", date: "2025-10-10", titre: "Marche", type: "activite", score: 2, partage: "O" },
    { id: "30", date: "2025-10-05", titre: "Sommeil OK", type: "sommeil", score: 2, partage: "O" },
  ];

  const filtered = events
    .filter(e => e.partage === "O")
    .filter(e => new Date(e.date) >= minDate)
    .filter(e => !activeType || e.type === activeType)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const minScore = -6;
  const maxScore = 6;
  const totalTime = today - minDate;

  const getX = (date) =>
    ((new Date(date) - minDate) / totalTime) * 100;

  const getY = (score) =>
    ((score - minScore) / (maxScore - minScore)) * 100;

  return (
    <div style={{ padding: 16, height: "100vh", display: "flex", flexDirection: "column" }}>
      <button onClick={() => navigate("/")}>←</button>

      <h2 style={{ textAlign: "center" }}>Évolution sur 6 mois</h2>

      {/* 🧭 filtres */}
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        marginBottom: 10,
        flexWrap: "wrap",
        gap: 8
      }}>
        {categories.map(cat => {
          const isActive = activeType === cat.key;

          return (
            <div
              key={cat.key}
              onClick={() => setActiveType(isActive ? null : cat.key)}
              style={{
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: 8,
                background: isActive ? "#007bff" : "#eee",
                color: isActive ? "white" : "black",
                display: "flex",
                gap: 4
              }}
            >
              {cat.icon} {cat.label}
            </div>
          );
        })}
      </div>

      {/* 📊 graphe */}
      <div style={{
        flex: 1,
        position: "relative",
        margin: 20,
        borderRadius: 12,
        overflow: "hidden",
        background: "linear-gradient(to top, #f8d7da, #fff3cd, #d4edda)",
      }}>

        {/* lignes */}
        {[4,3,2,1,0,-1,-2,-3,-4].map((s) => (
          <div key={s} style={{
            position: "absolute",
            bottom: `${getY(s)}%`,
            width: "100%",
            borderTop: "1px dashed rgba(0,0,0,0.2)"
          }} />
        ))}

        {/* ligne */}
        <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
          <polyline
            fill="none"
            stroke="#007bff"
            strokeWidth="2"
            points={filtered.map(e =>
              `${getX(e.date)}%,${100 - getY(e.score)}%`
            ).join(" ")}
          />
        </svg>

        {/* points */}
        {filtered.map((event) => {
          const x = getX(event.date);
          const y = getY(event.score);
          const isActive = activeId === event.id;

          return (
            <div
              key={event.id}
              onClick={() => setActiveId(isActive ? null : event.id)}
              style={{
                position: "absolute",
                left: `${x}%`,
                bottom: `${y}%`,
                transform: "translate(-50%, 50%)",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div style={{
                fontSize: 18
              }}>
                {categories.find(c => c.key === event.type)?.icon}
              </div>

              <div style={{
                marginTop: 4,
                background: "white",
                padding: "4px 6px",
                borderRadius: 6,
                fontSize: 11,
              }}>
                {event.titre}
              </div>

              <div style={{
                fontSize: 10,
                color: "#666"
              }}>
                {new Date(event.date).toLocaleDateString()}
              </div>

              {isActive && (
                <div style={{
                  marginTop: 4,
                  background: "#333",
                  color: "white",
                  padding: 6,
                  borderRadius: 6,
                  fontSize: 10,
                }}>
                  Détail de l'événement
                </div>
              )}
            </div>
          );
        })}

        {/* dates */}
        <div style={{
          position: "absolute",
          bottom: -20,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
        }}>
          <span>{minDate.toLocaleDateString()}</span>
          <span>{today.toLocaleDateString()}</span>
        </div>
      </div>

      <BottomNav role="pro" />
    </div>
  );
}