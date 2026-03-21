import ProgramCard from "../../components/ProgramCard";
import Timeline from "../../components/Timeline";
import BottomNav from "../../components/BottomNav";

export default function CarePath() {
  return (
    <div style={{ padding: 16 }}>

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