import { WEEKLY_SCHEDULE } from "../data/weeklySchedule.js";
import { MACHINES } from "../data/machines.js";

let manualDaySelection = null;   // ⭐ remembers user choice across screens

export function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Strength Floor";

  /* ---------- DAY BUTTONS ---------- */
  const dayButtons = document.createElement("div");
  dayButtons.className = "strength-day-buttons";

  const days = Object.keys(WEEKLY_SCHEDULE);

  days.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "strength-btn";
    btn.textContent = day;

    btn.onclick = () => {
      manualDaySelection = day;     // ⭐ lock in user choice
      renderMachineList(day);
    };

    dayButtons.appendChild(btn);
  });

  /* ---------- MACHINE LIST ---------- */
  const machineList = document.createElement("div");
  machineList.className = "strength-machine-buttons";

  container.appendChild(title);
  container.appendChild(dayButtons);
  container.appendChild(machineList);

  /* ---------- INITIAL LOAD ---------- */
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const startingDay = manualDaySelection || today;   // ⭐ only auto-select if user hasn't chosen
  renderMachineList(startingDay);

  /* ---------- RENDER MACHINE LIST ---------- */
  function renderMachineList(day) {
    machineList.innerHTML = "";

    const ids = WEEKLY_SCHEDULE[day];
    if (!ids) return;

    ids.forEach(id => {
      const meta = MACHINES[id];
      if (!meta) return;

      const btn = document.createElement("button");
      btn.className = "strength-btn";
      btn.textContent = `#${id} ${meta.name}`;
      btn.onclick = () => window.renderScreen(`Machine-${id}`);

      machineList.appendChild(btn);
    });
  }

  return container;
}
