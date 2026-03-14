import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";
import { getLastSession } from "../utils/history.js";
import { getSelectedDay, setSelectedDay } from "../utils/utils.js";

export default function StrengthStudio() {
  const root = document.createElement("div");
  root.id = "strength-root";

  /* -----------------------------------------
     HEADER
  ----------------------------------------- */
  const header = document.createElement("div");
  header.className = "strength-header";
  header.innerHTML = `
    <div class="strength-title">Strength Studio</div>
  `;
  root.appendChild(header);

  /* -----------------------------------------
     DAY SELECTOR
  ----------------------------------------- */
  const daySelector = document.createElement("div");
  daySelector.className = "day-selector";

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const selected = getSelectedDay();

  days.forEach(d => {
    const btn = document.createElement("div");
    btn.className = "day-btn";
    if (d === selected) btn.classList.add("active");
    btn.textContent = d;

    btn.onclick = () => {
      setSelectedDay(d);
      window.renderScreen("StrengthStudio");
    };

    daySelector.appendChild(btn);
  });

  root.appendChild(daySelector);

  /* -----------------------------------------
     MACHINE LIST FOR SELECTED DAY
  ----------------------------------------- */
  const machineList = document.createElement("div");
  machineList.className = "machine-list";
  root.appendChild(machineList);

  const today = WEEKLY[selected];

  if (!today || !today.machines) {
    machineList.textContent = "No machines scheduled.";
    return root;
  }

  today.machines.forEach((id, index) => {
    const m = MACHINES[id];
    if (!m) return;

    const row = document.createElement("div");
    row.className = "machine-row";

    const last = getLastSession(m.number, m.type);
    const lastText = last
      ? last.sets.map(s => `${s.reps}@${s.weight}`).join(", ")
      : "—";

    row.innerHTML = `
      <div class="machine-row-title">#${m.number} ${m.name}</div>
      <div class="machine-row-sub">${m.muscle} • ${m.type}</div>
      <div class="machine-row-last">Last: ${lastText}</div>
    `;

    row.onclick = () => {
      window.renderScreen("Machine", {
        id,
        number: index + 1,
        day: selected
      });
    };

    machineList.appendChild(row);
  });

  /* -----------------------------------------
     WEEKLY OVERVIEW BUTTON
  ----------------------------------------- */
  const weeklyBtn = document.createElement("div");
  weeklyBtn.className = "weekly-btn";
  weeklyBtn.textContent = "Weekly Overview";

  weeklyBtn.onclick = () => {
    window.renderScreen("WeeklyOverview");
  };

  root.appendChild(weeklyBtn);

  return root;
}
