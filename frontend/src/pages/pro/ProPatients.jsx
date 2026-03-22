import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TimelinePage() {
  const navigate = useNavigate();
  
  // ajoute en haut du composant
  const [activeId, setActiveId] = useState(null);

  const today = new Date();
  const minDate = new Date();
  minDate.setMonth(today.getMonth() - 6);
  today.setDate(today.getDate() + 7);

  const events = [
    { id: "1", date: "2026-03-21", titre: "Consultation", complement: "J'écris ma vie.", score: 4, partage: "O" },
    { id: "2", date: "2026-03-18", titre: "Sport", complement: "J'écris ma vie.", score: 3, partage: "O" },
    { id: "3", date: "2026-02-10", titre: "Fatigue", complement: "J'écris ma vie.", score: -1, partage: "O" },
    { id: "4", date: "2026-01-15", titre: "Maladie", complement: "J'écris ma vie.", score: -4, partage: "O" },
    { id: "5", date: "2025-12-20", titre: "Progrès", complement: "J'écris ma vie.", score: 2, partage: "O" },
  ];

  const filtered = events
    .filter(e => e.partage === "O")
    .filter(e => new Date(e.date) >= minDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const minScore = -6;
  const maxScore = 6;
  const totalTime = today - minDate;

  const getX = (date) =>
    ((new Date(date) - minDate) / totalTime) * 100;

  const getY = (score) =>
    ((score - minScore) / (maxScore - minScore)) * 100;

  return (
    <div style={{
      padding: 16,
      height: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <button onClick={() => navigate("/")}>←</button>

      <h2 style={{ textAlign: "center" }}>
        Évolution sur 6 mois
      </h2>

      <div style={{
        flex: 1,
        position: "relative",
        margin: 20,
        borderRadius: 12,
        overflow: "hidden",
        background: "linear-gradient(to top, #f8d7da, #fff3cd, #d4edda)",
      }}>

        {/* Lignes horizontales */}
        {[4,3,2,1,0,-1,-2,-3,-4].map((s) => (
          <div key={s} style={{
            position: "absolute",
            bottom: `${getY(s)}%`,
            width: "100%",
            borderTop: "1px dashed rgba(0,0,0,0.2)",
            fontSize: 12,
            paddingLeft: 4,
          }}>
            {}
          </div>
        ))}

        {/* Ligne SVG */}
        <svg style={{
          position: "absolute",
          width: "100%",
          height: "100%"
        }}>
          <polyline
            fill="none"
            stroke="#007bff"
            strokeWidth="3"
            points={filtered.map(e =>
              `${getX(e.date)}%,${100 - getY(e.score)}%`
            ).join(" ")}
          />
        </svg>

        {/* Points + labels */}
        {filtered.map((event) => {
        const x = getX(event.date);
        const y = getY(event.score);

        const isActive = activeId === event.id;

        return (
          <div
            key={event.id}
            onClick={() =>
              setActiveId(isActive ? null : event.id)
            }
            style={{
              position: "absolute",
              left: `${x}%`,
              bottom: `${y}%`,
              transform: "translate(-50%, 50%)",
              textAlign: "center",
              maxWidth: 120,
              cursor: "pointer",
            }}
          >
            {/* Point */}
            <div style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background:
                event.score > 0 ? "#28a745" :
                event.score < 0 ? "#dc3545" : "#ffc107",
              border: "2px solid white",
              margin: "auto"
            }} />

            {/* Label */}
            <div style={{
              marginTop: 6,
              background: "white",
              padding: "4px 6px",
              borderRadius: 6,
              fontSize: "clamp(10px, 1vw, 12px)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              whiteSpace: "normal",       // ✅ plus de coupure
              wordBreak: "break-word",    // ✅ passe à la ligne
            }}>
              {event.titre}
            </div>

            {/* Date sous le label */}
            <div style={{
              fontSize: 10,
              color: "#666",
              marginTop: 2
            }}>
              {new Date(event.date).toLocaleDateString()}
            </div>

            {/* Complément (hover + click) */}
            <div style={{
              marginTop: 6,
              background: "#333",
              color: "white",
              padding: 6,
              borderRadius: 6,
              fontSize: 10,
              display: isActive ? "block" : "none",
            }}>
              {event.complement}
            </div>
          </div>
        );
      })}

        {/* Dates */}
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