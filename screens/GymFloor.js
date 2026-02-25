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
    { label: "Strength Floor", screen: "StrengthFloor" },   // ⭐ UPDATED
    { label: "Stretch Studio", screen: "StretchStudio" }
  ];

  const zoneHeader = document.createElement("h2");
  zoneHeader.textContent = "Training Zones";
  container.appendChild(zoneHeader);

  const zoneButtons = document.createElement("div");
  zoneButtons.className = "gymfloor-buttons";

  zones.forEach(z => {
    const btn = document.createElement("button");
    btn.className = "gymfloor-btn";
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

  const weeklyBtn = document.createElement("button");
  weeklyBtn.className = "gymfloor-btn analytics-btn";
  weeklyBtn.textContent = "Weekly Overview";
  weeklyBtn.onclick = () => window.renderScreen("WeeklyOverview");
  analyticsButtons.appendChild(weeklyBtn);

  const nutritionBtn = document.createElement("button");
  nutritionBtn.className = "gymfloor-btn analytics-btn";
  nutritionBtn.textContent = "Nutrition Guide";
  nutritionBtn.onclick = () => window.renderScreen("NutritionGuide");
  analyticsButtons.appendChild(nutritionBtn);

/* ----- Strength History ----- */
const strengthHistoryBtn = document.createElement("button");
strengthHistoryBtn.className = "gymfloor-btn analytics-btn";
strengthHistoryBtn.textContent = "Strength History";
strengthHistoryBtn.onclick = () => window.renderScreen("StrengthHistory");
analyticsButtons.appendChild(strengthHistoryBtn);

   
  container.appendChild(analyticsButtons);

  return container;
}
