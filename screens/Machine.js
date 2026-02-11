import { MACHINES } from "../data/machines.js";

/* =========================================
   HISTORY HELPERS
========================================= */

function getHistoryKey(id) {
  return `machine-${id}`;
}

function loadHistory(id) {
  const raw = localStorage.getItem(getHistoryKey(id));
  return raw ? JSON.parse(raw) : [];
}

function saveHistory(id, history) {
  localStorage.setItem(getHistoryKey(id), JSON.stringify(history));
}

function formatLastSession(entry) {
  if (!entry || !entry.sets || entry.sets.length === 0) {
    return "Last: None";
  }

  const reps = entry.sets.map(s => s.reps).join("/");
  const weights = entry.sets.map(s => s.weight).join("/");

  const handle = entry.handle ? ` (${entry.handle})` : "";
return `Last: ${reps} reps @ ${weights}${handle}`;


/* =========================================
   SMART SUGGESTED WEIGHT ENGINE
========================================= */

function getSuggestedWeight(meta, lastEntry) {
  if (!lastEntry || !lastEntry.sets || lastEntry.sets.length === 0) {
    return { weight: meta.base ?? 0, safeMax: (meta.base ?? 0) + 5 };
  }

  const type = meta.type; // HEAVY, LIGHT, CORE
  const reps = lastEntry.sets.map(s => Number(s.reps) || 0);
  const weights = lastEntry.sets.map(s => Number(s.weight) || 0);

  const topWeight = Math.max(...weights);
  const avgReps = reps.reduce((a, b) => a + b, 0) / reps.length;

  const round25 = (n) => Math.round(n / 2.5) * 2.5;
  const minWeight = meta.base ?? 0;

  let suggested = topWeight;

  // -------------------------
  // HEAVY LOGIC (6–8 reps)
  // -------------------------
  if (type === "HEAVY") {
    const minReps = Math.min(...reps);
    const maxReps = Math.max(...reps);

    if (minReps >= 8) {
      suggested = round25(topWeight + 5);
    } else if (minReps >= 6) {
      suggested = round25(topWeight);
    } else if (maxReps < 3) {
      suggested = round25(topWeight - 2.5);
    } else {
      suggested = round25(topWeight);
    }

    return {
      weight: suggested,
      safeMax: suggested + 5
    };
  }

  // -------------------------
  // LIGHT LOGIC (10–12 reps)
  // -------------------------
  if (type === "LIGHT") {
    if (avgReps >= 12) {
      suggested = round25(topWeight);
    } else if (avgReps >= 10) {
      suggested = round25(topWeight);
    } else {
      suggested = round25(topWeight - 2.5);
    }

    suggested = Math.max(suggested, minWeight);

    return {
      weight: suggested,
      safeMax: suggested + 2.5
    };
  }

  // -------------------------
  // CORE LOGIC
  // -------------------------
  if (type === "CORE") {
    suggested = round25(topWeight);
    suggested = Math.max(suggested, minWeight);

    return {
      weight: suggested,
      safeMax: suggested + 2.5
    };
  }

  return {
    weight: round25(topWeight),
    safeMax: round25(topWeight) + 5
  };
}

/* =========================================
   MAIN MACHINE SCREEN
========================================= */
function getProgressionMessage(meta, lastEntry) {
  if (!lastEntry || !lastEntry.sets || lastEntry.sets.length === 0) {
    return "No previous data — start strong today.";
  }

  const type = meta.type;
  const reps = lastEntry.sets.map(s => Number(s.reps) || 0);
  const minReps = Math.min(...reps);
  const maxReps = Math.max(...reps);
  const avgReps = reps.reduce((a, b) => a + b, 0) / reps.length;

  // HEAVY (6–8)
  if (type === "HEAVY") {
    if (minReps >= 8) return "Strong session — increase next time.";
    if (minReps >= 6) return "Weight maintained — solid work.";
    if (maxReps < 3) return "Deload recommended — reps too low.";
    return "Stay at this weight — keep building.";
  }

  // LIGHT (10–12)
  if (type === "LIGHT") {
    if (avgReps >= 10) return "Perfect range — keep the same weight.";
    return "Below target — deload slightly.";
  }

  // CORE
  if (type === "CORE") {
    return "Maintain weight — focus on control.";
  }

  return "";
}

export function Machine(id) {
  const meta = MACHINES[id];
  const history = loadHistory(id);
  const lastEntry = history[history.length - 1];

  const suggestion = getSuggestedWeight(meta, lastEntry);

  const container = document.createElement("div");
  container.className = "machine-screen";

  /* ---------- HEADER ---------- */
  const title = document.createElement("h1");
  title.className = "machine-title";
  title.textContent = `#${id} ${meta.name}`;

  const subtitle = document.createElement("div");
  subtitle.className = "machine-subtitle";
  subtitle.textContent = `${meta.muscle} • ${meta.type} • ${meta.reps}`;

  /* ---------- TEMPO ---------- */
  const tempoRow = document.createElement("div");
  tempoRow.className = "tempo-row";

  const tempoLabel = document.createElement("span");
  tempoLabel.textContent = "Tempo ▸";

  const tempoValue = document.createElement("span");
  tempoValue.className = "hidden";
  tempoValue.textContent = meta.tempo;

  tempoRow.appendChild(tempoLabel);
  tempoRow.appendChild(tempoValue);

  tempoRow.onclick = () => {
    tempoValue.classList.toggle("hidden");
    tempoLabel.textContent = tempoValue.classList.contains("hidden")
      ? "Tempo ▸"
      : "Tempo ▾";
  };

  /* ---------- LAST + SUGGESTED ---------- */
  const lastRow = document.createElement("div");
  lastRow.className = "info-row";
  lastRow.textContent = formatLastSession(lastEntry);

  const suggestedRow = document.createElement("div");
  suggestedRow.className = "info-row";
  suggestedRow.textContent = `Suggested: ${suggestion.weight}`;
const messageRow = document.createElement("div");
messageRow.className = "info-row";
messageRow.textContent = getProgressionMessage(meta, lastEntry);
/* ---------- HANDLE TOGGLE (ONLY FOR MACHINES 2 & 6) ---------- */
let handleChoice = "inner"; // default

let handleRow = null;
if (id === 2 || id === 6) {
  handleRow = document.createElement("div");
  handleRow.className = "info-row";
  handleRow.style.display = "flex";
  handleRow.style.justifyContent = "space-between";
  handleRow.style.alignItems = "center";

  const label = document.createElement("span");
  label.textContent = "Handle Position";

  const toggle = document.createElement("select");
  toggle.style.padding = "6px";
  toggle.style.borderRadius = "6px";
  toggle.style.background = "rgba(255,255,255,0.1)";
  toggle.style.color = "white";
  toggle.style.border = "1px solid rgba(255,255,255,0.2)";

  const optInner = document.createElement("option");
  optInner.value = "inner";
  optInner.textContent = "Inner";

  const optOuter = document.createElement("option");
  optOuter.value = "outer";
  optOuter.textContent = "Outer";

  toggle.appendChild(optInner);
  toggle.appendChild(optOuter);

  // Load last handle choice if available
  if (lastEntry && lastEntry.handle) {
    toggle.value = lastEntry.handle;
    handleChoice = lastEntry.handle;
  }

  toggle.onchange = () => {
    handleChoice = toggle.value;
  };

  handleRow.appendChild(label);
  handleRow.appendChild(toggle);
}

  /* ---------- SET INPUTS ---------- */
  const setsContainer = document.createElement("div");
  setsContainer.className = "sets-container";

  for (let i = 1; i <= 3; i++) {
  const row = document.createElement("div");
  row.className = "set-row";

  const label = document.createElement("span");
  label.textContent = `Set ${i}`;

  const reps = document.createElement("input");
  reps.placeholder = "Reps";
  reps.type = "text";
  reps.inputMode = "numeric";
  reps.pattern = "[0-9]*";

  const weight = document.createElement("input");
  weight.placeholder = "Weight";
  weight.type = "text";
  weight.inputMode = "decimal";
  weight.pattern = "[0-9]*[.,]?[0-9]*";

  // ⭐ AUTO-FILL SUGGESTED WEIGHT ⭐
  weight.value = suggestion.weight;

  // ⭐ RED WARNING FOR TOO-HEAVY JUMPS ⭐
  weight.addEventListener("input", () => {
    const entered = Number(weight.value);
    if (entered > suggestion.safeMax) {
      weight.classList.add("danger");
    } else {
      weight.classList.remove("danger");
    }
  });

  row.appendChild(label);
  row.appendChild(reps);
  row.appendChild(weight);

  setsContainer.appendChild(row);
}


  /* ---------- REST TIMER ---------- */
  const timerBtn = document.createElement("button");
  timerBtn.className = "timer-btn";
  timerBtn.textContent = "Start Rest Timer";

  const timerDisplay = document.createElement("div");
  timerDisplay.className = "timer-display";
  timerDisplay.textContent = "00:00";

  let timerInterval = null;
  timerBtn.onclick = () => {
    let seconds = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      seconds++;
      const m = String(Math.floor(seconds / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      timerDisplay.textContent = `${m}:${s}`;
    }, 1000);
  };

  /* ---------- LOG EXERCISE ---------- */
  const logBtn = document.createElement("button");
  logBtn.className = "log-btn";
  logBtn.textContent = "Log Exercise";

  logBtn.onclick = () => {
    const rows = setsContainer.querySelectorAll(".set-row");
    const newSets = [];

    rows.forEach((row, index) => {
      const reps = row.children[1].value;
      const weight = row.children[2].value;

      if (reps && weight) {
        newSets.push({
          set: index + 1,
          reps,
          weight,
          date: new Date().toISOString()
        });
      }
    });

    if (newSets.length === 0) {
      alert("Enter reps + weight before logging.");
      return;
    }

    history.push({
  sets: newSets,
  handle: handleChoice
});

    saveHistory(id, history);

    alert("Exercise logged!");
    window.renderScreen("StrengthStudio");
  };

  /* ---------- CLOSE BUTTON ---------- */
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";
  closeBtn.onclick = () => window.renderScreen("StrengthStudio");

  /* ---------- APPEND EVERYTHING ---------- */
  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(tempoRow);
  container.appendChild(lastRow);
  container.appendChild(suggestedRow);
  container.appendChild(setsContainer);
  container.appendChild(timerBtn);
  container.appendChild(timerDisplay);
  container.appendChild(logBtn);
  container.appendChild(closeBtn);
container.appendChild(lastRow);
container.appendChild(suggestedRow);
container.appendChild(messageRow);   
   if (handleRow) container.appendChild(handleRow);


   container.appendChild(setsContainer);

  return container;
}
