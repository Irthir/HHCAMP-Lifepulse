export default function HealthCard({ label, value }) {
  return (
    <div className="card" style={{ border: "2px solid #4f7df3" }}>
      <div style={{ color: "#4f7df3", fontWeight: 600 }}>
        {label}
      </div>

      <div style={{ marginTop: 6 }}>
        {value}
      </div>
    </div>
  );
}