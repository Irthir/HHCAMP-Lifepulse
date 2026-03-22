import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";

export default function HealthTimeline() {
  const navigate = useNavigate();

  const events = [
    {
      id: "00001",
      date: "2026-03-21",
      titre: "Consultation",
      score: 3,
    },
    {
      id: "00002",
      date: "2026-03-18",
      titre: "Sport",
      score: 4,
    },
    {
      id: "00003",
      date: "2026-03-01",
      titre: "Sport raté",
      score: -3,
    },
  ];

  // 🔽 trier par date croissante (important pour la courbe)
  const sorted = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // 📐 dimensions
  const width = 600;
  const height = 300;
  const padding = 40;

  // 📊 bornes
  const minScore = -5;
  const maxScore = 5;

  const minDate = new Date(sorted[0].date);
  const maxDate = new Date(sorted[sorted.length - 1].date);

  // 🧮 fonctions de scale
  const getX = (date) => {
    const t =
      (new Date(date) - minDate) / (maxDate - minDate || 1);
    return padding + t * (width - 2 * padding);
  };

  const getY = (score) => {
    const t = (score - minScore) / (maxScore - minScore);
    return height - padding - t * (height - 2 * padding);
  };

  // 🟦 ligne
  const path = sorted
    .map((e, i) => {
      const x = getX(e.date);
      const y = getY(e.score);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => navigate("/")}>←</button>

      <h2 style={{ color: "#4f7df3" }}>Frise d'évolution</h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", maxWidth: 700 }}
        >
          {/* Axe horizontal */}
          <line
            x1={padding}
            y1={height / 2}
            x2={width - padding}
            y2={height / 2}
            stroke="#ccc"
          />

          {/* Ligne */}
          <path
            d={path}
            fill="none"
            stroke="#4f7df3"
            strokeWidth="2"
          />

          {/* Points */}
          {sorted.map((e, i) => {
            const x = getX(e.date);
            const y = getY(e.score);

            const color =
              e.score > 0
                ? "#28a745"
                : e.score < 0
                ? "#dc3545"
                : "#999";

            return (
              <g key={i}>
                <circle cx={x} cy={y} r={6} fill={color} />

                {/* Label */}
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  fontSize="10"
                >
                  {e.titre}
                </text>

                {/* Date */}
                <text
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="10"
                >
                  {new Date(e.date).toLocaleDateString("fr-FR")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <BottomNav role="patient" />
    </div>
  );
}