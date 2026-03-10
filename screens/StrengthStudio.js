import { M } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

// Get today's weekday key ("Mon", "Tue", etc.)
function getTodayName() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date().getDay()];
}

// Determine if this is a primary or swap week
function getWeekType() {
  const weekNumber = Math.ceil(new Date().getDate() / 7);
  return weekNumber === 3 || weekNumber === 4 ? "swap" : "primary";
}

// Find machine object by its real Matrix number
function findMachineByNumber(num) {
  return Object.values(M).find(m => m.number === num);
}

// Apply swap logic for Weeks 3–4
function applySwap(machine) {
  switch (machine.number) {
    case 12: return M.PLC;      // Seated Leg Curl → Prone Leg Curl
    case 7:  return M.CHEST_L;  // Heavy Chest → Light Chest
    case 15: return M.PRESS_L;  // Heavy Leg Press → Light Leg Press
    default: return machine;
  }
}

// ------------------------------------------------------------
// MAIN RENDER FUNCTION
// ------------------------------------------------------------

export default function StrengthStudio(root) {
  root.innerHTML = ""; // clear screen

  const today = getTodayName();
  const weekType = getWeekType();

  // Machine numbers for today from WEEKLY.js
  const machineNumbers = WEEKLY[today] || [];

  // Convert numbers → machine objects (with swap logic)
  const machines = machineNumbers.map(num => {
    let machine = findMachineByNumber(num);
    if (!machine) return null;
    if (weekType === "swap") machine = applySwap(machine);
    return machine;
  }).filter(Boolean);

  // ------------------------------------------------------------
  // Screen container
  // ------------------------------------------------------------
  const screen = document.createElement("div");
  screen.className = "strength-screen";

  // ------------------------------------------------------------
  // Back button
  // ------------------------------------------------------------
  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "⬅ Back";
  backBtn.onclick = () => window.renderHome();
  screen.appendChild(backBtn);

  // ------------------------------------------------------------
  // Title
  // ------------------------------------------------------------
  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Strength Studio";
  screen.appendChild(title);

  // ------------------------------------------------------------
  // Machine list container
  // ------------------------------------------------------------
  const list = document.createElement("div");
  list.className = "machine-list";

  machines.forEach(m => {
    const card = document.createElement("div");
    card.className = "machine-card";

    const name = document.createElement("div");
    name.className = "machine-name";
    name.textContent = m.name;

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

  screen.appendChild(list);

  // ------------------------------------------------------------
  // Render to root
  // ------------------------------------------------------------
  root.appendChild(screen);
}
