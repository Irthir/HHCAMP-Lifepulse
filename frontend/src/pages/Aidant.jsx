import Card from "../components/ui/Card";
import BottomNav from "../components/ui/BottomNav";
import Avatar from "../components/ui/Avatar";
import Badge from "../components/ui/Badge";

export default function Aidant() {
  return (
    <div>
      <div style={{ padding: 20, display: "flex", justifyContent: "space-between" }}>
        <h2>Suivi proche</h2>
        <Avatar name="Marie" />
      </div>

      <div style={{ padding: 20 }}>
        <Badge>Aidant</Badge>

        <Card title="Personne suivie">
          <p>Alexandra Rousseau</p>
        </Card>

        <Card title="Alertes">
          <p>Aucune alerte</p>
        </Card>
      </div>

      <BottomNav active="home" />
    </div>
  );
}