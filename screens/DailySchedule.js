import { M } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

// Helpers
function getTodayKey() {
  const keys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return keys[new Date().getDay()];
}

function getTodayName() {
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return names[new Date().getDay()];
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
    case 12: return M.PLC;       // Seated Leg Curl → PLC
    case 7:  return M.CHEST_L;   // Chest Press → Light Chest
    case 15: return M.PRESS_L;   // Leg Press → Light Leg Press
    default: return machine;
  }
}

// MAIN SCREEN
export default function DailySchedule() {
  const root = document.createElement("div");
  root.className = "daily-screen";

  const todayKey = getTodayKey();     // "mon"
  const todayName = getTodayName();   // "Monday"
  const weekType = getWeekType();     // "primary" or "swap"

  const dayConfig = WEEKLY[todayKey];
  const machineNumbers = dayConfig?.machines || [];

  // ------------------------------------------------------------
  // BACK BUTTON
  // ------------------------------------------------------------
  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "⬅ Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  root.appendChild(backBtn);

  // ------------------------------------------------------------
  // TITLE
  // ------------------------------------------------------------
  const title = document.createElement("h1");
  title.className = "daily-title";
  title.textContent = "Today's Workout";
  root.appendChild(title);

  const subtitle = document.createElement("h2");
  subtitle.className = "daily-subtitle";
  subtitle.textContent = `${todayName} — ${weekType === "swap" ? "Swap Week" : "Primary Week"}`;
  root.appendChild(subtitle);

  // ------------------------------------------------------------
  // MACHINE LIST
  // ------------------------------------------------------------
  const list = document.createElement("div");
  list.className = "machine-list";

  machineNumbers.forEach((num, index) => {
    let machine = findMachineByNumber(num);
    if (!machine) return;

    if (weekType === "swap") {
      machine = applySwap(machine);
    }

    const card = document.createElement("div");
    card.className = "machine-card";

    const order = document.createElement("div");
    order.className = "machine-order";
    order.textContent = `${index + 1}.`;

    const name = document.createElement("div");
    name.className = "machine-name";
    name.textContent = `${machine.emoji} ${machine.name}`;

    const muscle = document.createElement("div");
    muscle.className = "machine-muscle";
    muscle.textContent = machine.muscle;

    const baseline = document.createElement("div");
    baseline.className = "machine-baseline";
    baseline.textContent =
      machine.baseline !== null ? `Baseline: ${machine.baseline} lbs` : "Baseline: —";

    const cue = document.createElement("div");
    cue.className = "machine-cue";

    // Rep targets based on type
    const repTargets = {
      Heavy: "6–8 reps",
      Light: "10–12 reps",
      Core: "12–15 reps"
    };

    cue.textContent = `${machine.type} • ${repTargets[machine.type] || repTargets.Core}`;

    card.appendChild(order);
    card.appendChild(name);
    card.appendChild(muscle);
    card.appendChild(baseline);
    card.appendChild(cue);

    list.appendChild(card);
  });

  root.appendChild(list);
  return root;
}
