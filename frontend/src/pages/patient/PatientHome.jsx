import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import Chat from "../../components/Chat";

export default function PatientHome() {
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <button className="back-btn" onClick={() => navigate("/")}>←</button>
      <h2 style={{ color: "#3f6ad8", padding: "16px 16px 0 16px" }}>My Healin</h2>

      <div style={{ flex: 1, padding: 16, overflow: "hidden" }}>
        <Chat />
      </div>

      <BottomNav role="patient" />
    </div>
  );
}