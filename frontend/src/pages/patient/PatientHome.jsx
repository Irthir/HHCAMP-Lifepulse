import BottomNav from "../../components/BottomNav";
import Chat from "../../components/Chat";

export default function PatientHome() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h2 style={{ color: "#3f6ad8", padding: "16px 16px 0 16px" }}>My Healin</h2>

      <div style={{ flex: 1, padding: 16, overflow: "hidden" }}>
        <Chat />
      </div>

      <BottomNav role="patient" />
    </div>
  );
}