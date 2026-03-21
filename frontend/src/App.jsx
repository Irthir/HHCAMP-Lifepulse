import { useState } from "react";
import Patient from "./pages/Patient";
import Aidant from "./pages/Aidant";
import Pro from "./pages/Pro";
import "./style.css"; 

function App() {
  const [role, setRole] = useState("patient");

  return (
    <div style={{ padding: 20 }}>
      <h1>Projet Santé</h1>

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="aidant">Aidant</option>
        <option value="pro">Professionnel</option>
      </select>

      <hr />

      {role === "patient" && <Patient />}
      {role === "aidant" && <Aidant />}
      {role === "pro" && <Pro />}
    </div>
  );
}

export default App;