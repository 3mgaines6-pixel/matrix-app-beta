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

  return `Last: ${reps} reps @ ${weights}`;
}

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
      safeMax: suggested + 5 // heavy jumps allowed up to +5
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

    // enforce minimum weight
    suggested = Math.max(suggested, minWeight);

    return {
      weight: suggested,
      safeMax: suggested + 2.5 // LIGHT should only jump 1 step
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

  // fallback
  return {
    weight: round25(topWeight),
    safeMax: round25(topWeight) + 5
  };
}



/* =========================================
   MAIN MACHINE SCREEN
========================================= */

export function Machine(id) {
  const meta = MACHINES[id];
  const history = loadHistory(id);
  const lastEntry = history[history.length - 1];

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
  suggestedRow.textContent = `Suggested: ${getSuggestedWeight(meta, lastEntry)}`;

/* ---------- SET INPUTS ---------- */
const setsContainer = document.createElement("div");
setsContainer.className = "sets-container";

for (let i = 1; i <= 3; i++) {
  const row = document.createElement("div");
  row.className = "set-row";

  const label = document.createElement("span");
  label.textContent = `Set ${i}`;

  // REPS INPUT — numeric keypad (no decimal)
  const reps = document.createElement("input");
  reps.placeholder = "Reps";
  reps.type = "text";
  reps.inputMode = "numeric";     // number pad only
  reps.pattern = "[0-9]*";        // whole numbers only

  // WEIGHT INPUT — decimal keypad (Matrix half-weights)
  const weight = document.createElement("input");
  weight.placeholder = "Weight";
  weight.type = "text";
  weight.inputMode = "decimal";   // number pad with decimal
  weight.pattern = "[0-9]*[.,]?[0-9]*"; // allows 2.5, 7.5, etc.

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

    history.push({ sets: newSets });
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

  return container;
}
