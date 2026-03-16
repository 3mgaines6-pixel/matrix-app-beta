export default function GymFloor() {
  const root = document.createElement("div");
  root.className = "gymfloor-screen";

  const title = document.createElement("h1");
  title.className = "screen-title";
  title.textContent = "Gym Floor";
  root.appendChild(title);

  const buttons = [
    { label: "🏆 Strength Studio", screen: "StrengthStudio" },
    { label: "🏃‍♂️ Cardio Studio", screen: "CardioStudio" },
    { label: "🥗 Nutrition Guide", screen: "NutritionGuide" },
    { label: "📅 Weekly Overview", screen: "WeeklyOverview" },
    { label: "📈 Strength History", screen: "StrengthHistory" }
  ];

  buttons.forEach(b => {
    const btn = document.createElement("div");
    btn.className = "ds1-button";   // ← THIS FIXES EVERYTHING
    btn.textContent = b.label;
    btn.onclick = () => window.renderScreen(b.screen);
    root.appendChild(btn);
  });

  return root;
}
