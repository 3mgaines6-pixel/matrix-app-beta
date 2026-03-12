import { MACHINES } from "../data/machines.js";

export default function Machine(props) {
  const { id, number, day } = props || {};
  const machine = MACHINES[id];

  const root = document.createElement("div");
  root.className = "strength-screen";

  /* -------------------------------
     SAFETY CHECK
  --------------------------------*/
  if (!machine) {
    const title = document.createElement("h1");
    title.className = "strength-title";
    title.textContent = "Machine not found";
    root.appendChild(title);

    const back = document.createElement("div");
    back.className = "gym-button";
    back.textContent = "← Back to Strength";
    back.onclick = () => window.renderScreen("StrengthStudio");
    root.appendChild(back);

    return root;
  }

  /* -------------------------------
     HEADER
  --------------------------------*/
  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = `${number}. ${machine.emoji} ${machine.name}`;
  root.appendChild(title);

  /* -------------------------------
     DAY LABEL
  --------------------------------*/
  const dayLabel = document.createElement("div");
  dayLabel.className = "machine-baseline";
  dayLabel.textContent = `Today: ${day}`;
  root.appendChild(dayLabel);

  /* -------------------------------
     MUSCLE + TYPE
  --------------------------------*/
  const subtitle = document.createElement("div");
  subtitle.className = "machine-baseline";
  subtitle.textContent = `${machine.muscle} • ${machine.type}`;
  root.appendChild(subtitle);

  /* -------------------------------
     CUE BAR
  --------------------------------*/
  const cue = document.createElement("div");
  cue.className = "cue-bar";
  cue.textContent = machine.cue || "";
  root.appendChild(cue);

  /* -------------------------------
     TEMPO (LOCKED)
  --------------------------------*/
  const tempo = document.createElement("div");
  tempo.className = "gym-button";
  tempo.textContent = machine.tempo || getTempo(machine.type);
  tempo.style.opacity = "0.5";
  tempo.style.pointerEvents = "none";
  root.appendChild(tempo);

  /* -------------------------------
     SET INPUT CARDS (3 SETS)
  --------------------------------*/
  const setsContainer = document.createElement("div");
  setsContainer.className = "sets-container";

  const setInputs = [];

  for (let i = 1; i <= 3; i++) {
    const card = document.createElement("div");
    card.className = "machine-card";

    const label = document.createElement("div");
    label.className = "machine-name";
    label.textContent = `Set ${i}`;
    card.appendChild(label);

    const weight = document.createElement("input");
    weight.className = "input-box";
    weight.placeholder = "Weight (lbs)";
    weight.value = machine.baseline || "";
    card.appendChild(weight);

    const reps = document.createElement("input");
    reps.className = "input-box";
    reps.placeholder = "Reps";
    card.appendChild(reps);

    setInputs.push({ weight, reps });
    setsContainer.appendChild(card);
  }

  root.appendChild(setsContainer);

  /* -------------------------------
     SAVE SET BUTTON
  --------------------------------*/
  const saveBtn = document.createElement("div");
  saveBtn.className = "gym-button";
  saveBtn.textContent = "Save Sets";
  root.appendChild(saveBtn);

  /* -------------------------------
     HISTORY SECTION
  --------------------------------*/
  const historyCard = document.createElement("div");
  historyCard.className = "machine-card";
  historyCard.innerHTML = `
    <div class="machine-name">Today's Sets</div>
    <div class="machine-baseline" id="today-sets">No sets logged yet.</div>
    <br>
    <div class="machine-name">Last Workout</div>
    <div class="machine-baseline" id="last-sets">No previous workout logged.</div>
  `;
  root.appendChild(historyCard);

  /* -------------------------------
     GRIP TOGGLE
  --------------------------------*/
  if (machine.grips) {
    const gripBtn = document.createElement("div");
    gripBtn.className = "gym-button";
    let gripIndex = 0;
    const gripOptions = ["Inner", "Outer"];

    gripBtn.textContent = `Grip: ${gripOptions[gripIndex]}`;

    gripBtn.onclick = () => {
      gripIndex = (gripIndex + 1) % gripOptions.length;
      gripBtn.textContent = `Grip: ${gripOptions[gripIndex]}`;
    };

    root.appendChild(gripBtn);
  }

  /* -------------------------------
     REST TIMER
  --------------------------------*/
  const timerBtn = newElement("div", "gym-button", "Start Rest Timer");
  root.appendChild(timerBtn);

  const timerLabel = newElement("div", "machine-baseline", "");
  root.appendChild(timerLabel);

  let timerInterval = null;
  let remaining = 0;

  timerBtn.onclick = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerBtn.textContent = "Start Rest Timer";
      timerLabel.textContent = "";
      return;
    }

    remaining = 60;
    timerBtn.textContent = "Stop Rest Timer";
    timerLabel.textContent = `Rest: ${remaining}s`;

    timerInterval = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerBtn.textContent = "Start Rest Timer";
        timerLabel.textContent = "Rest complete";
      } else {
        timerLabel.textContent = `Rest: ${remaining}s`;
      }
    }, 1000);
  };

  /* -------------------------------
     SUGGESTED WEIGHT
  --------------------------------*/
  const suggested = document.createElement("div");
  suggested.className = "machine-baseline";
  suggested.textContent = `Suggested Weight: ${
    machine.baseline ? machine.baseline + " lbs" : "—"
  }`;
  root.appendChild(suggested);

  /* -------------------------------
     SAVE LOGIC
  --------------------------------*/
  saveBtn.onclick = () => {
    const todayKey = `history_${id}_today`;
    const lastKey = `history_${id}_last`;

    const todaySets = [];

    setInputs.forEach(({ weight, reps }) => {
      if (weight.value && reps.value) {
        todaySets.push(`${weight.value} × ${reps.value}`);
      }
    });

    if (todaySets.length === 0) return;

    const prevToday = localStorage.getItem(todayKey);
    if (prevToday) {
      localStorage.setItem(lastKey, prevToday);
    }

    localStorage.setItem(todayKey, JSON.stringify(todaySets));
    renderHistory();
  };

  /* -------------------------------
     HISTORY RENDERING
  --------------------------------*/
  function renderHistory() {
    const todayKey = `history_${id}_today`;
    const lastKey = `history_${id}_last`;

    const todayEl = historyCard.querySelector("#today-sets");
    const lastEl = historyCard.querySelector("#last-sets");

    const todayData = JSON.parse(localStorage.getItem(todayKey) || "[]");
    const lastData = JSON.parse(localStorage.getItem(lastKey) || "[]");

    todayEl.textContent =
      todayData.length > 0 ? todayData.join("\n") : "No sets logged yet.";

    lastEl.textContent =
      lastData.length > 0 ? lastData.join("\n") : "No previous workout logged.";
  }

  renderHistory();

  /* -------------------------------
     BACK BUTTON
  --------------------------------*/
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back to Strength";
  back.onclick = () => window.renderScreen("StrengthStudio");
  root.appendChild(back);

  return root;
}

/* -------------------------------
   TEMPO DEFAULTS
--------------------------------*/
function getTempo(type) {
  if (type === "Heavy") return "3-1-2";
  if (type === "Core") return "2-2-2";
  return "2-1-2";
}

/* -------------------------------
   SMALL HELPER
--------------------------------*/
function newElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}
