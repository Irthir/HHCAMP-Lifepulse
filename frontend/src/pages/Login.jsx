import { useNavigate } from "react-router-dom";

export default function Login({ setRole }) {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("role", role);
    setRole(role);

    if (role === "patient") navigate("/patient");
    if (role === "aidant") navigate("/aidant");
    if (role === "pro") navigate("/pro");
  };

  return (
    <div className="login-container">
      <h1>My Healin</h1>
      <p>Choisissez votre profil</p>

      <div className="login-buttons">
        <button onClick={() => selectRole("patient")}>Patient</button>
        <button onClick={() => selectRole("aidant")}>Aidant</button>
        <button onClick={() => selectRole("pro")}>Professionnel</button>
      </div>
    </div>
  );
}