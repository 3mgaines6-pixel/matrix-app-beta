import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

function getTodayName() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date().getDay()];
}

function getWeekType() {
  const weekNumber = Math.ceil(new Date().getDate() / 7);
  return weekNumber === 3 || weekNumber === 4 ? "swap" : "primary";
}

function findMachineByNumber(num) {
  return Object.values(MACHINES).find(m => m.number === num);
}

function applySwap(machine) {
  switch (machine.number) {
    case 12: return MACHINES.PLC;
    case 7:  return MACHINES.CHEST_L;
    case 15: return MACHINES.PRESS_L;
    default: return machine;
  }
}

// ------------------------------------------------------------
// MAIN SCREEN
// ------------------------------------------------------------

export default function StrengthStudio() {
  const root = document.createElement("div");
  root.className = "strength-screen";

  const today = getTodayName();
  const weekType = getWeekType();
  const machineNumbers = WEEKLY[today] || [];

  const machines = machineNumbers
    .map(num => {
      let machine = findMachineByNumber(num);
      if (!machine) return null;
      if (weekType === "swap") machine = applySwap(machine);
      return machine;
    })
    .filter(Boolean);

  // Back button
  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  root.appendChild(backBtn);

  // Title
  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Strength Studio";
  root.appendChild(title);

  // Machine list
  const list = document.createElement("div");
  list.className = "machine-list";

  machines.forEach(m => {
    const card = document.createElement("div");
    card.className = "machine-card";

    card.onclick = () => window.renderScreen("Machine", m);

    const name = document.createElement("div");
    name.className = "machine-name";
    name.textContent = `${m.number} • ${m.emoji} ${m.name}`;

    const muscle = document.createElement("div");
    muscle.className = "machine-muscle";
    muscle.textContent = m.muscle;

    const baseline = document.createElement("div");
    baseline.className = "machine-baseline";
    baseline.textContent =
      m.baseline !== null ? `Baseline: ${m.baseline} lbs` : "Baseline: —";

    card.appendChild(name);
    card.appendChild(muscle);
    card.appendChild(baseline);
    list.appendChild(card);
  });

  root.appendChild(list);

  return root;
}
