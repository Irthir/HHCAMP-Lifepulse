import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Patient from "./pages/Patient";
import Aidant from "./pages/Aidant";
import Pro from "./pages/Pro";

function setTheme(role) {
  document.body.className = "";

  if (role === "patient") document.body.classList.add("theme-patient");
  if (role === "aidant") document.body.classList.add("theme-aidant");
  if (role === "pro") document.body.classList.add("theme-pro");
}

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    if (role) setTheme(role);
  }, [role]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setRole={setRole} />} />

        <Route
          path="/patient"
          element={role === "patient" ? <Patient /> : <Navigate to="/" />}
        />
        <Route
          path="/aidant"
          element={role === "aidant" ? <Aidant /> : <Navigate to="/" />}
        />
        <Route
          path="/pro"
          element={role === "pro" ? <Pro /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}