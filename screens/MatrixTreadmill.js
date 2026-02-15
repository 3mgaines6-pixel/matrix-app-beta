/* =========================================
   ==========  MATRIX TREADMILL  ===========
   ========================================= */

import { saveCardio } from "../data/cardio.js";

export function MatrixTreadmill() {
  const container = document.createElement("div");
  container.className = "cardio-machine-screen";

  /* ---------- TITLE ---------- */
  const title = document.createElement("h1");
  title.textContent = "Matrix Treadmill";
  container.appendChild(title);

  /* ---------- INPUTS ---------- */
  const timeInput = document.createElement("input");
  timeInput.type = "number";
  timeInput.placeholder = "Minutes";
  timeInput.className = "cardio-input";

  const distanceInput = document.createElement("input");
  distanceInput.type = "number";
  distanceInput.placeholder = "Miles";
  distanceInput.className = "cardio-input";

  const inclineInput = document.createElement("input");
  inclineInput.type = "number";
  inclineInput.placeholder = "Incline %";
  inclineInput.className = "cardio-input";

  container.appendChild(timeInput);
  container.appendChild(distanceInput);
  container.appendChild(inclineInput);

  /* ---------- SAVE BUTTON ---------- */
  const saveBtn = document.createElement("button");
  saveBtn.className = "cardio-save-btn";
  saveBtn.textContent = "Log Cardio";

  saveBtn.onclick = () => {
    const minutes = Number(timeInput.value || 0);
    const miles = Number(distanceInput.value || 0);
    const incline = Number(inclineInput.value || 0);

    saveCardio("matrix-treadmill", { minutes, miles, incline });

    window.renderScreen("CardioStudio");
  };

  container.appendChild(saveBtn);

  /* ---------- BACK BUTTON ---------- */
  const backBtn = document.createElement("button");
  backBtn.className = "cardio-back-btn";
  backBtn.textContent = "Back";
  backBtn.onclick = () => window.renderScreen("CardioStudio");
  container.appendChild(backBtn);

  return container;
}
