import { MACHINES } from "../data/machines.js";
import { getRotatedMachine } from "../data/rotation.js";

export function Machine(id) {
  const rotatedId = getRotatedMachine(id);
  const meta = MACHINES[rotatedId];

  const container = document.createElement("div");
  container.className = "machine-screen";

  /* ---------- TITLE ---------- */
  const title = document.createElement("h1");
  title.className = "machine-title";
  title.textContent = `#${rotatedId} ${meta.name}`;

  const subtitle = document.createElement("div");
  subtitle.className = "machine-subtitle";
  subtitle.textContent = `${meta.muscles} • ${meta.type} • ${meta.reps}`;

  /* ---------- TEMPO ---------- */
  const tempoRow = document.createElement("div");
  tempoRow.className = "tempo-row";
  tempoRow.textContent = `Tempo ▸`;

  const tempoDetails = document.createElement("div");
  tempoDetails.className = "info-row hidden";

  if (meta.type === "HEAVY") tempoDetails.textContent = "3-1-2";
  if (meta.type === "LIGHT") tempoDetails.textContent = "2-1-2";
  if (meta.type === "CORE") tempoDetails.textContent = "2-2-2";

  tempoRow.onclick = () => {
    tempoDetails.classList.toggle("hidden");
  };

  /* ---------- LAST SESSION ---------- */
  const history = loadHistory(rotatedId);
  const last = history.length > 0 ? history[history.length - 1] : null;

  const lastRow = document.createElement("div");
  lastRow.className = "info-row";
  lastRow.textContent = last
    ? `Last: ${last.reps.join("/")} @ ${last.weight.join("/")} ${last.handle ? "(" + last.handle + ")" : ""}`
    : "Last: —";

  /* ---------- SUGGESTED WEIGHT ---------- */
  const suggested = computeSuggested(meta, last);

  const suggestedRow = document.createElement("div");
  suggestedRow.className = "info-row";
  suggestedRow.textContent = `Suggested: ${suggested.weight}`;

  const msg = document.createElement("div");
  msg.className = "info-row";
  msg.textContent = suggested.message;

  /* ---------- SET INPUTS ---------- */
  const setsContainer = document.createElement("div");
  setsContainer.className = "sets-container";

  const setInputs = [];

  for (let i = 1; i <= 3; i++) {
    const row = document.createElement("div");
    row.className = "set-row";

    const reps = document.createElement("input");
    reps.placeholder = `Reps`;
    reps.type = "number";

    const weight = document.createElement("input");
    weight.placeholder = suggested.weight;
    weight.type = "number";

    row.appendChild(reps);
    row.appendChild(weight);

    setInputs.push({ reps, weight });
    setsContainer.appendChild(row);
  }

  /* ---------- REST TIMER ---------- */
  const timerBtn = document.createElement("button");
  timerBtn.className = "timer-btn";

  let restSeconds = 90;
  if (meta.type === "HEAVY") restSeconds = 120;
  if (meta.type === "LIGHT") restSeconds = 90;
  if (meta.type === "CORE") restSeconds = 60;

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(1, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  timerBtn.textContent = `Start ${formatTime(restSeconds)} Rest`;

  const timerDisplay = document.createElement("div");
  timerDisplay.className = "timer-display";
  timerDisplay.textContent = formatTime(restSeconds);

  let timerInterval = null;

  timerBtn.onclick = () => {
    clearInterval(timerInterval);
    let remaining = restSeconds;

    timerDisplay.textContent = formatTime(remaining);

    timerInterval = setInterval(() => {
      remaining--;

      if (remaining <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = "00:00";
        timerBtn.textContent = "Rest Complete";
        return;
      }

      timerDisplay.textContent = formatTime(remaining);
    }, 1000);
  };

  /* ---------- HANDLE TOGGLE (MACHINES 2 & 6) ---------- */
  let handlePosition = localStorage.getItem(`handle-${rotatedId}`) || "inner";

  if (rotatedId === 2 || rotatedId === 6) {
    const toggle = document.createElement("button");
    toggle.className = "toggle-btn";
    toggle.textContent = `Handle: ${handlePosition}`;

    toggle.onclick = () => {
      handlePosition = handlePosition === "inner" ? "outer" : "inner";
      toggle.textContent = `Handle: ${handlePosition}`;
      localStorage.setItem(`handle-${rotatedId}`, handlePosition);
    };

    container.appendChild(toggle);
  }

  /* ---------- PEC FLY / REAR DELT MODE (MACHINE 9) ---------- */
  if (rotatedId === 9) {
    const modeLabel = document.createElement("label");
    modeLabel.textContent = "Mode:";
    modeLabel.className = "toggle-label";

    const modeSelect = document.createElement("select");
    modeSelect.className = "toggle-select";

    const opt1 = document.createElement("option");
    opt1.value = "Pec Fly";
    opt1.textContent = "Pec Fly";

    const opt2 = document.createElement("option");
    opt2.value = "Rear Delt";
    opt2.textContent = "Rear Delt";

    modeSelect.appendChild(opt1);
    modeSelect.appendChild(opt2);

    const lastMode = localStorage.getItem("machine-9-mode") || "Pec Fly";
    modeSelect.value = lastMode;

    modeSelect.onchange = () => {
      localStorage.setItem("machine-9-mode", modeSelect.value);
    };

    container.appendChild(modeLabel);
    container.appendChild(modeSelect);
  }

  /* ---------- LOG BUTTON ---------- */
  const logBtn = document.createElement("button");
  logBtn.className = "log-btn";
  logBtn.textContent = "Log Set";

  logBtn.onclick = () => {
    const reps = setInputs.map(s => Number(s.reps.value || 0));
    const weight = setInputs.map(s => Number(s.weight.value || suggested.weight));

    saveHistory(rotatedId, reps, weight, handlePosition);

    window.renderScreen("StrengthStudio");
  };

  /* ---------- CLOSE BUTTON ---------- */
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";
  closeBtn.onclick = () => window.renderScreen("StrengthStudio");

  /* ---------- APPEND ELEMENTS (NO DUPLICATES) ---------- */
  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(tempoRow);
  container.appendChild(tempoDetails);
  container.appendChild(lastRow);
  container.appendChild(suggestedRow);
  container.appendChild(msg);
  container.appendChild(setsContainer);
  container.appendChild(timerBtn);
  container.appendChild(timerDisplay);
  container.appendChild(logBtn);
  container.appendChild(closeBtn);

  return container;
}

/* ==========================================================
   LOAD / SAVE FULL HISTORY
============================================================ */

function loadHistory(id) {
  const key = `machine-${id}-history`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

function saveHistory(id, reps, weight, handle = null) {
  const key = `machine-${id}-history`;
  const history = JSON.parse(localStorage.getItem(key)) || [];

  history.push({
    reps,
    weight,
    handle,
    date: Date.now()
  });

  localStorage.setItem(key, JSON.stringify(history));

  /* ---------- GLOBAL STRENGTH HISTORY ---------- */
  const strengthHistory = JSON.parse(localStorage.getItem("strength_history")) || [];

  let mode = null;
  if (id === 9) {
    mode = localStorage.getItem("machine-9-mode") || "Pec Fly";
  }

  strengthHistory.unshift({
    id,
    machineName: mode ? mode : MACHINES[id]?.name || `Machine #${id}`,
    sets: 1,
    reps,
    weight,
    date: Date.now()
  });

  localStorage.setItem("strength_history", JSON.stringify(strengthHistory));
}

/* ============================================================
   SUGGESTED WEIGHT ENGINE
============================================================ */

function computeSuggested(meta, last) {
  const min = meta.min || 20;
  const type = meta.type;

  if (!last) {
    return {
      weight: meta.base,
      message: "First session — use base weight."
    };
  }

  const avgReps = last.reps.reduce((a, b) => a + b, 0) / last.reps.length;
  const topWeight = last.weight[last.weight.length - 1];

  if (type === "HEAVY") {
    if (avgReps >= 8) return { weight: topWeight + 5, message: "Strong session — increase 5 lbs." };
    if (avgReps < 6) return { weight: Math.max(min, topWeight - 5), message: "Below range — deload 5 lbs." };
    return { weight: topWeight, message: "Perfect range — keep the same weight." };
  }

  if (type === "LIGHT") {
    if (avgReps >= 10 && avgReps <= 12) return { weight: topWeight, message: "Perfect range — keep the same weight." };
    if (avgReps < 10) return { weight: Math.max(min, topWeight - 2.5), message: "Below range — reduce 2.5 lbs." };
    return { weight: topWeight, message: "Stay consistent — no increase for LIGHT." };
  }

  if (type === "CORE") {
    return { weight: topWeight, message: "Core movement — keep consistent." };
  }

  return {
    weight: meta.base,
    message: "Default logic."
  };
}
