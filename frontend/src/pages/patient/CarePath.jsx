import ProgramCard from "../../components/ProgramCard";
import Timeline from "../../components/Timeline";
import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";

export default function CarePath() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 16 }}>
      <button className="back-btn" onClick={() => navigate("/")}>←</button>

      <h2>Parcours de soins</h2>

      <ProgramCard
        color="#f5a623"
        title="Programme actif"
        subtitle="Suivi en cours"
        progress={40}
      />

      <ProgramCard
        color="#4f7df3"
        title="Programme secondaire"
        subtitle="Suivi complémentaire"
        progress={60}
      />

      <Timeline />
      <BottomNav role="patient" />

    </div>
  );
}