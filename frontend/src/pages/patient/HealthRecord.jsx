import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { setPartage } from "../../services/api";
import { useState } from "react";

export default function HealthRecord() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    {
      id: "00001",
      date: "2026-03-21",
      titre: "Consultation",
      complement: "Je suis allé voir mon diététicien.",
      partage: "O",
    },
    {
      id: "00002",
      date: "2026-03-18",
      titre: "Sport",
      complement: "Séance de running",
      partage: "N",
    },
  ]);

  // 🔽 tri décroissant
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // 🔁 toggle partage
  const handleToggle = async (id, newValue) => {
    try {
      await setPartage(parseInt(id), newValue);

      setEvents((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, partage: newValue ? "O" : "N" } : e
        )
      );
    } catch (err) {
      console.error("Erreur API :", err);
    }
  };

  return (
      <div
        style={{
          padding: 16,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 600, // 👈 largeur max (important)
          }}
        >
      <button className="back-btn" onClick={() => navigate("/")}>
        ←
      </button>

      <h2 style={{ color: "#4f7df3" }}>Mon historique</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sortedEvents.map((event) => (
          <div
            key={event.id}
            className="card"
            style={{
              border: "2px solid #4f7df3",
              padding: 12,
              borderRadius: 10,
            }}
          >
            {/* Date */}
            <div style={{ fontSize: 12, color: "#666" }}>
              {new Date(event.date).toLocaleDateString("fr-FR")}
            </div>

            {/* Titre */}
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

            {/* Complément */}
            <div style={{ marginTop: 6, fontSize: 14 }}>
              {event.complement}
            </div>

            {/* Boutons partage */}
            <div style={{ marginTop: 10 }}>
              <span style={{ marginRight: 8, fontWeight: 500 }}>
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
        ))}
      </div>
    </div>

      <BottomNav role="patient" />
    </div>
  );
}