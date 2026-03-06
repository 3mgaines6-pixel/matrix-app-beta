/* =========================================
   WEEKLY OVERVIEW (DOM VERSION)
========================================= */

import { MACHINES } from "../data/machines.js";

export default function WeeklyOverview() {
  const container = document.createElement("div");
  container.className = "weekly-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Weekly Overview";
  container.appendChild(header);

  /* LOAD FULL HISTORY */
  const history = JSON.parse(localStorage.getItem("history") || "{}");

  /* GET CURRENT WEEK RANGE */
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7)); // shift so Monday is start

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  /* SUMMARY CALCULATIONS */
  let totalSets = 0;
  let totalVolume = 0;

  const machineBreakdown = {};

  Object.keys(history).forEach((id) => {
    const sets = history[id];

    sets.forEach((s) => {
      const d = new Date(s.date);

      if (d >= monday && d <= sunday) {
        totalSets++;
        totalVolume += s.weight * s.reps;

        if (!machineBreakdown[id]) {
          machineBreakdown[id] = 0;
        }
        machineBreakdown[id]++;
      }
    });
  });

  /* SUMMARY CARD */
  const summary = document.createElement("div");
  summary.className = "weekly-summary";
  summary.innerHTML = `
    <div><strong>Week of:</strong> ${monday.toLocaleDateString()} – ${sunday.toLocaleDateString()}</div>
    <div style="margin-top: 8px;">${totalSets} total sets</div>
    <div>${totalVolume} lbs total volume</div>
  `;
  container.appendChild(summary);

  /* MACHINE BREAKDOWN LIST */
  const list = document.createElement("div");
  list.className = "scroll-list";
  container.appendChild(list);

  const machineIDs = Object.keys(machineBreakdown);

  if (machineIDs.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card-base";
    empty.style.textAlign = "center";
    empty.textContent = "No strength workouts logged this week";
    list.appendChild(empty);
  } else {
    machineIDs.forEach((id) => {
      const card = document.createElement("div");
      card.className = "card-base";

      const machine = MACHINES[id];

      card.innerHTML = `
        <div class="weekly-title">${id} — ${machine.name}</div>
        <div class="weekly-sub">${machineBreakdown[id]} sets this week</div>
      `;

      list.appendChild(card);
    });
  }

  /* RETURN BUTTON */
  const backBtn = document.createElement("button");
  backBtn.className = "return-btn";
  backBtn.textContent = "Return to Summary";
  backBtn.onclick = () => window.renderScreen("Summary");
  container.appendChild(backBtn);

  return container;
}
