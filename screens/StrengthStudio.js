import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  /* -------------------------------
     TITLE
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

  // Convert JS day (0–6) to our string keys
  let jsDay = new Date().getDay(); // Sun=0, Mon=1, ..., Sat=6
  if (jsDay === 0 || jsDay === 6) jsDay = 1; // Weekend → default to Monday
  const selectedDayKey = days[jsDay - 1]; // Convert number → "Mon"

  days.forEach((d, index) => {
    const btn = document.createElement("div");
    btn.className = "day-button";
    btn.textContent = d;

    if (d === selectedDayKey) {
      btn.classList.add("day-selected");
    }

    btn.onclick = () => {
      document.querySelectorAll(".day-button").forEach(b => b.classList.remove("day-selected"));
      btn.classList.add("day-selected");
      loadDay(d); // <-- USE STRING KEY
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
  function loadDay(dayKey) {
    list.innerHTML = "";

    const todayMachines = WEEKLY[dayKey] || [];

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

  // Load today's day on startup
  loadDay(selectedDayKey);

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
