import { useEffect } from "react";

function setTheme(role) {
  document.body.className = "";

  if (role === "patient") document.body.classList.add("theme-patient");
  if (role === "aidant") document.body.classList.add("theme-aidant");
  if (role === "pro") document.body.classList.add("theme-pro");
}

export default function App() {
  useEffect(() => {
    const role = localStorage.getItem("role") || "patient";
    setTheme(role);
  }, []);

  return (
    <>
      {/* ton routing */}
    </>
  );
}