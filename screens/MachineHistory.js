/* =========================================
   MACHINE HISTORY (DOM VERSION)
========================================= */

import { MACHINES } from "../data/machines.js";

export default function MachineHistory(data) {
  const machineID = data?.id;
  const machine = MACHINES[machineID];

  const container = document.createElement("div");
  container.className = "history-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = `${machineID} — ${machine.name}`;
  container.appendChild(header);

  /* LOAD HISTORY */
  const history = JSON.parse(localStorage.getItem("history") || "{}");
  const sets = history[machineID] || [];

  /* EMPTY STATE */
  if (sets.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card-base";
    empty.style.textAlign = "center";
    empty.style.fontSize = "18px";
    empty.textContent = "No sets logged yet";
    container.appendChild(empty);
  }

  /* LIST OF SETS */
  const list = document.createElement("div");
  list.className = "scroll-list";
  container.appendChild(list);

  sets
    .slice()            // copy
    .reverse()          // newest first
    .forEach((set) => {
      const card = document.createElement("div");
      card.className = "card-base";

      const date = new Date(set.date);
      const formatted = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      card.innerHTML = `
        <div style="font-size: 20px; font-weight: 700;">
          ${set.weight} lbs × ${set.reps} reps
        </div>
        <div style="font-size: 15px; opacity: 0.7; margin-top: 4px;">
          ${formatted}
        </div>
      `;

      list.appendChild(card);
    });

  /* RETURN BUTTON */
  const backBtn = document.createElement("button");
  backBtn.className = "return-btn";
  backBtn.textContent = "Return to Strength History";
  backBtn.onclick = () => window.renderScreen("StrengthHistory");
  container.appendChild(backBtn);

  return container;
}
