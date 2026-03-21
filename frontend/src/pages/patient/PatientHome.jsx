import BottomNav from "../../components/BottomNav";

export default function PatientHome() {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: "#3f6ad8" }}>My Healin</h2>

      <div className="card blue">
        <p>Comment vas-tu ?</p>
      </div>

      <BottomNav role="patient" />
    </div>
  );
}