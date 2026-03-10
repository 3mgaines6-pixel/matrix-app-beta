/* =========================================
   SUMMARY SCREEN (DOM VERSION)
========================================= */

import { machines } from "../data/machines.js";

export default function Summary() {
  const container = document.createElement("div");
  container.className = "summary-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Workout Summary";
  container.appendChild(header);

  /* SUMMARY LIST */
  const list = document.createElement("div");
  list.className = "summary-list";
  container.appendChild(list);

  // Loop through all machines and show last logged set
  Object.keys(MACHINES).forEach((machineName) => {
    const m = MACHINES[machineName];

    const row = document.createElement("div");
    row.className = "summary-row";

    const name = document.createElement("div");
    name.className = "summary-name";
    name.textContent = machineName;

    const stats = document.createElement("div");
    stats.className = "summary-stats";

    if (m.lastWeight && m.lastReps) {
      stats.textContent = `${m.lastWeight} lbs × ${m.lastReps} reps`;
    } else {
      stats.textContent = "No data";
    }

    row.appendChild(name);
    row.appendChild(stats);
    list.appendChild(row);
  });

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(backBtn);

  return container;
}
