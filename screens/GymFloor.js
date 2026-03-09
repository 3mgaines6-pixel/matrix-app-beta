/* ==========================================================
   GYM FLOOR — MAIN HUB (STRENGTH • CARDIO • NUTRITION)
========================================================== */

export default function GymFloor() {
  const container = document.createElement("div");
  container.className = "screen strength-bg";

  /* -------------------------------
     HEADER
  --------------------------------*/
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Gym Floor";
  container.appendChild(header);

  /* -------------------------------
     MAIN NAV BUTTONS
  --------------------------------*/
  function makeButton(label, screen) {
    const btn = document.createElement("div");
    btn.className = "button";
    btn.textContent = label;
    btn.onclick = () => window.renderScreen(screen);
    return btn;
  }

  container.appendChild(makeButton("🏋️ Strength Studio", "StrengthStudio"));
  container.appendChild(makeButton("🏃 Cardio Studio", "CardioStudio"));
  container.appendChild(makeButton("🥗 Nutrition Guide", "NutritionGuide"));
  container.appendChild(makeButton("📅 Weekly Overview", "WeeklyOverview"));
  container.appendChild(makeButton("📈 Strength History", "StrengthHistory"));

  return container;
}
