import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";
import { RULES } from "../data/rules.js";
import { loadHistory, saveHistory, getLastSession } from "../utils/history.js";

export default function Machine(data) {
  const id = data?.id;
  const index = data?.number;
  const day = data?.day;

  if (!id || !MACHINES[id]) {
    const fallback = document.createElement("div");
    fallback.textContent = "Machine not found.";
    return fallback;
  }

  const m = MACHINES[id];
  const type = m.type;
  const repTarget = RULES[type].top;

  /* -----------------------------------------
     ROOT
  ----------------------------------------- */
  const root = document.createElement("div");
  root.id = "machine-root";

  /* -----------------------------------------
     LOAD HISTORY
  ----------------------------------------- */
  const last = getLastSession(m.number, type);
  const lastSets = last ? last.sets : [];

  /* -----------------------------------------
     HEADER
  ----------------------------------------- */
  const header = document.createElement("div");
  header.className = "machine-header";
  header.innerHTML = `
    <div class="machine-title">#${m.number} ${m.name}</div>
    <div class="machine-sub">${m.muscle} • ${type}</div>
  `;
  root.appendChild(header);

  /* -----------------------------------------
     LAST SESSION BOX
  ----------------------------------------- */
  const lastBox = document.createElement("div");
  lastBox.className = "machine-last-box";

  if (last) {
    const formatted = lastSets.map(s => `${s.reps}@${s.weight}`).join(", ");
    const date = new Date(last.time).toLocaleDateString();
    lastBox.textContent = `Last (${date}): ${formatted}`;
  } else {
    lastBox.textContent = "Last: —";
  }

  root.appendChild(lastBox);

  /* -----------------------------------------
     REP TARGETS + TEMPO
  ----------------------------------------- */
  const repTargets = {
    HEAVY: "6–8 reps • Tempo 3‑1‑2",
    LIGHT: "10–12 reps • Tempo 2‑1‑2",
    CORE: "12–15 reps • Tempo 2‑2‑2"
  };

  const cueBox = document.createElement("div");
  cueBox.className = "machine-cue-box";
  cueBox.textContent = repTargets[type];
  root.appendChild(cueBox);

  /* -----------------------------------------
     TODAY'S SETS (3 VISIBLE)
  ----------------------------------------- */
  let todaySets = [null, null, null];

  const setList = document.createElement("div");
  setList.className = "set-list";
  root.appendChild(setList);

  function renderSets() {
    setList.innerHTML = "";

    todaySets.forEach((s, i) => {
      const row = document.createElement("div");
      row.className = "set-row";

      const label = document.createElement("div");
      label.className = "set-label";
      label.textContent = `Set ${i + 1}`;
      row.appendChild(label);

      const weightInput = document.createElement("input");
      weightInput.type = "number";
      weightInput.placeholder = "Weight";
      weightInput.className = "set-input";

      const repsInput = document.createElement("input");
      repsInput.type = "number";
      repsInput.placeholder = "Reps";
      repsInput.className = "set-input";

      // Auto-fill weight
      if (lastSets[i]) {
        weightInput.value = lastSets[i].weight;
      } else if (lastSets.length > 0) {
        weightInput.value = lastSets[lastSets.length - 1].weight;
      } else if (m.baseline) {
        weightInput.value = m.baseline;
      }

      // If already logged, show values
      if (s) {
        weightInput.value = s.weight;
        repsInput.value = s.reps;
      }

      const logBtn = document.createElement("button");
      logBtn.textContent = "Log Set";

      logBtn.onclick = () => {
        const w = Number(weightInput.value);
        const r = Number(repsInput.value);

        if (!w || !r) return;

        // Heavy weight warning
        if (lastSets.length > 0) {
          const lastW = lastSets[lastSets.length - 1].weight;
          if (w > lastW + 20) {
            alert("⚠️ That jump is too heavy — protect your joints.");
            return;
          }
        }

        todaySets[i] = { weight: w, reps: r };

        // Coaching cues
        if (r >= repTarget) {
          alert("🔥 Strong set — pushing the top of the range.");
        } else if (r >= repTarget - 1) {
          alert("💪 Good control — stay tight on tempo.");
        } else {
          alert("Keep it clean — focus on form.");
        }

        // Auto-complete after 3 sets
        if (todaySets.filter(Boolean).length === 3) {
          saveHistory(id, type, {
            time: Date.now(),
            sets: todaySets
          });
          alert("✔ Machine complete");
          window.renderScreen("StrengthStudio");
        }
      };

      row.appendChild(weightInput);
      row.appendChild(repsInput);
      row.appendChild(logBtn);

      setList.appendChild(row);
    });
  }

  renderSets();

  /* -----------------------------------------
     DELETE ALL
  ----------------------------------------- */
  const delAll = document.createElement("div");
  delAll.className = "delete-all-btn";
  delAll.textContent = "Delete All Sets";

  delAll.onclick = () => {
    todaySets = [null, null, null];
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
    if (todaySets.filter(Boolean).length > 0) {
      saveHistory(id, type, {
        time: Date.now(),
        sets: todaySets.filter(Boolean)
      });
    }

    const machineIds = WEEKLY[day].machines;
    const nextId = machineIds[index];

    if (!nextId) return;

    window.renderScreen("Machine", {
      id: nextId,
      number: index + 1,
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
    if (todaySets.filter(Boolean).length > 0) {
      saveHistory(id, type, {
        time: Date.now(),
        sets: todaySets.filter(Boolean)
      });
    }
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
