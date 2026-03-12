import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function StrengthStudio() {
  // Read selected day from localStorage
  const day = localStorage.getItem("selectedDay") || "mon";

  // Create root container (router requires this)
  const root = document.createElement("div");
  root.id = "strength-root";

  /* -----------------------------------------
     CONFIG: 5 MACHINES (M5)
  ----------------------------------------- */
  const week = parseInt(localStorage.getItem("training_week") || "1");
  const block = week === 1 || week === 3 ? "Heavy" : "Light";
  const isSwap = localStorage.getItem("swap_week") === "true";

  const dayConfig = WEEKLY[day];
  const machineIds = (dayConfig?.machines || []).slice(0, 5);

  /* -----------------------------------------
     HELPERS
  ----------------------------------------- */
  function getTodaySets(id) {
    const key = `history_${id}_today`;
    return JSON.parse(localStorage.getItem(key) || "[]");
  }

  function isMachineComplete(id) {
    const sets = getTodaySets(id);
    const filled = sets.filter(s => s && s.weight && s.reps);
    return filled.length === 3;
  }

  function allMachinesComplete() {
    return machineIds.every(id => isMachineComplete(id));
  }

  /* -----------------------------------------
     HEADER
  ----------------------------------------- */
  const title = document.createElement("div");
  title.className = "studio-title";
  title.textContent = `${dayConfig?.name || "Strength Day"} — ${block}${isSwap ? " (Swap)" : ""}`;
  root.appendChild(title);

  /* -----------------------------------------
     MACHINE LIST
  ----------------------------------------- */
  const list = document.createElement("div");
  list.className = "machine-list";
  root.appendChild(list);

  machineIds.forEach((id, index) => {
    const m = MACHINES[id];
    if (!m) return;

    const card = document.createElement("div");
    card.className = "machine-card";

    const status = document.createElement("div");
    status.className = "machine-status";

    const complete = isMachineComplete(id);
    status.classList.add(complete ? "complete" : "incomplete");

    const name = document.createElement("div");
    name.className = "machine-name";
    name.textContent = m.name;

    const type = document.createElement("div");
    type.className = "machine-type";
    type.textContent = m.type || "Core";

    const goBtn = document.createElement("div");
    goBtn.className = "machine-go-btn";
    goBtn.textContent = complete ? "Edit" : "Start";

    goBtn.onclick = () => {
      window.location.href = `/strength/${index + 1}`;
    };

    card.appendChild(status);
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(goBtn);

    list.appendChild(card);
  });

  /* -----------------------------------------
     DAY COMPLETE BANNER
  ----------------------------------------- */
  const banner = document.createElement("div");
  banner.className = "day-complete-banner";
  if (allMachinesComplete()) {
    banner.textContent = "Day Complete!";
    banner.classList.add("visible");
  } else {
    banner.textContent = "Complete all 5 machines to finish the day.";
  }
  root.appendChild(banner);

  /* -----------------------------------------
     COMPLETE DAY BUTTON
  ----------------------------------------- */
  const completeBtn = document.createElement("div");
  completeBtn.className = "studio-complete-btn";

  if (allMachinesComplete()) {
    completeBtn.textContent = "Complete Day";
    completeBtn.classList.add("enabled");
    completeBtn.onclick = () => {
      window.location.href = "/strength/complete";
    };
  } else {
    completeBtn.textContent = "Complete Day (Locked)";
    completeBtn.classList.add("disabled");
  }

  root.appendChild(completeBtn);

  /* -----------------------------------------
     BACK BUTTON
  ----------------------------------------- */
  const backBtn = document.createElement("div");
  backBtn.className = "studio-back-btn";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => {
    window.location.href = "/";
  };
  root.appendChild(backBtn);

  return root;
}
