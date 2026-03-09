/* ==========================================================
   NUTRITION GUIDE — AUTO PROTEIN (P3) + H2O CALCULATOR
========================================================== */

import { WEEKLY } from "../data/weekly.js";

export default function NutritionGuide() {
  const container = document.createElement("div");
  container.className = "screen strength-bg";

  /* -------------------------------
     HEADER
  --------------------------------*/
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Nutrition Guide";
  container.appendChild(header);

  /* -------------------------------
     DETERMINE TODAY'S TRAINING LOAD
  --------------------------------*/
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = dayNames[new Date().getDay()];
  const todayList = WEEKLY[today] || [];

  let intensity = "REST";

  if (todayList.length === 0) {
    intensity = "REST";
  } else if (todayList.length >= 4) {
    intensity = "HEAVY";
  } else if (todayList.length >= 2) {
    intensity = "MODERATE";
  } else {
    intensity = "LIGHT";
  }

  /* -------------------------------
     AUTO PROTEIN TARGET (P3)
  --------------------------------*/
  let proteinLow = 120;
  let proteinHigh = 160;
  let label = "";

  if (intensity === "HEAVY") {
    proteinLow = 150;
    proteinHigh = 180;
    label = "Muscle Building";
  } else if (intensity === "MODERATE") {
    proteinLow = 135;
    proteinHigh = 165;
    label = "Hybrid Training";
  } else if (intensity === "LIGHT") {
    proteinLow = 120;
    proteinHigh = 150;
    label = "Maintenance";
  } else {
    proteinLow = 110;
    proteinHigh = 135;
    label = "Lean Recovery";
  }

  const proteinCard = document.createElement("div");
  proteinCard.className = "card-base";
  proteinCard.innerHTML = `
    <div class="weekly-title">Today's Protein Target</div>
    <div class="weekly-sub">${proteinLow}–${proteinHigh}g • ${label}</div>
  `;
  container.appendChild(proteinCard);

  /* -------------------------------
     WHY THIS TARGET?
  --------------------------------*/
  const why = document.createElement("div");
  why.className = "card-base";
  why.innerHTML = `
    <div class="weekly-title">Why this target?</div>
    <div class="weekly-sub">
      Your protein adjusts automatically based on today's training load.
      Heavy days push muscle building. Moderate days support hybrid training.
      Light days maintain recovery. Rest days keep you lean and fueled.
    </div>
  `;
  container.appendChild(why);

  /* -------------------------------
     H2O CALCULATOR
  --------------------------------*/
  const waterCard = document.createElement("div");
  waterCard.className = "card-base";
  waterCard.innerHTML = `
    <div class="weekly-title">Hydration Goal</div>
    <div class="weekly-sub">Enter your bodyweight to calculate water intake.</div>
  `;
  container.appendChild(waterCard);

  const weightInput = document.createElement("input");
  weightInput.className = "input-box";
  weightInput.placeholder = "Bodyweight (lbs)";
  container.appendChild(weightInput);

  const waterResult = document.createElement("div");
  waterResult.className = "weekly-sub";
  waterResult.style.marginTop = "10px";

  const calcWater = document.createElement("div");
  calcWater.className = "button";
  calcWater.textContent = "Calculate Water Intake";

  calcWater.onclick = () => {
    const w = Number(weightInput.value);
    if (!w) return;

    const ounces = Math.round(w * 0.7);
    waterResult.textContent = `Recommended: ${ounces} oz per day`;
  };

  container.appendChild(calcWater);
  container.appendChild(waterResult);

  /* -------------------------------
     COACHING NOTE
  --------------------------------*/
  const coach = document.createElement("div");
  coach.className = "card-base";
  coach.innerHTML = `
    <div class="weekly-title">Coach's Note</div>
    <div class="weekly-sub">
      Stay consistent. Hydrate early. Hit your protein window.
      Your training is only as strong as your recovery.
    </div>
  `;
  container.appendChild(coach);

  /* -------------------------------
     BACK BUTTON
  --------------------------------*/
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(back);

  return container;
}
