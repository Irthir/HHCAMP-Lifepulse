export default function CommunityCard({ color, title, subtitle, description, count }) {
  return (
    <div className="card" style={{ border: `2px solid ${color}` }}>
      
      <div
        className="card-header"
        style={{ background: `${color}20`, color }}
      >
        <div className="avatar">{title[0]}</div>

        <div>
          <div style={{ fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 12, color: "#777" }}>
            {subtitle}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.5 }}>
        {description}
      </div>

      <div style={{ textAlign: "right", marginTop: 10, color: "#777" }}>
        💬 {count}
      </div>
    </div>
  );
}