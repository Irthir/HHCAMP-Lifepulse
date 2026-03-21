import CommunityCard from "../../components/CommunityCard";
import BottomNav from "../../components/BottomNav";

export default function Communities() {
  return (
    <div style={{ padding: 16 }}>

      <h2 style={{ color: "#4f7df3" }}>Communautés</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        <CommunityCard
          color="#4f7df3"
          title="Tension sous contrôle"
          subtitle="System Healin, il y a 5 mois"
          description={`Suivi tensionnel\n• Alimentation pauvre en sel\n• Exercices recommandés`}
          count={1}
        />

        <CommunityCard
          color="#4f7df3"
          title="Suivi familial"
          subtitle="System Healin, il y a 5 mois"
          description={`Suivi médical partagé`}
          count={0}
        />

      </div>
      <BottomNav role="patient" />
    </div>
  );
}