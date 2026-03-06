/* =========================================
   GYM FLOOR (DOM VERSION)
========================================= */

export default function GymFloor() {
  const container = document.createElement("div");
  container.className = "gym-floor";

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Welcome to Matt's Gym Floor";
  container.appendChild(header);

  function makeButton(label, screenName) {
    const btn = document.createElement("div");
    btn.className = "gym-button";
    btn.textContent = label;
    btn.onclick = () => window.renderScreen(screenName);
    return btn;
  }

  container.appendChild(makeButton("Strength Studio", "StrengthStudio"));
  container.appendChild(makeButton("Cardio Studio", "CardioStudio"));
  container.appendChild(makeButton("Stretch Studio", "StretchStudio"));
  container.appendChild(makeButton("Nutrition Guide", "NutritionGuide"));

  return container;
}
