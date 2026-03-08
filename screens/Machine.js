/* =========================================
   MACHINE SCREEN (DOM VERSION)
========================================= */
import { MACHINES } from "../data/machines.js";
import { WEEKLY_SCHEDULE } from "../data/weekly.js";

export default function Machine(data) {
  const machineID = data?.name;
  const returnTo = data?.returnTo || "StrengthStudio";
  const machine = MACHINES[machineID];

  const container = document.createElement("div");
  container.className = "machine-screen";

  /* BLUE MACHINE IDENTITY BAR */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = `${machineID} — ${machine.name}`;
  container.appendChild(header);

  /* COACHING CUE BAR */
  const cue = document.createElement("div");
  cue.className = "coaching-cue";

  // Pull cues from machine metadata if available
  const cues = machine.cues || [
    "Control the negative",
    "Stay tight and smooth",
    "Drive through the full range"
  ];

  // Pick one cue at random
  cue.textContent = cues[Math.floor(Math.random() * cues.length)];

  container.appendChild(cue);

  /* LOAD FULL HISTORY */
  const history = JSON.parse(localStorage.getItem("history") || "{}");
  const sets = history[machineID] || [];

  /* LAST SESSION (ALL SETS FROM MOST RECENT WORKOUT) */
  const last = document.createElement("div");
  last.className = "last-session";

  if (sets.length > 0) {
    const lastDate = sets[sets.length - 1].date;
    const lastSessionSets = sets.filter(s => s.date === lastDate);

    let text = "Last Session:\n";
    lastSessionSets.forEach(s => {
      text += `${s.weight} lbs × ${s.reps} reps\n`;
    });

    last.textContent = text.trim();
  } else {
    last.textContent = "No history yet";
  }

  container.appendChild(last);

  /* INPUTS */
  const weightInput = document.createElement("input");
  weightInput.type = "number";
  weightInput.className = "machine-input";
  weightInput.placeholder = "Weight (lbs)";
  container.appendChild(weightInput);

  const repsInput = document.createElement("input");
  repsInput.type = "number";
  repsInput.className = "machine-input";
  repsInput.placeholder = "Reps";
  container.appendChild(repsInput);

  /* SAVE BUTTON */
  const saveBtn = document.createElement("div");
  saveBtn.className = "button";
  saveBtn.textContent = "Save Set";

  saveBtn.onclick = () => {
    const w = Number(weightInput.value);
    const r = Number(repsInput.value);

    if (!w || !r) {
      alert("Enter weight and reps");
      return;
    }

    if (!history[machineID]) {
      history[machineID] = [];
    }

    const now = new Date().toISOString();
    history[machineID].push({
      weight: w,
      reps: r,
      date: now
    });

    localStorage.setItem("history", JSON.stringify(history));

    // Update last session display
    const lastSessionSets = history[machineID].filter(s => s.date === now);
    let text = "Last Session:\n";
    lastSessionSets.forEach(s => {
      text += `${s.weight} lbs × ${s.reps} reps\n`;
    });
    last.textContent = text.trim();

    alert("Set saved!");
  };

  container.appendChild(saveBtn);

  /* NEXT MACHINE BUTTON (Daily Schedule only) */
  if (returnTo === "DailySchedule") {
    const nextBtn = document.createElement("div");
    nextBtn.className = "button";

    const today = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"][new Date().getDay()];
    const todayList = WEEKLY_SCHEDULE[today] || [];
    const index = todayList.indexOf(machineID);

    if (index !== -1 && index < todayList.length - 1) {
      const nextID = todayList[index + 1];
      nextBtn.textContent = `Next: ${nextID} — ${MACHINES[nextID].name}`;
      nextBtn.onclick = () => {
        window.renderScreen("Machine", { name: nextID, returnTo: "DailySchedule" });
      };
      container.appendChild(nextBtn);
    }
  }

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "return-btn";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen(returnTo);
  container.appendChild(backBtn);

  return container;
}
