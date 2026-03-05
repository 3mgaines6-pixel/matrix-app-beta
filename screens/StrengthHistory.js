export function StrengthHistory() {
  const container = document.createElement("div");
  container.className = "history-screen";

  const wrapper = document.createElement("div");
  wrapper.className = "history-wrapper";
  container.appendChild(wrapper);

  /* HEADER */
  const header = document.createElement("div");
  header.className = "history-header";
  header.textContent = "Strength History";
  wrapper.appendChild(header);

  /* LOAD ALL MACHINE KEYS */
  const keys = Object.keys(localStorage).filter(k =>
    k.startsWith("machine-") && k.endsWith("-history")
  );

  if (keys.length === 0) {
    const empty = document.createElement("div");
    empty.className = "history-empty";
    empty.textContent = "No history logged yet.";
    wrapper.appendChild(empty);
  }

/* DISPLAY HISTORY FOR EACH MACHINE */
keys.forEach(key => {
  const machineId = key.replace("machine-", "").replace("-history", "");
  const history = JSON.parse(localStorage.getItem(key)) || [];

  if (history.length === 0) return;

  // 🔥 NEW: Get machine name from MACHINES database
  const meta = MACHINES[machineId];
  const machineName = meta ? meta.name : "Unknown Machine";

  const machineLabel = document.createElement("div");
  machineLabel.className = "history-machine-label";

  // 🔥 UPDATED: Show number + name
  machineLabel.textContent = `Machine #${machineId} — ${machineName}`;
  wrapper.appendChild(machineLabel);

  history.forEach(entry => {
    const dateLabel = document.createElement("div");
    dateLabel.className = "history-date";
    dateLabel.textContent = entry.date;
    wrapper.appendChild(dateLabel);

    entry.sets.forEach((set, index) => {
      const row = document.createElement("div");
      row.className = "history-row";
      row.textContent = `Set ${index + 1}: ${set.reps} reps @ ${set.weight}`;
      wrapper.appendChild(row);
    });
  });
}); // ← THIS was the missing brace that caused the white screen

/* RETURN BUTTON */
const returnBtn = document.createElement("button");
returnBtn.className = "history-return-btn";
returnBtn.textContent = "← Back to Strength Studio";
returnBtn.onclick = () => window.renderScreen("StrengthStudio");
wrapper.appendChild(returnBtn);

return container;
}
