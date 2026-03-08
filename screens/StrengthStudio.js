/* =========================================
   STRENGTH STUDIO — FULL MACHINE LIST
   Blue buttons • ID + Emoji + Name
========================================= */

import { MACHINES } from "../data/machines.js";

export default function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Strength Studio";
  container.appendChild(header);

  /* BUTTON HELPER (BLUE BUTTONS) */
  function makeButton(label, screenName, params = {}) {
    const btn = document.createElement("div");
    btn.className = "button"; // BLUE BUTTON
    btn.textContent = label;
    btn.onclick = () => window.renderScreen(screenName, params);
    return btn;
  }

  /* HISTORY + WEEKLY OVERVIEW */
  container.appendChild(makeButton("📘 Strength History", "StrengthHistory"));
  container.appendChild(makeButton("📅 Weekly Overview", "WeeklyOverview"));

  /* MACHINE LIST (NUMERIC ORDER) */
  const list = document.createElement("div");
  list.className = "scroll-list";
  container.appendChild(list);

  const sortedIDs = Object.keys(MACHINES)
    .map(Number)
    .sort((a, b) => a - b);

  sortedIDs.forEach((id) => {
    const m = MACHINES[id];

    const btn = document.createElement("div");
    btn.className = "button"; // BLUE BUTTON
    btn.textContent = `${id} — ${m.emoji} ${m.name}`;
    btn.onclick = () => window.renderScreen("Machine", { name: id, returnTo: "StrengthStudio" });

    list.appendChild(btn);
  });

  /* BACK BUTTON (WHITE) */
  const back = document.createElement("div");
  back.className = "gym-button"; // WHITE BUTTON
  back.textContent = "← Back to Gym Floor";
  back.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(back);

  return container;
}
