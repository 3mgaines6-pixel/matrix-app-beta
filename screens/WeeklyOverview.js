/* ============================================================
   WEEKLY OVERVIEW — Visual Weekly Program Dashboard
============================================================ */

import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function WeeklyOverview() {
  const container = document.createElement("div");
  container.className = "screen strength-bg";

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Weekly Overview";
  container.appendChild(header);

  const todayIndex = new Date().getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const history = JSON.parse(localStorage.getItem("history") || "{}");

  days.forEach((day, index) => {
    const card = document.createElement("div");
    card.className = "card-base weekly-card";

    if (index === todayIndex) {
      card.classList.add("today-highlight");
    }

    const title = document.createElement("div");
    title.className = "weekly-title";
    title.textContent = day;

    card.appendChild(title);

    const list = WEEKLY[day] || [];

    list.forEach((id) => {
      const m = MACHINES[id];
      if (!m) return;

      const item = document.createElement("div");
      item.className = "weekly-item";

      const sets = history[id] || [];
      const last = sets[sets.length - 1];

      const check = last ? "✔️" : "⬜";

      item.innerHTML = `
        <span>${check}</span>
        <span>${m.emoji} ${m.name}</span>
        <span class="tag ${m.type.toLowerCase()}">${m.type}</span>
      `;

      card.appendChild(item);
    });

    container.appendChild(card);
  });

  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen("StrengthStudio");
  container.appendChild(back);

  return container;
}
