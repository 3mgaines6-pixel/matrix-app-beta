import { WEEKLY } from "../data/weekly.js";
import { MACHINES } from "../data/machines.js";
import { getLastSession } from "../utils/history.js";

export default function WeeklyOverview() {
  const root = document.createElement("div");
  root.id = "weekly-root";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "weekly-header";
  header.textContent = "Weekly Overview";
  root.appendChild(header);

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-btn";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  root.appendChild(backBtn);

  /* WEEKLY CONTAINER */
  const container = document.createElement("div");
  container.className = "weekly-container";
  root.appendChild(container);

  /* LOOP THROUGH DAYS */
  Object.keys(WEEKLY).forEach(day => {
    const dayBox = document.createElement("div");
    dayBox.className = "weekly-day-box";

    const title = document.createElement("div");
    title.className = "weekly-day-title";
    title.textContent = day;
    dayBox.appendChild(title);

    const list = document.createElement("div");
    list.className = "weekly-day-list";

    WEEKLY[day].machines.forEach(id => {
      const m = MACHINES[id];
      const last = getLastSession(m.number, m.type);

      const row = document.createElement("div");
      row.className = "weekly-machine-row";

      const lastText = last
        ? last.sets.map(s => `${s.reps}@${s.weight}`).join(", ")
        : "—";

      row.innerHTML = `
        <div class="weekly-machine-title">#${m.number} ${m.name}</div>
        <div class="weekly-machine-sub">${m.muscle} • ${m.type}</div>
        <div class="weekly-machine-last">Last: ${lastText}</div>
      `;

      row.onclick = () => {
        window.renderScreen("Machine", {
          id,
          number: m.number,
          day
        });
      };

      list.appendChild(row);
    });

    dayBox.appendChild(list);
    container.appendChild(dayBox);
  });

  return root;
}
