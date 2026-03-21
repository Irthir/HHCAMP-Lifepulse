import { NavLink } from "react-router-dom";

export default function BottomNav({ role }) {
  const links = {
    patient: [
      { to: "/patient/home", label: "My Healin", icon: "💬" },
      { to: "/patient/communities", label: "Communautés", icon: "💬" },
      { to: "/patient/care", label: "Parcours de soins", icon: "🩺" },
      { to: "/patient/health", label: "Carnet de santé", icon: "📋" },
    ],
    pro: [
      { to: "/pro/communities", label: "Communautés", icon: "💬" },
      { to: "/pro/patients", label: "Patients", icon: "👤" },
    ],
    aidant: [
      { to: "/aidant/home", label: "Suivi", icon: "💚" },
      { to: "/aidant/communities", label: "Patient", icon: "👤" },
    ],
  };

  return (
    <nav className="bottom-nav">
      {links[role]?.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            "nav-item " + (isActive ? "active" : "")
          }
        >
          <span className="icon">{link.icon}</span>
          <span className="label">{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}