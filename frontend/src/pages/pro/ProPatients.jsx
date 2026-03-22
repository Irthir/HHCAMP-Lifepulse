import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TimelinePage() {
  const navigate = useNavigate();

  const [activeId, setActiveId] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const today = new Date();
  const minDate = new Date();
  minDate.setMonth(today.getMonth() - 4);
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
  // 🔹 Événements clés
  { id: "1", date: "2026-03-20", titre: "Arrêt d'activité", type: "activite", score: -3, partage: "O",
    detail: "Cessation temporaire des activités sportives pour cause de fatigue." },

  { id: "2", date: "2026-03-10", titre: "Retour à la salle de sport", type: "activite", score: 3, partage: "O",
    detail: "Reprise progressive des séances de sport en salle." },

  { id: "3", date: "2026-02-25", titre: "Changement de travail", type: "evenement", score: -2, partage: "O",
    detail: "Nouveau poste avec horaires et responsabilités différentes." },

  { id: "4", date: "2026-02-24", titre: "Horaires irrégulières", type: "humeur", score: -4, partage: "O",
    detail: "Difficultés à maintenir un rythme stable à cause du travail." },

  { id: "5", date: "2026-02-12", titre: "Fatigue accumulée", type: "humeur", score: -3, partage: "O",
    detail: "Sensation de fatigue générale sur plusieurs semaines." },

  // 🔹 Événements secondaires / médicaux
  { id: "6", date: "2026-03-18", titre: "Petite grippe", type: "maladie", score: -2, partage: "O",
    detail: "Fatigue et légers symptômes respiratoires." },

  { id: "7", date: "2026-03-05", titre: "Sommeil perturbé", type: "sommeil", score: -2, partage: "O",
    detail: "Nuits courtes avec réveils fréquents." },

  { id: "8", date: "2026-02-28", titre: "Maux de tête", type: "maladie", score: -1, partage: "O",
    detail: "Douleur légère mais récurrente en fin de journée." },

  { id: "9", date: "2026-02-20", titre: "Marche courte", type: "activite", score: 1, partage: "O",
    detail: "Marche de 20 minutes pour maintenir une activité légère." },

  { id: "10", date: "2026-02-15", titre: "Journée stressante", type: "humeur", score: -2, partage: "O",
    detail: "Stress au travail impactant le sommeil et l'énergie." },

  { id: "11", date: "2026-02-10", titre: "Repos partiel", type: "sommeil", score: 1, partage: "O",
    detail: "Repos intermédiaire mais sommeil non réparateur." },

  { id: "12", date: "2026-01-30", titre: "Consultation médicale", type: "evenement", score: 2, partage: "O",
    detail: "Contrôle médical rassurant sur la santé générale." },

  { id: "13", date: "2026-01-25", titre: "Petite baisse de poids", type: "poids", score: 1, partage: "O",
    detail: "Variation légère du poids, pas d'inquiétude." },

  { id: "14", date: "2026-01-20", titre: "Fatigue persistante", type: "humeur", score: -2, partage: "O",
    detail: "Sentiment de fatigue continue, rythme à réguler." },

  { id: "15", date: "2026-01-15", titre: "Sortie conviviale", type: "evenement", score: 3, partage: "O",
    detail: "Moment agréable avec amis pour relâcher le stress." },

  { id: "16", date: "2026-01-10", titre: "Séance de sport légère", type: "activite", score: 2, partage: "O",
    detail: "Maintien de l'activité physique malgré la fatigue." },

  { id: "17", date: "2025-12-28", titre: "Sommeil réparateur", type: "sommeil", score: 3, partage: "O",
    detail: "Nuit complète et récupératrice." },

  { id: "18", date: "2025-12-20", titre: "Humeur positive", type: "humeur", score: 2, partage: "O",
    detail: "Journée motivante avec bonne énergie." },
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
    <div style={{ padding: 16, height: "90vh", display: "flex", flexDirection: "column" }}>
      
      <button className="back-btn" onClick={() => navigate("/")}>←</button>

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
                fontSize: 14,
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
                {event.detail || "Détail de l'événement..."}
              </div>
            )}
            </div>
          );
        })}

        {(() => { today.setDate(today.getDate() - 7); return null; })()}
        <div style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
        }}>
          <span>{minDate.toLocaleDateString()}</span>
          <span>{today.toLocaleDateString()}</span>
        </div>
      </div>

      <BottomNav role="pro" />
    </div>
  );
}