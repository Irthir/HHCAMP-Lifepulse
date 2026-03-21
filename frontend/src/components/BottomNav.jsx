import { useNavigate } from "react-router-dom";

export default function BottomNav({ role }) {
  const nav = useNavigate();

  if (role === "patient") {
    return (
      <div className="bottom">
        <button onClick={() => nav("/patient/home")}>My Healin</button>
        <button onClick={() => nav("/patient/communities")}>Communautés</button>
        <button onClick={() => nav("/patient/care")}>Parcours</button>
        <button onClick={() => nav("/patient/health")}>Carnet</button>
      </div>
    );
  }

  if (role === "pro") {
    return (
      <div className="bottom">
        <button onClick={() => nav("/pro/communities")}>Communautés</button>
        <button onClick={() => nav("/pro/patients")}>Patients</button>
      </div>
    );
  }

  if (role === "aidant") {
    return (
      <div className="bottom">
        <button onClick={() => nav("/aidant/home")}>Accueil</button>
        <button onClick={() => nav("/aidant/communities")}>Communautés</button>
      </div>
    );
  }
}