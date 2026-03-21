import Card from "../components/ui/Card";
import BottomNav from "../components/ui/BottomNav";
import Avatar from "../components/ui/Avatar";
import Badge from "../components/ui/Badge";

export default function Patient() {
  return (
    <div>
      <div className="header">
        <h2>My Healin</h2>
        <div className="avatar">A</div>
      </div>
      
      <div style={{ padding: 20, display: "flex", justifyContent: "space-between" }}>
        <h2>Mon suivi</h2>
        <Avatar name="Alex" />
      </div>

      <div style={{ padding: 20 }}>
        <Badge>Patient</Badge>

        <Card title="Programme en cours">
          <p>Diabète</p>
        </Card>

        <Card title="Prochain rendez-vous">
          <p>Aucun rendez-vous</p>
        </Card>
      </div>

      <BottomNav active="home" />
    </div>
  );
}