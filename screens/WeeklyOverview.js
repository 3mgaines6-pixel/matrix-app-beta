import { WEEKLY } from "../data/weekly.js";
import { MACHINES } from "../data/machines.js";

export default function WeeklyOverview() {
  const root = document.createElement("div");
  root.className = "strength-screen";

  // ------------------------------------------------------------
  // BACK BUTTON
  // ------------------------------------------------------------
  const backBtn = document.createElement("div");
  backBtn.className = "gym-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");

  root.appendChild(backBtn);

  // ------------------------------------------------------------
  // TITLE
  // ------------------------------------------------------------
  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Weekly Overview";
  root.appendChild(title);

  // ------------------------------------------------------------
  // HISTORY LOAD
  // ------------------------------------------------------------
  const history = JSON.parse(localStorage.getItem("history") || "{}");

  // ------------------------------------------------------------
  // BUILD EACH DAY
  // ------------------------------------------------------------
  Object.keys(WEEKLY).forEach(day => {
    const config = WEEKLY[day];
    const machineNumbers = config.machines;   // ⭐ FIXED

    const dayCard = document.createElement("div");
    dayCard.className = "machine-card";

    const dayTitle = document.createElement("div");
    dayTitle.className = "machine-name";
    dayTitle.textContent = config.name;       // ⭐ FIXED
    dayCard.appendChild(dayTitle);

    machineNumbers.forEach(num => {
      const m = Object.values(MACHINES).find(x => x.number === num);
      if (!m) return;

      const item = document.createElement("div");
      item.className = "weekly-item";

      // Last workout
      const sets = history[m.id] || [];
      const last = sets[sets.length - 1];

      const lastText = last
        ? `${last.weight} lbs × ${last.reps} reps`
        : "—";

      item.innerHTML = `
        <div class="weekly-machine">
          ${m.number} • ${m.emoji} ${m.name}
        </div>
        <div class="weekly-last">${lastText}</div>
      `;

      dayCard.appendChild(item);
    });

    root.appendChild(dayCard);
  });

  return root;
}
