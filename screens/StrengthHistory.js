import { MACHINES } from "../data/machines.js";

export default function StrengthHistory() {
  const root = document.createElement("div");
  root.className = "strength-screen";

  // Title
  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Strength History";
  root.appendChild(title);

  // Back button
  const backBtn = document.createElement("div");
  backBtn.className = "gym-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  root.appendChild(backBtn);

  // Load history
  const history = JSON.parse(localStorage.getItem("history") || "{}");

  // Loop through machines with history
  Object.values(MACHINES).forEach(machine => {
    const sets = history[machine.id];
    if (!sets || sets.length === 0) return;

    const last = sets[sets.length - 1];
    const date = new Date(last.date).toLocaleDateString();

    const card = document.createElement("div");
    card.className = "machine-card";

    card.innerHTML = `
      <div class="machine-name">${machine.emoji} ${machine.name}</div>
      <div class="machine-baseline">
        Last: ${last.weight} lbs × ${last.reps} reps — ${date}
      </div>
    `;

    // FIX: Pass full machine object, not ID
    card.onclick = () => window.renderScreen("Machine", machine);

    root.appendChild(card);
  });

  return root;
}
