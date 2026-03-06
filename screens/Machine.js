/* =========================================
   MACHINE SCREEN (DOM VERSION)
========================================= */
import { MACHINES } from "../data/machines.js";

export default function Machine(data) {
  const machineID = data?.name;
  const machine = MACHINES[machineID];

  const container = document.createElement("div");
  container.className = "machine-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = `${machineID} — ${machine.name}`;
  container.appendChild(header);

  /* LOAD FULL HISTORY */
  const history = JSON.parse(localStorage.getItem("history") || "{}");
  const sets = history[machineID] || [];

  /* LAST SESSION */
  const last = document.createElement("div");
  last.className = "last-session";

  if (sets.length > 0) {
    const lastSet = sets[sets.length - 1];
    last.textContent = `Last: ${lastSet.weight} lbs × ${lastSet.reps} reps`;
  } else {
    last.textContent = "No history yet";
  }

  container.appendChild(last);

  /* WEIGHT INPUT */
  const weightInput = document.createElement("input");
  weightInput.type = "number";
  weightInput.className = "machine-input";
  weightInput.placeholder = "Weight (lbs)";
  container.appendChild(weightInput);

  /* REPS INPUT */
  const repsInput = document.createElement("input");
  repsInput.type = "number";
  repsInput.className = "machine-input";
  repsInput.placeholder = "Reps";
  container.appendChild(repsInput);

  /* SAVE BUTTON */
  const saveBtn = document.createElement("div");
  saveBtn.className = "button";
  saveBtn.textContent = "Save Set";

  saveBtn.onclick = () => {
    const w = Number(weightInput.value);
    const r = Number(repsInput.value);

    if (!w || !r) {
      alert("Enter weight and reps");
      return;
    }

    // Ensure machine history array exists
    if (!history[machineID]) {
      history[machineID] = [];
    }

    // Add new set
    history[machineID].push({
      weight: w,
      reps: r,
      date: new Date().toISOString()
    });

    // Save back to localStorage
    localStorage.setItem("history", JSON.stringify(history));

    alert("Set saved!");

    // Update last session display
    last.textContent = `Last: ${w} lbs × ${r} reps`;
  };

  container.appendChild(saveBtn);

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "return-btn";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("StrengthStudio");
  container.appendChild(backBtn);

  return container;
}
