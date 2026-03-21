import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";

export default function ProPatients() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 16 }}>
      <button className="back-btn" onClick={() => navigate("/")}>←</button>
      <h2 style={{ color: "#f4a300" }}>Patients</h2>

      <div className="card yellow">
        Aucun patient
      </div>

      <BottomNav role="pro" />
    </div>
  );
}