/* =========================================
   STRENGTH STUDIO (DOM VERSION)
========================================= */
import { MACHINES } from "../data/machines.js";

export default function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-studio";

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Strength Studio";
  container.appendChild(header);

  // Machine list container
  const list = document.createElement("div");
  list.className = "machine-list";
  container.appendChild(list);

  console.log("MACHINES:", MACHINES);
  console.log("Keys:", Object.keys(MACHINES));

  // Load machines from MACHINES object
  Object.keys(MACHINES).forEach((machineID) => {
    const meta = MACHINES[machineID];
    if (!meta) return;

    const btn = document.createElement("div");
    btn.className = "machine-button";

    // ⭐ FIXED: Show ID — Name
    btn.textContent = `${machineID} — ${meta.name}`;

    btn.onclick = () => {
      window.renderScreen("Machine", { name: machineID });
    };

    list.appendChild(btn);
  });

  // Return button
  const backBtn = document.createElement("button");
  backBtn.className = "return-btn";
  backBtn.textContent = "Return to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(backBtn);

  return container;
}
