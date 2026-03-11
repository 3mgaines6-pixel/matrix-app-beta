import { WEEKLY } from "../data/weekly.js";
import { MACHINES } from "../data/machines.js";

export default function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  /* -------------------------------
     TITLE WITH FROSTED BACKDROP
  --------------------------------*/
  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Strength Studio";
  container.appendChild(title);

  /* -------------------------------
     DAY SELECTOR BUTTONS
  --------------------------------*/
  const dayRow = document.createElement("div");
  dayRow.className = "day-selector-row";

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let selectedDay = new Date().getDay(); // 1–5 for Mon–Fri

  // Convert JS day (0–6) to your training week (Mon–Fri)
  if (selectedDay === 0 || selectedDay === 6) selectedDay = 1;

  days.forEach((d, index) => {
    const btn = document.createElement("div");
    btn.className = "day-button";
    btn.textContent = d;

    if (index + 1 === selectedDay) {
      btn.classList.add("day-selected");
    }

    btn.onclick = () => {
      document.querySelectorAll(".day-button").forEach(b => b.classList.remove("day-selected"));
      btn.classList.add("day-selected");
      loadDay(index + 1);
    };

    dayRow.appendChild(btn);
  });

  container.appendChild(dayRow);

  /* -------------------------------
     MACHINE LIST CONTAINER
  --------------------------------*/
  const list = document.createElement("div");
  list.className = "machine-list";
  container.appendChild(list);

  /* -------------------------------
     LOAD MACHINES FOR SELECTED DAY
  --------------------------------*/
  function loadDay(dayNumber) {
    list.innerHTML = "";

    const todayMachines = WEEKLY[dayNumber] || [];

    todayMachines.forEach(id => {
      const m = MACHINES[id];
      if (!m) return;

      const card = document.createElement("div");
      card.className = "machine-card";

      card.innerHTML = `
        <div class="machine-name">${m.emoji} ${m.name}</div>
        <div class="machine-baseline">${m.muscle}</div>
        <div class="machine-baseline">Baseline: ${m.baseline} lbs</div>
      `;

      card.onclick = () => window.renderScreen("Machine", { id });
      list.appendChild(card);
    });
  }

  loadDay(selectedDay);

  /* -------------------------------
     BACK BUTTON
  --------------------------------*/
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(back);

  return container;
}
