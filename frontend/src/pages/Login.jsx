import { useNavigate } from "react-router-dom";
import lifepulse from "../assets/lifepulse.png";

export default function Login() {
  const nav = useNavigate();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      
      <img
        src={lifepulse}
        alt="LifePulse"
        style={{ width: "40vh", maxWidth: "40%", marginBottom: 20 }}
      />

      <h2>Combattre la maladie ensemble</h2>

      <div className="card" style={{ width: 320, marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        
        {/* PATIENT */}
        <button
          className="role-btn blue"
          onClick={() => nav("/patient/home")}
        >
          Patient
        </button>

        {/* PRO */}
        <button
          className="role-btn yellow"
          onClick={() => nav("/pro/patients")}
        >
          Professionnel de santé
        </button>

        {/* AIDANT 
        <button
          className="role-btn green"
          onClick={() => nav("/aidant/home")}
        >
          Aidant
        </button>*/}
      </div>
    </div>
  );
}