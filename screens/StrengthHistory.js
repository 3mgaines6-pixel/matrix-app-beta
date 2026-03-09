/* ================================================
   STRENGTH HISTORY — CLEAN CARDS + EMOJI + DATES
================================================ */

import { MACHINES } from "../data/machines.js";

export default function StrengthHistory() {
  const container = document.createElement("div");
  container.className = "screen strength-bg";

  /* -------------------------------
     HEADER
  --------------------------------*/
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Strength History";
  container.appendChild(header);

  /* -------------------------------
     LOAD HISTORY
  --------------------------------*/
  const history = JSON.parse(localStorage.getItem("history") || "{}");
  const machineIDs = Object.keys(history);

  if (machineIDs.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card-base";
    empty.innerHTML = `
      <div class="weekly-title">No strength history yet</div>
      <div class="weekly-sub">Your saved sets will appear here.</div>
    `;
    container.appendChild(empty);
  }

  /* -------------------------------
     HISTORY CARDS
  --------------------------------*/
  machineIDs.forEach((id) => {
    const machine = MACHINES[id];
    const sets = history[id];

    if (!machine || sets.length === 0) return;

    const last = sets[sets.length - 1];
    const date = new Date(last.date).toLocaleDateString();

    const card = document.createElement("div");
    card.className = "card-base";

    card.innerHTML = `
      <div class="weekly-title">${machine.emoji} ${machine.name}</div>
      <div class="weekly-sub">
        Last: ${last.weight} lbs × ${last.reps} reps — ${date}
      </div>
    `;

    card.onclick = () => window.renderScreen("Machine", id);

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
