import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function StrengthStudio() {
  const day = localStorage.getItem("selectedDay") || "mon";

  const root = document.createElement("div");
  root.id = "strength-root";

  const week = parseInt(localStorage.getItem("training_week") || "1");
  const block = week === 1 || week === 3 ? "Heavy" : "Light";
  const isSwap = localStorage.getItem("swap_week") === "true";

  const dayConfig = WEEKLY[day];
  const machineIds = (dayConfig?.machines || []).slice(0, 5);

  function getTodaySets(id) {
    return JSON.parse(localStorage.getItem(`history_${id}_today`) || "[]");
  }

  function isMachineComplete(id) {
    const sets = getTodaySets(id);
    return sets.filter(s => s && s.weight && s.reps).length === 3;
  }

  function allMachinesComplete() {
    return machineIds.every(id => isMachineComplete(id));
  }

  const title = document.createElement("div");
  title.className = "studio-title";
  title.textContent = `${dayConfig?.name} — ${block}${isSwap ? " (Swap)" : ""}`;
  root.appendChild(title);

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
    status.classList.add(isMachineComplete(id) ? "complete" : "incomplete");

    const name = document.createElement("div");
    name.className = "machine-name";
    name.textContent = m.name;

    const type = document.createElement("div");
    type.className = "machine-type";
    type.textContent = m.type || "Core";

    const goBtn = document.createElement("div");
    goBtn.className = "machine-go-btn";
    goBtn.textContent = isMachineComplete(id) ? "Edit" : "Start";

    goBtn.onclick = () => {
      window.renderScreen("Machine", {
        id,
        number: index + 1,
        day
      });
    };

    card.appendChild(status);
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(goBtn);

    list.appendChild(card);
  });

  const banner = document.createElement("div");
  banner.className = "day-complete-banner";
  banner.textContent = allMachinesComplete()
    ? "Day Complete!"
    : "Complete all 5 machines to finish the day.";
  if (allMachinesComplete()) banner.classList.add("visible");
  root.appendChild(banner);

  const completeBtn = document.createElement("div");
  completeBtn.className = "studio-complete-btn";
  completeBtn.textContent = allMachinesComplete()
    ? "Complete Day"
    : "Complete Day (Locked)";

  if (allMachinesComplete()) {
    completeBtn.classList.add("enabled");
    completeBtn.onclick = () => window.renderScreen("Summary");
  } else {
    completeBtn.classList.add("disabled");
  }

  root.appendChild(completeBtn);

  const backBtn = document.createElement("div");
  backBtn.className = "studio-back-btn";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  root.appendChild(backBtn);

  return root;
}
