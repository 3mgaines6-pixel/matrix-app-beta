/* ================================================
   MACHINE SCREEN — BLUE HEADER + CUE BAR + SAFETY
================================================ */

import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function Machine(id) {
  const machine = MACHINES[id];

  /* SAFETY: If machine is missing, prevent crash */
  if (!machine) {
    const error = document.createElement("div");
    error.className = "screen";
    error.innerHTML = `
      <div class="header">Error</div>
      <div class="card-base">Machine ID "${id}" not found.</div>
      <div class="gym-button" onclick="window.renderScreen('StrengthStudio')">← Back</div>
    `;
    return error;
  }

  const container = document.createElement("div");
  container.className = "screen strength-bg";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = `${id} — ${machine.emoji} ${machine.name}`;
  container.appendChild(header);

  /* COACHING CUE BAR */
  const cue = document.createElement("div");
  cue.className = "cue-bar";
  cue.textContent = machine.cue || "Focus on controlled reps and full ROM.";
  container.appendChild(cue);

  /* LOAD HISTORY */
  const history = JSON.parse(localStorage.getItem("history") || "{}");
  const sets = history[id] || [];
  const last = sets[sets.length - 1];

  /* LAST SESSION CARD */
  const lastCard = document.createElement("div");
  lastCard.className = "card-base";

  if (last) {
    const date = new Date(last.date).toLocaleDateString();
    lastCard.innerHTML = `
      <div class="weekly-title">Last Session</div>
      <div class="weekly-sub">${last.weight} lbs × ${last.reps} reps — ${date}</div>
    `;
  } else {
    lastCard.innerHTML = `<div class="weekly-title">No previous sets</div>`;
  }

  container.appendChild(lastCard);

  /* SUGGESTED WEIGHT */
  let suggested = null;

  if (machine.suggestedHeavy || machine.suggestedLight) {
    suggested = machine.suggestedHeavy || machine.suggestedLight;
  } else if (last) {
    if (last.reps < 6) suggested = last.weight;
    else if (last.reps <= 10) suggested = last.weight + 5;
    else suggested = last.weight + 10;
  }

  if (suggested) {
    const suggestCard = document.createElement("div");
    suggestCard.className = "card-base";
    suggestCard.innerHTML = `
      <div class="weekly-title">Suggested Weight</div>
      <div class="weekly-sub">${suggested} lbs</div>
    `;
    container.appendChild(suggestCard);
  }

  /* HEAVY WEIGHT WARNING */
  function checkWarning(w) {
    if (!suggested) return null;
    if (w > suggested + 20) {
      return "⚠️ That jump is too heavy — reduce weight for joint safety.";
    }
    return null;
  }

  /* INPUTS */
  const weight = document.createElement("input");
  weight.className = "input-box";
  weight.placeholder = "Weight (lbs)";

  const reps = document.createElement("input");
  reps.className = "input-box";
  reps.placeholder = "Reps";

  container.appendChild(weight);
  container.appendChild(reps);

  /* WARNING BAR */
  const warningBar = document.createElement("div");

  weight.oninput = () => {
    const w = Number(weight.value);
    const msg = checkWarning(w);

    if (msg) {
      warningBar.className = "warning-bar";
      warningBar.textContent = msg;
      if (!container.contains(warningBar)) container.insertBefore(warningBar, weight);
    } else {
      if (container.contains(warningBar)) container.removeChild(warningBar);
    }
  };

  /* SAVE SET BUTTON */
  const save = document.createElement("div");
  save.className = "button";
  save.textContent = "Save Set";

  save.onclick = () => {
    const w = Number(weight.value);
    const r = Number(reps.value);
    if (!w || !r) return;

    const entry = { weight: w, reps: r, date: new Date().toISOString() };

    const h = JSON.parse(localStorage.getItem("history") || "{}");
    h[id] = h[id] || [];
    h[id].push(entry);
    localStorage.setItem("history", JSON.stringify(h));

    window.renderScreen("Machine", id);
  };

  container.appendChild(save);

  /* SET HISTORY LIST */
  if (sets.length > 0) {
    const list = document.createElement("div");
    list.className = "set-history";

    sets.forEach((s, index) => {
      const item = document.createElement("div");
      item.className = "set-item";

      const date = new Date(s.date).toLocaleDateString();

      item.innerHTML = `<div>${s.weight} lbs × ${s.reps} reps — ${date}</div>`;

      const del = document.createElement("div");
      del.className = "delete-set";
      del.textContent = "Delete";
      del.onclick = () => {
        sets.splice(index, 1);
        history[id] = sets;
        localStorage.setItem("history", JSON.stringify(history));
        window.renderScreen("Machine", id);
      };

      item.appendChild(del);
      list.appendChild(item);
    });

    container.appendChild(list);

    /* DELETE ALL BUTTON */
    const delAll = document.createElement("div");
    delAll.className = "delete-all";
    delAll.textContent = "Delete All Sets";

    delAll.onclick = () => {
      if (confirm("Delete all sets for this machine?")) {
        history[id] = [];
        localStorage.setItem("history", JSON.stringify(history));
        window.renderScreen("Machine", id);
      }
    };

    container.appendChild(delAll);
  }

  /* NEXT MACHINE BUTTON */
  const next = document.createElement("div");
  next.className = "button";
  next.textContent = "Next Machine →";

  next.onclick = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = days[new Date().getDay()];
    const list = WEEKLY[today] || [];

    const index = list.indexOf(id);
    const nextID = list[index + 1];

    if (nextID) {
      window.renderScreen("Machine", nextID);
    } else {
      window.renderScreen("DailySchedule");
    }
  };

  container.appendChild(next);

  /* BACK BUTTON */
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen("StrengthStudio");
  container.appendChild(back);

  return container;
}
