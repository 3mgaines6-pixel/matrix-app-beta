import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";
import { loadHistory, saveHistory, getLastSession } from "../utils/history.js";

export default function Machine(data) {
  const id = data?.id;
  const index = data?.number;   // position in the day
  const day = data?.day;

  if (!id || !MACHINES[id]) {
    const fallback = document.createElement("div");
    fallback.textContent = "Machine not found.";
    return fallback;
  }

  const m = MACHINES[id];
  const type = m.type; // HEAVY / LIGHT / CORE

  /* -----------------------------------------
     ROOT
  ----------------------------------------- */
  const root = document.createElement("div");
  root.id = "machine-root";

  /* -----------------------------------------
     LOAD HISTORY
  ----------------------------------------- */
  const history = loadHistory(id, type);
  const last = getLastSession(id, type);

  /* -----------------------------------------
     HEADER
  ----------------------------------------- */
  const header = document.createElement("div");
  header.className = "machine-header";
  header.innerHTML = `
    <div class="machine-title">#${m.number} ${m.name}</div>
    <div class="machine-sub">${m.muscle} • ${type}</div>
  `;
  root.appendChild(header);

  /* -----------------------------------------
     LAST SESSION BOX
  ----------------------------------------- */
  const lastBox = document.createElement("div");
  lastBox.className = "machine-last-box";

  if (last) {
    const formatted = last.sets.map(s => `${s.reps}@${s.weight}`).join(", ");
    const date = new Date(last.time).toLocaleDateString();
    lastBox.textContent = `Last (${date}): ${formatted}`;
  } else {
    lastBox.textContent = "Last: —";
  }

  root.appendChild(lastBox);

  /* -----------------------------------------
     REP TARGETS + CUES
  ----------------------------------------- */
  const repTargets = {
    HEAVY: "6–8 reps • Tempo 3‑1‑2",
    LIGHT: "10–12 reps • Tempo 2‑1‑2",
    CORE: "12–15 reps • Tempo 2‑2‑2"
  };

  const cueBox = document.createElement("div");
  cueBox.className = "machine-cue-box";
  cueBox.textContent = repTargets[type];
  root.appendChild(cueBox);

  /* -----------------------------------------
     SET LIST (TODAY)
  ----------------------------------------- */
  let todaySets = [];

  const setList = document.createElement("div");
  setList.className = "set-list";
  root.appendChild(setList);

  function renderSets() {
    setList.innerHTML = "";

    todaySets.forEach((s, i) => {
      const row = document.createElement("div");
      row.className = "set-row";

      row.innerHTML = `
        <div class="set-label">Set ${i + 1}</div>
        <div class="set-value">${s.weight} lbs × ${s.reps}</div>
        <div class="set-delete">✖</div>
      `;

      row.querySelector(".set-delete").onclick = () => {
        todaySets.splice(i, 1);
        renderSets();
      };

      setList.appendChild(row);
    });
  }

  /* -----------------------------------------
     DRAWER
  ----------------------------------------- */
  const drawer = document.createElement("div");
  drawer.className = "ds1-drawer";

  drawer.innerHTML = `
    <div class="drawer-title">Log Set</div>

    <input class="drawer-input weight-input" type="number" placeholder="Weight (lbs)">
    <input class="drawer-input reps-input" type="number" placeholder="Reps">

    <div class="drawer-actions">
      <div class="drawer-log-btn">Log Set</div>
      <div class="drawer-close-btn">Close</div>
    </div>
  `;

  root.appendChild(drawer);

  const weightInput = drawer.querySelector(".weight-input");
  const repsInput = drawer.querySelector(".reps-input");
  const logBtn = drawer.querySelector(".drawer-log-btn");
  const closeBtn = drawer.querySelector(".drawer-close-btn");

  function openDrawer() {
    drawer.classList.add("open");

    // Auto-fill last weight
    if (last) {
      const lastSet = last.sets[last.sets.length - 1];
      weightInput.value = lastSet.weight;
    }
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    weightInput.value = "";
    repsInput.value = "";
  }

  closeBtn.onclick = closeDrawer;

  /* -----------------------------------------
     ADD SET BUTTON
  ----------------------------------------- */
  const addBtn = document.createElement("div");
  addBtn.className = "add-set-btn";
  addBtn.textContent = "Add Set";

  addBtn.onclick = () => {
    if (todaySets.length >= 3) return;
    openDrawer();
  };

  root.appendChild(addBtn);

  /* -----------------------------------------
     LOG SET
  ----------------------------------------- */
  logBtn.onclick = () => {
    const weight = parseFloat(weightInput.value);
    const reps = parseInt(repsInput.value, 10);

    if (!Number.isFinite(weight) || !Number.isFinite(reps)) {
      alert("Enter valid weight and reps.");
      return;
    }

    todaySets.push({ weight, reps });
    renderSets();
    closeDrawer();
  };

  /* -----------------------------------------
     DELETE ALL
  ----------------------------------------- */
  const delAll = document.createElement("div");
  delAll.className = "delete-all-btn";
  delAll.textContent = "Delete All Sets";

  delAll.onclick = () => {
    todaySets = [];
    renderSets();
  };

  root.appendChild(delAll);

  /* -----------------------------------------
     SAVE SESSION
  ----------------------------------------- */
  function saveSession() {
    if (!todaySets.length) return;

    saveHistory(id, type, {
      time: Date.now(),
      sets: todaySets
    });
  }

  /* -----------------------------------------
     NEXT MACHINE
  ----------------------------------------- */
  const nextBtn = document.createElement("div");
  nextBtn.className = "next-machine-btn";
  nextBtn.textContent = "Next Machine";

  nextBtn.onclick = () => {
    saveSession();

    const machineIds = WEEKLY[day].machines;
    const nextId = machineIds[index];

    if (!nextId) return;

    window.renderScreen("Machine", {
      id: nextId,
      number: index + 1,
      day
    });
  };

  root.appendChild(nextBtn);

  /* -----------------------------------------
     COMPLETE DAY
  ----------------------------------------- */
  const completeBtn = document.createElement("div");
  completeBtn.className = "complete-day-btn";
  completeBtn.textContent = "Complete Day";

  completeBtn.onclick = () => {
    saveSession();
    window.renderScreen("Summary");
  };

  root.appendChild(completeBtn);

  /* -----------------------------------------
     BACK BUTTON
  ----------------------------------------- */
  const backBtn = document.createElement("div");
  backBtn.className = "back-btn";
  backBtn.textContent = "← Back";

  backBtn.onclick = () => {
    window.renderScreen("StrengthStudio");
  };

  root.appendChild(backBtn);

  return root;
}
