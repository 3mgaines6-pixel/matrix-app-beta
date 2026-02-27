import { MACHINES } from "../data/machines.js";
import { getRotatedMachine } from "../data/rotation.js";

/* ============================================================
   MAIN MACHINE SCREEN (MODERNIZED UI)
============================================================ */

export function Machine(id) {
  const rotatedId = getRotatedMachine(id);
  const meta = MACHINES[rotatedId];

  const container = document.createElement("div");
  container.className = "machine-screen modern";

  const history = loadHistory(rotatedId);
  const last = history.length ? history[history.length - 1] : null;
  const suggested = computeSuggested(meta, last);

  /* Build UI */
  const setWrapper = renderSetInputs(suggested);

  /* -------------------------------
     CARD WRAPPER FOR RESET MOTION
  -------------------------------- */
  const card = document.createElement("div");
  card.className = "machine-card card";   // ⭐ card class added for animation

  card.append(
    renderTitle(meta, rotatedId),
    renderSubtitle(meta),
    renderTempo(meta),
    renderLastSession(last),
    renderSuggested(suggested),
    setWrapper,
    renderTimer(meta),
    renderHandleToggle(rotatedId),
    renderModeToggle(rotatedId),
    renderLogButton(rotatedId, suggested, setWrapper)
  );

  /* -------------------------------
     RESET BUTTON
  -------------------------------- */
  const resetBtn = document.createElement("button");
  resetBtn.className = "reset-button-modern";
  resetBtn.textContent = "Reset";

  resetBtn.onclick = () => {
  console.log("RESET TARGET:", card, card.className);
  window.runResetMotion(card);
};



  /* -------------------------------
     CLOSE BUTTON
  -------------------------------- */
  const closeBtn = renderCloseButton();

  container.append(card, resetBtn, closeBtn);
  return container;
}

/* ============================================================
   COMPONENTS (unchanged)
============================================================ */

function renderTitle(meta, id) {
  const el = document.createElement("h1");
  el.className = "machine-title";
  el.textContent = `#${id} ${meta.name}`;
  return el;
}

function renderSubtitle(meta) {
  const el = document.createElement("div");
  el.className = "machine-subtitle";
  el.textContent = `${meta.muscles} • ${meta.type} • ${meta.reps}`;
  return el;
}

function renderTempo(meta) {
  const wrapper = document.createElement("div");
  wrapper.className = "card-section";

  const row = document.createElement("div");
  row.className = "accordion-header";
  row.textContent = "Tempo ▸";

  const details = document.createElement("div");
  details.className = "accordion-body hidden";

  if (meta.type === "HEAVY") details.textContent = "3-1-2";
  if (meta.type === "LIGHT") details.textContent = "2-1-2";
  if (meta.type === "CORE")  details.textContent = "2-2-2";

  row.onclick = () => details.classList.toggle("hidden");

  wrapper.append(row, details);
  return wrapper;
}

function renderLastSession(last) {
  const el = document.createElement("div");
  el.className = "info-row";

  if (!last) {
    el.textContent = "Last: —";
    return el;
  }

  el.textContent = `Last: ${last.reps.join("/")} @ ${last.weight.join("/")} ${
    last.handle ? "(" + last.handle + ")" : ""
  }`;

  return el;
}

function renderSuggested(s) {
  const wrapper = document.createElement("div");
  wrapper.className = "suggested-box";

  const w = document.createElement("div");
  w.className = "info-row strong";
  w.textContent = `Suggested: ${s.weight}`;

  const msg = document.createElement("div");
  msg.className = "info-row";
  msg.textContent = s.message;

  wrapper.append(w, msg);
  return wrapper;
}

function renderSetInputs(suggested) {
  const wrapper = document.createElement("div");
  wrapper.className = "sets-grid";

  const inputs = [];

  for (let i = 1; i <= 3; i++) {
    const row = document.createElement("div");
    row.className = "set-row-modern";

    const reps = document.createElement("input");
    reps.type = "number";
    reps.placeholder = "Reps";

    const weight = document.createElement("input");
    weight.type = "number";
    weight.placeholder = suggested.weight;

    row.append(reps, weight);
    wrapper.append(row);
    inputs.push({ reps, weight });
  }

  wrapper.inputs = inputs;
  return wrapper;
}

function renderTimer(meta) {
  const wrapper = document.createElement("div");
  wrapper.className = "timer-card";

  let rest = meta.type === "HEAVY" ? 120 : meta.type === "CORE" ? 60 : 90;

  const display = document.createElement("div");
  display.className = "timer-display-modern";
  display.textContent = formatTime(rest);

  const btn = document.createElement("button");
  btn.className = "timer-btn-modern";
  btn.textContent = `Start ${formatTime(rest)}`;

  let interval = null;

  btn.onclick = () => {
    clearInterval(interval);
    let remaining = rest;

    interval = setInterval(() => {
      remaining--;
      display.textContent = formatTime(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        display.textContent = "00:00";
        btn.textContent = "Rest Complete";
      }
    }, 1000);
  };

  wrapper.append(display, btn);
  return wrapper;
}

function renderHandleToggle(id) {
  if (id !== 2 && id !== 6) return document.createComment("no handle toggle");

  const pos = localStorage.getItem(`handle-${id}`) || "inner";

  const btn = document.createElement("button");
  btn.className = "pill-toggle";
  btn.textContent = `Handle: ${pos}`;

  btn.onclick = () => {
    const next = btn.textContent.includes("inner") ? "outer" : "inner";
    btn.textContent = `Handle: ${next}`;
    localStorage.setItem(`handle-${id}`, next);
  };

  return btn;
}

function renderModeToggle(id) {
  if (id !== 9) return document.createComment("no mode toggle");

  const wrapper = document.createElement("div");
  wrapper.className = "mode-toggle";

  const select = document.createElement("select");
  select.className = "mode-select";

  ["Pec Fly", "Rear Delt"].forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    select.appendChild(opt);
  });

  select.value = localStorage.getItem("machine-9-mode") || "Pec Fly";

  select.onchange = () => {
    localStorage.setItem("machine-9-mode", select.value);
  };

  wrapper.append(select);
  return wrapper;
}

function renderLogButton(id, suggested, setWrapper) {
  const btn = document.createElement("button");
  btn.className = "log-btn-modern";
  btn.textContent = "Log Set";

  btn.onclick = () => {
    const inputs = setWrapper.inputs;

    const reps = inputs.map((s) => Number(s.reps.value || 0));
    const weight = inputs.map((s) => Number(s.weight.value || suggested.weight));

    const handle = localStorage.getItem(`handle-${id}`) || null;

    saveHistory(id, reps, weight, handle);
    window.renderScreen("StrengthStudio");
  };

  return btn;
}

function renderCloseButton() {
  const btn = document.createElement("button");
  btn.className = "close-btn-modern";
  btn.textContent = "Close";
  btn.onclick = () => window.renderScreen("StrengthStudio");
  return btn;
}

/* ============================================================
   HELPERS
============================================================ */

function formatTime(sec) {
  const m = String(Math.floor(sec / 60));
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

/* ============================================================
   HISTORY + SUGGESTED WEIGHT
============================================================ */

function loadHistory(id) {
  const raw = localStorage.getItem(`machine-${id}-history`);
  return raw ? JSON.parse(raw) : [];
}

function saveHistory(id, reps, weight, handle = null) {
  const key = `machine-${id}-history`;
  const history = JSON.parse(localStorage.getItem(key)) || [];

  history.push({ reps, weight, handle, date: Date.now() });
  localStorage.setItem(key, JSON.stringify(history));

  const strengthHistory = JSON.parse(localStorage.getItem("strength_history")) || [];

  let mode = null;
  if (id === 9) mode = localStorage.getItem("machine-9-mode") || "Pec Fly";

  strengthHistory.unshift({
    id,
    machineName: mode || MACHINES[id]?.name || `Machine #${id}`,
    sets: 1,
    reps,
    weight,
    date: Date.now()
  });

  localStorage.setItem("strength_history", JSON.stringify(strengthHistory));
}

function computeSuggested(meta, last) {
  const min = meta.min || 20;
  const type = meta.type;

  if (!last) return { weight: meta.base, message: "First session — use base weight." };

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

  return { weight: meta.base, message: "Default logic." };
}
