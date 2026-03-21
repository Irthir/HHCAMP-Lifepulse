export default function ProgramCard({ color, title, subtitle, progress }) {
  return (
    <div className="card" style={{ border: `2px solid ${color}` }}>
      
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold"
          }}
        >
          +
        </div>

        <div>
          <div style={{ fontWeight: 600, color }}>{title}</div>
          <div style={{ fontSize: 13, color: "#777" }}>{subtitle}</div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="progress">
          <div
            className="progress-inner"
            style={{
              width: `${progress}%`,
              background: color
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: 8, fontSize: 13, color: "#777" }}>
        Durée 6 mois
      </div>
    </div>
  );
}