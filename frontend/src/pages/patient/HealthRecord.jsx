import HealthCard from "../../components/HealthCard";
import BottomNav from "../../components/BottomNav";

export default function HealthRecord() {
  return (
    <div style={{ padding: 16 }}>

      <h2 style={{ color: "#4f7df3" }}>Carnet de santé</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

        <HealthCard label="Mood" value="Stable" />
        <HealthCard label="Poids" value="-- kg" />
        <HealthCard label="Taille" value="-- cm" />
        <HealthCard label="Groupe sanguin" value="--" />

      </div>
      <BottomNav role="patient" />
    </div>
  );
}