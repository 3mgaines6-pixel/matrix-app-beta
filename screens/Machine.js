import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function Machine({ id, number, day }) {
  const m = MACHINES[id];

  const container = document.createElement("div");
  container.className = "machine-screen";

  /* -------------------------------
     HEADER
  --------------------------------*/
  const title = document.createElement("h1");
  title.className = "machine-title";
  title.textContent = `${number}. ${m.emoji} ${m.name}`;
  container.appendChild(title);

  const sub = document.createElement("div");
  sub.className = "machine-subtitle";
  sub.textContent = `Today: ${day}`;
  container.appendChild(sub);

  /* -------------------------------
     BADGES (Week / Block / Swap)
  --------------------------------*/
  const badgeRow = document.createElement("div");
  badgeRow.className = "badge-row";
  container.appendChild(badgeRow);

  function getWeek() {
    return parseInt(localStorage.getItem("training_week") || "1");
  }

  function getBlock(week) {
    return week === 1 || week === 3 ? "Heavy" : "Light";
  }

  function isSwapWeek() {
    return localStorage.getItem("swap_week") === "true";
  }

  function renderBadges() {
    badgeRow.innerHTML = "";

    const week = getWeek();
    const block = getBlock(week);

    const weekBadge = document.createElement("div");
    weekBadge.className = "badge";
    weekBadge.textContent = `Week ${week} of 4`;
    badgeRow.appendChild(weekBadge);

    const blockBadge = document.createElement("div");
    blockBadge.className = "badge";
    blockBadge.textContent = `${block} Week`;
    badgeRow.appendChild(blockBadge);

    if (isSwapWeek()) {
      const swapBadge = document.createElement("div");
      swapBadge.className = "badge swap";
      swapBadge.textContent = "Swap Week Active";
      badgeRow.appendChild(swapBadge);
    }
  }

  renderBadges();

  /* -------------------------------
     MUSCLE + CUE + TEMPO
  --------------------------------*/
  const info = document.createElement("div");
  info.className = "machine-info";
  info.innerHTML = `
    <div class="machine-muscle">${m.muscle} • ${m.type}</div>
    <div class="machine-cue">${m.cue}</div>
    <div class="machine-tempo">${m.tempo}</div>
  `;
  container.appendChild(info);

  /* -------------------------------
     REP TARGETS (W1)
  --------------------------------*/
  const repTarget = document.createElement("div");
  repTarget.className = "rep-target";

  const block = getBlock(getWeek());

  let targetText = "";
  if (m.type === "Heavy") targetText = "Target: 6–8 reps (Heavy Day)";
  else if (m.type === "Light") targetText = "Target: 10–12 reps (Light Day)";
  else targetText = "Target: 12–15 reps (Core)";

  repTarget.textContent = targetText;
  container.appendChild(repTarget);

  /* -------------------------------
     SET INPUTS
  --------------------------------*/
  const setContainer = document.createElement("div");
  setContainer.className = "set-container";

  const todayKey = `history_${id}_today`;
  let todaySets = JSON.parse(localStorage.getItem(todayKey) || "[]");

  function renderSets() {
    setContainer.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      const row = document.createElement("div");
      row.className = "set-row";

      const weight = document.createElement("input");
      weight.type = "number";
      weight.placeholder = "Weight";
      weight.value = todaySets[i]?.weight || "";

      const reps = document.createElement("input");
      reps.type = "number";
      reps.placeholder = "Reps";
      reps.value = todaySets[i]?.reps || "";

      const del = document.createElement("div");
      del.className = "delete-set";
      del.textContent = "🗑";
      del.onclick = () => deleteSingleSet(i);

      row.appendChild(weight);
      row.appendChild(reps);
      row.appendChild(del);

      setContainer.appendChild(row);
    }
  }

  renderSets();
  container.appendChild(setContainer);

  /* -------------------------------
     SAVE SETS
  --------------------------------*/
  function saveSets() {
    const rows = setContainer.querySelectorAll(".set-row");
    const newSets = [];

    rows.forEach((row) => {
      const weight = row.children[0].value;
      const reps = row.children[1].value;

      if (weight && reps) {
        newSets.push({ weight, reps });
      }
    });

    todaySets = newSets;
    localStorage.setItem(todayKey, JSON.stringify(todaySets));
  }

  /* -------------------------------
     DELETE SYSTEM
  --------------------------------*/
  function deleteSingleSet(i) {
    todaySets.splice(i, 1);
    localStorage.setItem(todayKey, JSON.stringify(todaySets));
    renderSets();
  }

  function deleteAllSets() {
    todaySets = [];
    localStorage.setItem(todayKey, "[]");
    renderSets();
  }

  const deleteAllBtn = document.createElement("div");
  deleteAllBtn.className = "delete-all";
  deleteAllBtn.textContent = "Delete All Sets";
  deleteAllBtn.onclick = deleteAllSets;
  container.appendChild(deleteAllBtn);

  /* -------------------------------
     NEXT MACHINE / COMPLETE DAY
  --------------------------------*/
  const navBtn = document.createElement("div");
  navBtn.className = "next-machine-btn";

  const todayMachines = WEEKLY[day];
  const isLast = number === todayMachines.length;

  navBtn.textContent = isLast
    ? "Complete Day"
    : `→ Next Machine (${number + 1} of 5)`;

  navBtn.onclick = () => {
    saveSets();

    if (!isLast) {
      const nextId = todayMachines[number];
      window.renderScreen("Machine", {
        id: nextId,
        number: number + 1,
        day
      });
      return;
    }

    showWorkoutComplete();
  };

  container.appendChild(navBtn);

  /* -------------------------------
     WORKOUT COMPLETE SCREEN (C‑B)
  --------------------------------*/
  function showWorkoutComplete() {
    const screen = document.createElement("div");
    screen.className = "workout-complete";

    screen.innerHTML = `
      <h2>🎉 Workout Complete!</h2>
      <p>You finished all 5 machines.</p>

      <div class="rep-summary">
        <strong>Today's Rep Targets</strong><br>
        Heavy: 6–8 reps<br>
        Light: 10–12 reps<br>
        Core: 12–15 reps
      </div>

      <div class="return-btn">Return to Strength Studio</div>
    `;

    screen.querySelector(".return-btn").onclick = () => {
      window.renderScreen("StrengthStudio");
      if (window.onStrengthReturn) window.onStrengthReturn();
    };

    document.body.innerHTML = "";
    document.body.appendChild(screen);
  }

  /* -------------------------------
     BACK BUTTON
  --------------------------------*/
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => {
    saveSets();
    window.renderScreen("StrengthStudio");
    if (window.onStrengthReturn) window.onStrengthReturn();
  };
  container.appendChild(back);

  return container;
}
