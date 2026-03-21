import BottomNav from "../../components/BottomNav";

export default function ProPatients() {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: "#f4a300" }}>Patients</h2>

      <div className="card yellow">
        Aucun patient
      </div>

      <BottomNav role="pro" />
    </div>
  );
}