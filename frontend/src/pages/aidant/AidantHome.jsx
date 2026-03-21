import BottomNav from "../../components/BottomNav";

export default function AidantHome() {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: "#2fbf71" }}>Aidant</h2>

      <div className="card green">
        Suivi proche
      </div>

      <BottomNav role="aidant" />
    </div>
  );
}