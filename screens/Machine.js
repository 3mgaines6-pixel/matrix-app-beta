import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function Machine(data) {
  const id = data?.id;
  const number = data?.number;
  const day = data?.day;

  if (!id || !MACHINES[id]) {
    const fallback = document.createElement("div");
    fallback.textContent = "Machine not found.";
    return fallback;
  }

  const m = MACHINES[id];

  const root = document.createElement("div");
  root.id = "machine-root";

  /* -----------------------------------------
     TODAY'S SET STORAGE
  ----------------------------------------- */
  const todayKey = `history_${id}_today`;
  let todaySets = JSON.parse(localStorage.getItem(todayKey) || "[]");

  function saveToday() {
    localStorage.setItem(todayKey, JSON.stringify(todaySets));
  }

  /* -----------------------------------------
     LAST SESSION STORAGE
  ----------------------------------------- */
  const lastKey = `history_${id}_last`;
  const lastSession = JSON.parse(localStorage.getItem(lastKey) || "[]");

  /* -----------------------------------------
     HEADER
  ----------------------------------------- */
  const header = document.createElement("div");
  header.className = "machine-header";
  header.innerHTML = `
    <div class="machine-title">${m.emoji} ${m.name}</div>
    <div class="machine-sub">${m.type} • ${m.muscle}</div>
  `;
  root.appendChild(header);

  /* -----------------------------------------
     LAST SESSION BOX
  ----------------------------------------- */
  const lastBox = document.createElement("div");
  lastBox.className = "machine-last-box";

  if (lastSession.length) {
    const last = lastSession[lastSession.length - 1];
    lastBox.textContent = `Last: ${last.weight} lbs × ${last.reps}`;
  } else {
    lastBox.textContent = "Last: —";
  }

  root.appendChild(lastBox);

  /* -----------------------------------------
     CUES + REP TARGETS
  ----------------------------------------- */
  const repTargets = {
    Heavy: "6–8 reps",
    Light: "10–12 reps",
    Core: "12–15 reps"
  };

  const cueBox = document.createElement("div");
  cueBox.className = "machine-cue-box";
  cueBox.textContent = `${m.type} • ${repTargets[m.type]}`;
  root.appendChild(cueBox);

  /* -----------------------------------------
     DS1 DRAWER
  ----------------------------------------- */
  const drawer = document.createElement("div");
  drawer.className = "ds1-drawer";

  drawer.innerHTML = `
    <div class="drawer-title">Log Set</div>
    <input class="drawer-input weight-input" type="number" placeholder="Weight (lbs)">
    <input class="drawer-input reps-input" type="number" placeholder="Reps">
    <div class="drawer-log-btn">Log Set</div>
  `;

  root.appendChild(drawer);

  const weightInput = drawer.querySelector(".weight-input");
  const repsInput = drawer.querySelector(".reps-input");
  const logBtn = drawer.querySelector(".drawer-log-btn");

  function openDrawer() {
    drawer.classList.add("open");
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    weightInput.value = "";
    repsInput.value = "";
  }

  /* -----------------------------------------
     SET LIST (READ-ONLY)
  ----------------------------------------- */
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
        saveToday();
        renderSets();
      };

      setList.appendChild(row);
    });
  }

  renderSets();

  /* -----------------------------------------
     ADD SET BUTTON (OPENS DRAWER)
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
     LOG SET (INSIDE DRAWER)
  ----------------------------------------- */
  logBtn.onclick = () => {
    const w = weightInput.value.trim();
    const r = repsInput.value.trim();

    if (!w || !r) return;

    todaySets.push({ weight: w, reps: r });
    saveToday();
    renderSets();
    closeDrawer();
  };

  /* -----------------------------------------
     DELETE ALL SETS
  ----------------------------------------- */
  const delAll = document.createElement("div");
  delAll.className = "delete-all-btn";
  delAll.textContent = "Delete All Sets";

  delAll.onclick = () => {
    todaySets = [];
    saveToday();
    renderSets();
  };

  root.appendChild(delAll);

  /* -----------------------------------------
     NEXT MACHINE
  ----------------------------------------- */
  const nextBtn = document.createElement("div");
  nextBtn.className = "next-machine-btn";
  nextBtn.textContent = "Next Machine";

  nextBtn.onclick = () => {
    window.renderScreen("Machine", {
      id: MACHINES[number + 1]?.id,
      number: number + 1,
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
