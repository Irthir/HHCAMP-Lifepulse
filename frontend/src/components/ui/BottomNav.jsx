export default function BottomNav({ active }) {
  return (
    <div className="bottom-nav">
      <button className={active === "home" ? "active" : ""}>Accueil</button>
      <button className={active === "community" ? "active" : ""}>Communautés</button>
      <button className={active === "care" ? "active" : ""}>Parcours</button>
      <button className={active === "health" ? "active" : ""}>Carnet</button>
    </div>
  );
}