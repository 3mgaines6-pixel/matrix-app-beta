/* =========================================
   ==========  GYM FLOOR SCREEN  ===========
   ========================================= */

export function GymFloor() {
  const container = document.createElement("div");
  container.className = "gymfloor-screen";

  const title = document.createElement("h1");
  title.className = "gymfloor-title";
  title.textContent = "Gym Floor";
  container.appendChild(title);

  /* ============================
     TRAINING ZONES
  ============================ */
  const zones = [
  { label: "Cardio Studio", screen: "CardioStudio" },
  { label: "Strength Floor", screen: "StrengthFloor" },
  { label: "Stretch Studio", screen: "StretchStudio" }
];


  const zoneHeader = document.createElement("h2");
  zoneHeader.textContent = "Training Zones";
  container.appendChild(zoneHeader);

  const zoneButtons = document.createElement("div");
  zoneButtons.className = "gymfloor-buttons"; // restores grouped styling
  zones.forEach(z => {
    const btn = document.createElement("button");
    btn.className = "gymfloor-btn"; // use your original button class
    btn.textContent = z.label;
    btn.onclick = () => window.renderScreen(z.screen);
    zoneButtons.appendChild(btn);
  });
  container.appendChild(zoneButtons);

 /* ============================
   ANALYTICS SECTION
============================ */
const analyticsHeader = document.createElement("h2");
analyticsHeader.textContent = "Training Analytics";
analyticsHeader.className = "analytics-header";
container.appendChild(analyticsHeader);

const analyticsButtons = document.createElement("div");
analyticsButtons.className = "analytics-buttons";

/* ----- Weekly Overview ----- */
const weeklyBtn = document.createElement("button");
weeklyBtn.className = "gymfloor-btn analytics-btn";
weeklyBtn.textContent = "Weekly Overview";
weeklyBtn.onclick = () => window.renderScreen("WeeklyOverview");
analyticsButtons.appendChild(weeklyBtn);

/* ----- Nutrition Guide ----- */
const nutritionBtn = document.createElement("button");
nutritionBtn.className = "gymfloor-btn analytics-btn";
nutritionBtn.textContent = "Nutrition Guide";
nutritionBtn.onclick = () => window.renderScreen("NutritionGuide");
analyticsButtons.appendChild(nutritionBtn);

container.appendChild(analyticsButtons);


  return container;
}
