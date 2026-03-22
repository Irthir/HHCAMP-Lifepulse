import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProPatients() {
  const navigate = useNavigate();

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Limite -6 mois
  const minDate = new Date();
  minDate.setMonth(today.getMonth() - 6);

  const maxDate = today;

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);

    if (newDate >= minDate && newDate <= maxDate) {
      setCurrentDate(newDate);
    }
  };

  // ---------------- EVENTS ----------------
  const events = [
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
      partage: "O",
    },
    {
      id: "00003",
      date: "2026-03-10",
      titre: "Repas",
      complement: "Déjeuner équilibré",
      partage: "N",
    },
  ];

  const filteredEvents = events.filter(e => e.partage === "O");

  const eventsByDate = {};
  filteredEvents.forEach(event => {
    if (!eventsByDate[event.date]) {
      eventsByDate[event.date] = [];
    }
    eventsByDate[event.date].push(event);
  });

  // ---------------- CALENDAR ----------------
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    let startDay = firstDay.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const monthLabel = currentDate.toLocaleString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        padding: 16,
        height: "94vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <button className="back-btn" onClick={() => navigate("/")}>←</button>

      <h1 style={{
        color: "#f4a300",
        fontSize: "clamp(20px, 3vw, 36px)",
        marginBottom: 10
      }}>
        Planning mensuel
      </h1>

      {/* NAV */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
      }}>
        <button onClick={() => changeMonth(-1)}>←</button>
        <strong style={{ fontSize: "clamp(16px, 2vw, 28px)" }}>
          {monthLabel}
        </strong>
        <button onClick={() => changeMonth(1)}>→</button>
      </div>

      {/* CALENDAR */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateRows: "auto 1fr",
        overflow: "hidden"
      }}>
        
        {/* Jours semaine */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "clamp(12px, 1.5vw, 18px)"
        }}>
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>

        {/* Grille jours */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridAutoRows: "1fr",
          gap: 6,
          height: "100%",
        }}>
          {days.map((day, i) => {
            if (!day) return <div key={i}></div>;

            const dateStr = day.toLocaleDateString("sv-SE");
            const dayEvents = eventsByDate[dateStr] || [];
            const isToday = day.toDateString() === today.toDateString();

            return (
              <div
                key={i}
                style={{
                  borderRadius: 10,
                  padding: 6,
                  background: isToday ? "#ffe08a" : "#fff3cd",
                  border: isToday ? "2px solid #f4a300" : "1px solid #ddd",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  fontWeight: "bold",
                  fontSize: "clamp(12px, 1.5vw, 18px)",
                  marginBottom: 4
                }}>
                  {day.getDate()}
                </div>

                <div style={{
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2
                }}>
                  {dayEvents.slice(0, 3).map((event, idx) => (
                    <div
                      key={idx}
                      title={event.complement}
                      style={{
                        background: "#f4a300",
                        color: "white",
                        borderRadius: 4,
                        padding: "2px 4px",
                        fontSize: "clamp(8px, 1vw, 12px)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {event.titre}
                    </div>
                  ))}

                  {dayEvents.length > 3 && (
                    <div style={{
                      fontSize: "10px",
                      color: "#555"
                    }}>
                      +{dayEvents.length - 3}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav role="pro" />
    </div>
  );
}