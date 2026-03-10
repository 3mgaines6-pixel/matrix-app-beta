import { M } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

function getWeekType() {
  const weekNumber = Math.ceil(new Date().getDate() / 7);
  return weekNumber === 3 || weekNumber === 4 ? "swap" : "primary";
}

function findMachineByNumber(num) {
  return Object.values(M).find(m => m.number === num);
}

function applySwap(machine) {
  switch (machine.number) {
    case 12: return M.PLC;
    case 7:  return M.CHEST_L;
    case 15: return M.PRESS_L;
    default: return machine;
  }
}

// ------------------------------------------------------------
// MAIN SCREEN (DEFAULT EXPORT)
// ------------------------------------------------------------

export default function WeeklyOverview() {
  const root = document.createElement("div");
  root.className = "weekly-screen";

  const weekType = getWeekType();

  const title = document.createElement("h1");
  title.className = "weekly-title";
  title.textContent = "Weekly Overview";
  root.appendChild(title);

  // Loop through all days in WEEKLY.js
  Object.entries(WEEKLY).forEach(([day, machineNumbers]) => {
    const dayCard = document.createElement("div");
    dayCard.className = "weekly-day-card";

    const dayName = document.createElement("h2");
    dayName.className = "day-name";
    dayName.textContent = day;
    dayCard.appendChild(dayName);

    const list = document.createElement("ul");
    list.className = "machine-list";

    machineNumbers.forEach(num => {
      let machine = findMachineByNumber(num);
      if (!machine) return;

      if (weekType === "swap") machine = applySwap(machine);

      const item = document.createElement("li");
      item.className = "machine-item";

      const name = document.createElement("span");
      name.className = "machine-name";
      name.textContent = machine.name;

      const muscle = document.createElement("span");
      muscle.className = "machine-muscle";
      muscle.textContent = machine.muscle;

      item.appendChild(name);
      item.appendChild(muscle);
      list.appendChild(item);
    });

    dayCard.appendChild(list);
    root.appendChild(dayCard);
  });

  return root;
}
