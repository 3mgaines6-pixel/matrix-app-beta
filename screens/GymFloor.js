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
    { label: "Strength Studio", screen: "StrengthStudio" },
    { label: "Stretch Studio", screen: "StretchStudio" }
  ];

  const zoneHeader = document.createElement("h2");
  zoneHeader.textContent = "Training Zones";
  container.appendChild(zoneHeader);

  zones.forEach(z => {
    const btn = document.createElement("button");
    btn.className = "gym-btn";
    btn.textContent = z.label;
    btn.onclick = () => window.renderScreen(z.screen);
    container.appendChild(btn);
  });

  /* ============================
     ANALYTICS SECTION
  ============================ */
  const analyticsHeader = document.createElement("h2");
  analyticsHeader.textContent = "Training Analytics";
  analyticsHeader.className = "analytics-header";
  container.appendChild(analyticsHeader);

  const summaryBtn = document.createElement("button");
  summaryBtn.className = "gym-btn analytics-btn";
  summaryBtn.textContent = "Workout Summary";
  summaryBtn.onclick = () => window.renderScreen("Summary");
  container.appendChild(summaryBtn);

  return container;
}

    
