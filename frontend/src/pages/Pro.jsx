import Card from "../components/ui/Card";
import BottomNav from "../components/ui/BottomNav";
import Avatar from "../components/ui/Avatar";
import Badge from "../components/ui/Badge";

export default function Pro() {
  return (
    <div>
      <div className="header">
        <h2>My Healin</h2>
        <div className="avatar">A</div>
      </div>
      
      <div style={{ padding: 20, display: "flex", justifyContent: "space-between" }}>
        <h2>Tableau de bord</h2>
        <Avatar name="Dr" />
      </div>

      <div style={{ padding: 20 }}>
        <Badge>Professionnel</Badge>

        <Card title="Patients">
          <p>12 patients suivis</p>
        </Card>

        <Card title="Alertes critiques">
          <p>2 alertes</p>
        </Card>
      </div>

      <BottomNav active="home" />
    </div>
  );
}