import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";

export default function AidantHome() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 16 }}>
      <button className="back-btn" onClick={() => navigate("/")}>←</button>
      <h2 style={{ color: "#2fbf71" }}>Aidant</h2>

      <div className="card green">
        Suivi proche
      </div>

      <BottomNav role="aidant" />
    </div>
  );
}