import BottomNav from "../../components/BottomNav";
import Chat from "../../components/Chat";

export default function PatientHome() {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: "#3f6ad8" }}>My Healin</h2>

      <Chat />

      <BottomNav role="patient" />
    </div>
  );
}