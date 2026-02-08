import { MACHINES } from "../data/machines.js";

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
  if (!entry || !entry.sets || entry.sets.length === 0) return "Last: None";

  const reps = entry.sets.map(s => s.reps || 0);
  const weights = entry.sets.map(s => s.weight || 0);
  const lastWeight = weights[weights.length - 1];

  return `Last: ${reps.join("/")} reps @ ${lastWeight}`;
}

function getSuggestedWeight(meta, lastEntry) {
  if (!lastEntry || !lastEntry.sets || lastEntry.sets.length === 0) {
    return meta.base ?? "—";
  }

  const type = meta.type;
  const reps = lastEntry.sets.map(s => Number(s.reps) || 0);
  const lastWeight = Number(lastEntry.sets[lastEntry.sets.length - 1].weight) || meta.base || 0;

  if (type === "CORE") {
    return lastWeight || meta.base || "—";
  }

  let top;
  if (type === "HEAVY") top = 8;
  else if (type === "LIGHT") top = 12;

  if (!top) return lastWeight || meta.base || "—";

  const allAtTop = reps.every(r => r >= top);

  if (!allAtTop) return lastWeight || meta.base || "—";

  if (type === "HEAVY") return lastWeight + 5;
  if (type === "LIGHT") return lastWeight + 2.5;

  return lastWeight || meta.base || "—";
}

export function Machine(id) {
  const meta = MACHINES[id];
  const container = document.createElement("div");
  container.className = "machine-screen";

  /* ---------- HEADER ---------- */
  const title = document.createElement("h1");
  title.className = "machine-title";
  title.textContent = `#${meta.id} ${meta.name}`;

  const subtitle = document.createElement("div");
  subtitle.className = "machine-subtitle";
  subtitle.textContent = `${meta.muscle} • ${meta.type} • 3×${meta.reps}`;

  /* ---------- TEMPO ---------- */
  const tempoRow = document.createElement("div");
  tempoRow.className = "tempo-row";

  const tempoLabel = document.createElement("span");
  tempoLabel.textContent = "Tempo ▸";

  const tempoValue = document.createElement("span");
  tempoValue.className = "hidden";
  tempoValue.textContent = meta.tempo || "";

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

  const suggestedRow = document.createElement("div");
  suggestedRow.className = "info-row";

  const history = loadHistory(meta.id);
  const lastEntry = history[history.length - 1];

  lastRow.textContent = formatLastSession(lastEntry);
  suggestedRow.textContent = `Suggested: ${getSuggestedWeight(meta, lastEntry)}`;

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

    const weight = document.createElement("input");
    weight.placeholder = "Weight";

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

  /* ---------- LOG + CLOSE ---------- */
  const logBtn = document.createElement("button");
  logBtn.className = "log-btn";
  logBtn.textContent = "Log Exercise";

  logBtn.onclick = () => {
    const rows = setsContainer.querySelectorAll(".set-row");
    const history = loadHistory(meta.id);

    const sets = [];
    rows.forEach((row, index) => {
      const repsInput = row.children[1];
      const weightInput = row.children[2];

      const repsVal = repsInput.value.trim();
      const weightVal = weightInput.value.trim();

      if (repsVal && weightVal) {
        sets.push({
          set: index + 1,
          reps: Number(repsVal),
          weight: Number(weightVal)
        });
      }
    });

    if (sets.length === 0) {
      alert("Enter reps + weight before logging.");
      return;
    }

    const entry = {
      date: new Date().toISOString(),
      sets
    };

    history.push(entry);
    saveHistory(meta.id, history);

    const last = history[history.length - 1];
    lastRow.textContent = formatLastSession(last);
    suggestedRow.textContent = `Suggested: ${getSuggestedWeight(meta, last)}`;

    alert("Exercise logged!");
    window.renderScreen("StrengthStudio");
  };

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
