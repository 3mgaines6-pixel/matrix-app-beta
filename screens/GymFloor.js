export default function GymFloor() {
  const root = document.createElement("div");
  root.className = "gymfloor-bg";

  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Gym Floor";
  root.appendChild(title);

  function makeButton(label, screen) {
    const btn = document.createElement("div");
    btn.className = "gymfloor-button";
    btn.textContent = label;
    btn.onclick = () => window.renderScreen(screen);
    return btn;
  }

  root.appendChild(makeButton("🏋️ Strength Studio", "StrengthStudio"));
  root.appendChild(makeButton("🏃 Cardio Studio", "CardioStudio"));
  root.appendChild(makeButton("🥗 Nutrition Guide", "NutritionGuide"));
  root.appendChild(makeButton("📅 Weekly Overview", "WeeklyOverview"));
  root.appendChild(makeButton("📈 Strength History", "StrengthHistory"));

  return root;
}
