import { MACHINES } from "../data/machines.js";

export function Summary() {
  const container = document.createElement("div");
  container.className = "summary-screen";

  const title = document.createElement("h1");
  title.className = "summary-title";
  title.textContent = "Workout Summary";
  container.appendChild(title);

  /* ============================
     SECTION: STRENGTH SUMMARY
  ============================ */
  Object.keys(MACHINES).forEach(id => {
  const meta = MACHINES[id];
  const raw = localStorage.getItem(`machine-${id}-history`);
  if (!raw) return;

  const history = JSON.parse(raw);
  if (history.length === 0) return;

  const entry = history[history.length - 1]; // last session only

  const reps = entry.reps.join("/");
  const weight = entry.weight.join("/");
  const handle = entry.handle ? ` (${entry.handle})` : "";

  // Calculate volume
  entry.reps.forEach((r, i) => {
    totalSets++;
    totalVolume += r * entry.weight[i];
  });

  const row = document.createElement("div");
  row.className = "summary-row";
  row.textContent = `#${id} ${meta.name}: ${reps} @ ${weight}${handle}`;
  strengthList.appendChild(row);
});


  /* ============================
     SECTION: CARDIO SUMMARY
     (placeholder for future)
  ============================ */
  const cardioHeader = document.createElement("h2");
  cardioHeader.textContent = "Cardio Summary";
  container.appendChild(cardioHeader);

  const cardioPlaceholder = document.createElement("div");
  cardioPlaceholder.className = "summary-row";
  cardioPlaceholder.textContent = "Cardio tracking coming soon.";
  container.appendChild(cardioPlaceholder);

  /* ============================
     BACK BUTTON
  ============================ */
  const backBtn = document.createElement("button");
  backBtn.className = "summary-back-btn";
  backBtn.textContent = "Return to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(backBtn);

  return container;
}

