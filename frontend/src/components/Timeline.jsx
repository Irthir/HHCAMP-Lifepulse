export default function Timeline() {
  return (
    <div style={{ marginTop: 20 }}>
      
      <div style={{ display: "flex", gap: 12 }}>
        {/* Date */}
        <div style={{
          minWidth: 60,
          textAlign: "center",
          border: "2px solid #35b67a",
          borderRadius: 12,
          padding: 8
        }}>
          <div style={{ fontWeight: 600 }}>14</div>
          <div style={{ fontSize: 12 }}>Sep</div>
        </div>

        {/* Event */}
        <div className="card" style={{ border: "2px solid #35b67a", flex: 1 }}>
          <div style={{ fontWeight: 600, color: "#35b67a" }}>
            Consultation initiale
          </div>
          <div style={{ fontSize: 13, color: "#777" }}>
            Définition du programme
          </div>
        </div>
      </div>

    </div>
  );
}