import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function Machine({ id, number, day }) {
  const m = MACHINES[id];

  /* -----------------------------------------
     WEEK / BLOCK / SWAP
  ----------------------------------------- */
  function getWeek() {
    return parseInt(localStorage.getItem("training_week") || "1");
  }

  function getBlock(week) {
    return week === 1 || week === 3 ? "Heavy" : "Light";
  }

  function isSwapWeek() {
    return localStorage.getItem("swap_week") === "true";
  }

  const week = getWeek();
  const block = getBlock(week);

  /* -----------------------------------------
     HISTORY KEYS
  ----------------------------------------- */
  const todayKey = `history_${id}_today`;
  const allKey = `history_${id}_all`;

  let todaySets = JSON.parse(localStorage.getItem(todayKey) || "[]");
  let allHistory = JSON.parse(localStorage.getItem(allKey) || "[]");

  /* -----------------------------------------
     BASELINE + LAST SESSION
  ----------------------------------------- */
  const baseline = m.base || 0;

  const lastSession = allHistory.length
    ? allHistory[allHistory.length - 1]
    : null;

  /* -----------------------------------------
     REP TARGETS
  ----------------------------------------- */
  const repTargets = {
    Heavy: { min: 6, max: 8 },
    Light: { min: 10, max: 12 },
    Core: { min: 12, max: 15 }
  };

  const target = repTargets[m.type] || repTargets.Core;

  /* -----------------------------------------
     SUGGESTED WEIGHT ENGINE
  ----------------------------------------- */
  function getSuggestedWeight() {
    if (!lastSession) return baseline;

    const last = lastSession.sets;
    const allTop = last.every(s => parseInt(s.reps) >= target.max);

    if (allTop) {
      if (m.type === "Heavy") return parseFloat(last[0].weight) + 5;
      if (m.type === "Light") return parseFloat(last[0].weight) + 2.5;
      return parseFloat(last[0].weight) + 2.5;
    }

    return parseFloat(last[0].weight);
  }

  let suggestedWeight = getSuggestedWeight();

  /* -----------------------------------------
     DRAWER (DS1, 50% HEIGHT)
  ----------------------------------------- */
  const drawer = document.createElement("div");
  drawer.className = "set-drawer";
  drawer.innerHTML = `
    <div class="drawer-handle"></div>
    <div class="drawer-content">
      <div class="drawer-title">Log Set</div>

      <div class="drawer-last">
        ${lastSession ? `Last: ${lastSession.sets[0].weight} × ${lastSession.sets[0].reps}` : "No previous session"}
      </div>

      <div class="drawer-inputs">
        <input id="drawer-weight" type="number" placeholder="Weight">
        <input id="drawer-reps" type="number" placeholder="Reps">
      </div>

      <div class="drawer-warning" id="drawer-warning"></div>

      <div class="drawer-log-btn">Log Set</div>
    </div>
  `;
  document.body.appendChild(drawer);

  function openDrawer(setIndex) {
    drawer.dataset.index = setIndex;
    document.getElementById("drawer-weight").value = suggestedWeight;
    document.getElementById("drawer-reps").value = "";
    drawer.classList.add("open");
  }

  function closeDrawer() {
    drawer.classList.remove("open");
  }

  /* -----------------------------------------
     LOG SET (L1, W1, B2)
  ----------------------------------------- */
  drawer.querySelector(".drawer-log-btn").onclick = () => {
    const i = parseInt(drawer.dataset.index);
    const w = document.getElementById("drawer-weight").value;
    const r = document.getElementById("drawer-reps").value;

    if (!w || !r) return;

    todaySets[i] = { weight: w, reps: r };
    localStorage.setItem(todayKey, JSON.stringify(todaySets));

    closeDrawer();
    renderSets();

    const next = i + 1;
    if (next < 3) {
      setTimeout(() => {
        document.querySelectorAll(".set-row")[next].scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  /* -----------------------------------------
     INNER / OUTER SELECTOR
  ----------------------------------------- */
  function renderVariation(container) {
    if (m.variation !== "inner-outer") return;

    const v = document.createElement("div");
    v.className = "variation-selector";

    const saved = localStorage.getItem(`variation_${id}`) || "inner";

    ["inner", "outer"].forEach(opt => {
      const btn = document.createElement("div");
      btn.className = `variation-btn ${saved === opt ? "active" : ""}`;
      btn.textContent = opt.toUpperCase();
      btn.onclick = () => {
        localStorage.setItem(`variation_${id}`, opt);
        renderVariation(container);
      };
      v.appendChild(btn);
    });

    container.appendChild(v);
  }

  /* -----------------------------------------
     NO TIME BUTTON
  ----------------------------------------- */
  function renderNoTime(container) {
    const nt = document.createElement("div");
    nt.className = "no-time-btn";
    nt.textContent = "No Time";
    nt.onclick = () => {
      nt.classList.add("used");
    };
    container.appendChild(nt);
  }
  /* -----------------------------------------
     REST TIMER BUTTON (REAL TIMER)
  ----------------------------------------- */
  let timerInterval = null;
  let timerSeconds = 120; // 2:00 default

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function startTimer(btn) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerSeconds = 120;
      btn.textContent = "2:00";
      return;
    }

    timerSeconds = 120;
    btn.textContent = formatTime(timerSeconds);

    timerInterval = setInterval(() => {
      timerSeconds--;
      btn.textContent = formatTime(timerSeconds);

      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerSeconds = 120;
        btn.textContent = "2:00";
      }
    }, 1000);
  }

  /* -----------------------------------------
     RENDER SET ROWS
  ----------------------------------------- */
  function renderSets() {
    const container = document.getElementById("sets-container");
    container.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      const row = document.createElement("div");
      row.className = "set-row";

      const label = document.createElement("div");
      label.className = "set-label";
      label.textContent = `Set ${i + 1}`;

      const val = todaySets[i]
        ? `${todaySets[i].weight} × ${todaySets[i].reps}`
        : "—";

      const value = document.createElement("div");
      value.className = "set-value";
      value.textContent = val;

      const logBtn = document.createElement("div");
      logBtn.className = "set-log-btn";
      logBtn.textContent = todaySets[i] ? "Edit" : "Log";
      logBtn.onclick = () => openDrawer(i);

      const delBtn = document.createElement("div");
      delBtn.className = "set-del-btn";
      delBtn.textContent = "×";
      delBtn.onclick = () => {
        todaySets[i] = null;
        localStorage.setItem(todayKey, JSON.stringify(todaySets));
        renderSets();
      };

      row.appendChild(label);
      row.appendChild(value);
      row.appendChild(logBtn);
      row.appendChild(delBtn);

      container.appendChild(row);
    }
  }

  /* -----------------------------------------
     HEAVY JUMP WARNING
  ----------------------------------------- */
  function checkHeavyJump() {
    if (!lastSession) return "";

    const lastW = parseFloat(lastSession.sets[0].weight);
    const jump = suggestedWeight - lastW;

    if (jump >= 10) {
      return "Warning: Big jump from last session.";
    }
    return "";
  }

  /* -----------------------------------------
     MAIN RENDER
  ----------------------------------------- */
  const root = document.getElementById("machine-root");
  root.innerHTML = "";

  /* TITLE */
  const title = document.createElement("div");
  title.className = "machine-title";
  title.textContent = m.name;
  root.appendChild(title);

  /* VARIATION */
  renderVariation(root);

  /* REP TARGETS */
  const reps = document.createElement("div");
  reps.className = "rep-targets";
  reps.textContent = `${target.min}–${target.max} reps`;
  root.appendChild(reps);

  /* TIMER BUTTON */
  const timerBtn = document.createElement("div");
  timerBtn.className = "timer-btn";
  timerBtn.textContent = "2:00";
  timerBtn.onclick = () => startTimer(timerBtn);
  root.appendChild(timerBtn);

  /* HEAVY JUMP WARNING */
  const warn = document.createElement("div");
  warn.className = "heavy-warning";
  warn.textContent = checkHeavyJump();
  root.appendChild(warn);

  /* SETS CONTAINER */
  const setsContainer = document.createElement("div");
  setsContainer.id = "sets-container";
  root.appendChild(setsContainer);

  renderSets();

  /* -----------------------------------------
     NEXT MACHINE BUTTON
  ----------------------------------------- */
  const nextBtn = document.createElement("div");
  nextBtn.className = "next-machine-btn";
  nextBtn.textContent = "Next Machine";
  nextBtn.onclick = () => {
    window.location.href = `/strength/${parseInt(number) + 1}`;
  };
  root.appendChild(nextBtn);
  /* -----------------------------------------
     COMPLETE DAY BUTTON
  ----------------------------------------- */
  const completeBtn = document.createElement("div");
  completeBtn.className = "complete-day-btn";
  completeBtn.textContent = "Complete Day";
  completeBtn.onclick = () => {
    // Save today's sets into full history if all 3 sets are logged
    if (todaySets.filter(s => s).length === 3) {
      allHistory.push({
        date: new Date().toISOString(),
        sets: todaySets
      });
      localStorage.setItem(allKey, JSON.stringify(allHistory));
    }

    // S3: Clear ALL today's sets for ALL machines
    Object.keys(localStorage).forEach(k => {
      if (k.endsWith("_today")) {
        localStorage.removeItem(k);
      }
    });

    // Navigate to workout complete screen
    window.location.href = "/strength/complete";
  };
  root.appendChild(completeBtn);

  /* -----------------------------------------
     BACK BUTTON
  ----------------------------------------- */
  const backBtn = document.createElement("div");
  backBtn.className = "back-btn";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => {
    window.location.href = "/strength";
  };
  root.appendChild(backBtn);
}
