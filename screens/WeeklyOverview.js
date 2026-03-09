/* ==========================================================
   WEEKLY OVERVIEW — CLEAN BLUE CARDS + WEEK/BLOCK LOGIC
========================================================== */

import { MACHINES } from "../data/machines.js";
import { WEEKLY_SCHEDULE } from "../data/weekly.js";

export default function WeeklyOverview() {
  const container = document.createElement("div");
  container.className = "screen strength-bg";

  /* -------------------------------
     HEADER
  --------------------------------*/
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Weekly Overview";
  container.appendChild(header);

  /* -------------------------------
     WEEK + BLOCK BADGE
  --------------------------------*/
  const week = parseInt(localStorage.getItem("week") || "1");
  const block = week <= 2 ? "PRIMARY" : "SWAP";

  const badge = document.createElement("div");
  badge.className = "badge";
  badge.textContent = `Week ${week} of 4 • ${block}`;
  container.appendChild(badge);

  /* -------------------------------
     WEEKLY SCHEDULE CARDS
  --------------------------------*/
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  days.forEach((day) => {
    const list = WEEKLY_SCHEDULE[day] || [];

    const card = document.createElement("div");
    card.className = "card-base";

    let html = `<div class="weekly-title">${day}</div>`;

    if (list.length === 0) {
      html += `<div class="weekly-sub">Rest Day</div>`;
    } else {
      list.forEach((id) => {
        const m = MACHINES[id];
        if (!m) return;

        html += `
          <div class="weekly-sub">${m.emoji} ${m.name}</div>
        `;
      });
    }

    card.innerHTML = html;
    container.appendChild(card);
  });

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
