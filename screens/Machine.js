/* =========================================
   MACHINE SCREEN (DOM VERSION)
========================================= */
import { MACHINES } from "../data/machines.js";

export default function Machine(data) {
  const machineName = data?.name;          // ID string (e.g., "7")
  const machine = MACHINES[machineName];   // Machine metadata

  const container = document.createElement("div");
  container.className = "machine-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";

  // ⭐ FIXED: Use machineName (ID) + machine.name (label)
  header.textContent = `${machineName} — ${machine.name}`;

  container.appendChild(header);

  /* LAST SESSION INFO */
  const last = document.createElement("div");
  last.className = "last-session";

  if (machine.lastWeight) {
    last.textContent = `Last: ${machine.lastWeight} lbs × ${machine.lastReps} reps`;
  } else {
    last.textContent = "No history yet";
  }

  container.appendChild(last);

  /* WEIGHT INPUT */
  const weightInput = document.createElement("input");
  weightInput.type = "number";
  weightInput.className = "weight-input";
  weightInput.placeholder = "Weight (lbs)";
  weightInput.value = machine.lastWeight || "";
  container.appendChild(weightInput);

  /* REPS INPUT */
  const repsInput = document.createElement("input");
  repsInput.type = "number";
  repsInput.className = "reps-input";
  repsInput.placeholder = "Reps";
  repsInput.value = machine.lastReps || "";
  container.appendChild(repsInput);

  /* SAVE BUTTON */
  const saveBtn = document.createElement("div");
  saveBtn.className = "save-button";
  saveBtn.textContent = "Save Set";

  saveBtn.onclick = () => {
    const w = Number(weightInput.value);
    const r = Number(repsInput.value);

    if (!w || !r) {
      alert("Enter weight and reps");
      return;
    }

    // Save to machine object
    machine.lastWeight = w;
    machine.lastReps = r;

    // Save to localStorage
    localStorage.setItem("machines", JSON.stringify(MACHINES));

    alert("Set saved!");
  };

  container.appendChild(saveBtn);

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("StrengthStudio");
  container.appendChild(backBtn);

  return container;
}
