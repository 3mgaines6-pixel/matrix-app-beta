import { MACHINES } from "../data/machines.js";

export default function StrengthHistory() {
  const container = document.createElement("div");
  container.className = "weekly-screen";

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Strength History";
  container.appendChild(header);

  const history = JSON.parse(localStorage.getItem("history") || "{}");

  const list = document.createElement("div");
  list.className = "scroll-list";
  container.appendChild(list);

  Object.keys(history).forEach((id) => {
    const machine = MACHINES[id];
    if (!machine) return;

    const card = document.createElement("div");
    card.className = "card-base";

    const sets = history[id];
    const last = sets[sets.length - 1];

    card.innerHTML = `
      <div class="weekly-title">${id} — ${machine.emoji} ${machine.name}</div>
      <div class="weekly-sub">${last.weight} lbs × ${last.reps} reps</div>
    `;

    list.appendChild(card);
  });

  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back to Strength Studio";
  back.onclick = () => window.renderScreen("StrengthStudio");
  container.appendChild(back);

  return container;
}
