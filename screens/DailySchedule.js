import { M } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

// Helpers
function getTodayName() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date().getDay()];
}

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

// MAIN SCREEN
export default function DailySchedule() {
  const root = document.createElement("div");
  root.className = "daily-screen";

  const today = getTodayName();
  const weekType = getWeekType();
  const machineNumbers = WEEKLY[today] || [];

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "⬅ Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  root.appendChild(backBtn);

  const title = document.createElement("h1");
  title.className = "daily-title";
  title.textContent = "Today's Workout";
  root.appendChild(title);

  const subtitle = document.createElement("h2");
  subtitle.className = "daily-subtitle";
  subtitle.textContent = today;
  root.appendChild(subtitle);

  const list = document.createElement("div");
  list.className = "machine-list";

  machineNumbers.forEach(num => {
    let machine = findMachineByNumber(num);
    if (!machine) return;
    if (weekType === "swap") machine = applySwap(machine);

    const card = document.createElement("div");
    card.className = "machine-card";

    const name = document.createElement("div");
    name.className = "machine-name";
    name.textContent = machine.name;

    const muscle = document.createElement("div");
    muscle.className = "machine-muscle";
    muscle.textContent = machine.muscle;

    const baseline = document.createElement("div");
    baseline.className = "machine-baseline";
    baseline.textContent =
      machine.baseline !== null ? `Baseline: ${machine.baseline} lbs` : "Baseline: —";

    card.appendChild(name);
    card.appendChild(muscle);
    card.appendChild(baseline);
    list.appendChild(card);
  });

  root.appendChild(list);
  return root;
}
