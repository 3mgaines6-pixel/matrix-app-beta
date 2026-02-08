/* =========================================
   ==========  MACHINE 12 — SEATED LEG CURL
   ========================================= */

export function Machine12() {
  const container = document.createElement("div");
  container.className = "machine-screen";

  /* ---------- HEADER ---------- */
  const title = document.createElement("h1");
  title.className = "machine-title";
  title.textContent = "#12 SEATED LEG CURL";

  const subtitle = document.createElement("div");
  subtitle.className = "machine-subtitle";
  subtitle.textContent = "Hamstrings • LIGHT • 3×10–12";

  /* ---------- TEMPO ---------- */
  const tempoRow = document.createElement("div");
  tempoRow.className = "tempo-row";

  const tempoLabel = document.createElement("span");
  tempoLabel.id = "tempo-label-12";
  tempoLabel.textContent = "Tempo ▸";

  const tempoValue = document.createElement("span");
  tempoValue.id = "tempo-value-12";
  tempoValue.className = "hidden";
  tempoValue.textContent = "2-1-2";

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
  lastRow.textContent = "Last: None";

  const suggestedRow = document.createElement("div");
  suggestedRow.className = "info-row";
  suggestedRow.textContent = "Suggested: —";

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
  timerDisplay.id = "timer-display-12";
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

