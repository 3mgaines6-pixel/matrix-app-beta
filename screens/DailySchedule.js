/* =========================================
   DAILY SCHEDULE (DOM VERSION)
========================================= */

import { MACHINES } from "../data/machines.js";
import { WEEKLY_SCHEDULE } from "../data/weekly.js";

export default function DailySchedule() {
  const container = document.createElement("div");
  container.className = "weekly-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Today's Workout";
  container.appendChild(header);

  /* DETERMINE TODAY */
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const today = days[new Date().getDay()];

  /* LOAD TODAY'S MACHINES */
  const todayList = WEEKLY_SCHEDULE[today] || [];

  const list = document.createElement("div");
  list.className = "scroll-list";
  container.appendChild(list);

  if (todayList.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card-base";
    empty.style.textAlign = "center";
    empty.textContent = "No workout scheduled for today";
    list.appendChild(empty);
  }

  /* LOAD HISTORY TO MARK COMPLETED MACHINES */
  const history = JSON.parse(localStorage.getItem("history") || "{}");

  todayList.forEach((id) => {
    const machine = MACHINES[id];

    const card = document.createElement("div");
    card.className = "card-base";
    card.style.cursor = "pointer";

    /* Determine if machine has sets today */
    const sets = history[id] || [];
    const last = sets[sets.length - 1];
    const completed =
      last &&
      new Date(last.date).toDateString() === new Date().toDateString();

    card.innerHTML = `
      <div class="weekly-title">
        ${id} — ${machine.name}
      </div>
      <div class="weekly-sub">
        ${completed ? "Completed ✔" : "Not started"}
      </div>
    `;

    card.onclick = () => {
      window.renderScreen("Machine", { name: id, returnTo: "DailySchedule" });
    };

    list.appendChild(card);
  });

  /* RETURN BUTTON */
  const backBtn = document.createElement("button");
  backBtn.className = "return-btn";
  backBtn.textContent = "Return to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(backBtn);

  return container;
}
