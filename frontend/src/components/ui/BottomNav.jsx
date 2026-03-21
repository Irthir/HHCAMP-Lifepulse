import { useNavigate } from "react-router-dom";

export default function BottomNav({ active }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div className="bottom-nav">
      <button
        className={active === "home" ? "active" : ""}
        onClick={() => navigate(`/${role}`)}
      >
        Accueil
      </button>

      <button>Communautés</button>
      <button>Parcours</button>
      <button>Profil</button>
    </div>
  );
}