import { WEEKLY_SCHEDULE } from "../data/weeklySchedule.js";
import { MACHINES } from "../data/machines.js";

/* =========================================
   REMEMBER USER'S SELECTED DAY
========================================= */
let manualDaySelection = localStorage.getItem("selectedDay") || null;

export function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  /* ---------- TITLE ---------- */
  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Strength Floor";

  /* ---------- RETURN BUTTON ---------- */
  const backBtn = document.createElement("button");
  backBtn.className = "strength-back-btn";
  backBtn.textContent = "Return to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");

  /* ---------- DAY BUTTONS ---------- */
  const dayButtons = document.createElement("div");
  dayButtons.className = "strength-day-buttons";

  const days = Object.keys(WEEKLY_SCHEDULE);

  days.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "strength-btn";
    btn.textContent = day;

    // Highlight selected day
    if (manualDaySelection === day) {
      btn.style.background = "rgba(0, 120, 255, 0.6)";
    }

    btn.onclick = () => {
      manualDaySelection = day;
      localStorage.setItem("selectedDay", day);
      renderMachineList(day);
      highlightSelectedDay(dayButtons, day);
    };

    dayButtons.appendChild(btn);
  });

  /* ---------- MACHINE LIST ---------- */
  const machineList = document.createElement("div");
  machineList.className = "strength-machine-buttons";

  /* ---------- APPEND STRUCTURE ---------- */
  container.appendChild(title);
  container.appendChild(backBtn);
  container.appendChild(dayButtons);
  container.appendChild(machineList);

  /* ---------- INITIAL LOAD ---------- */
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const startingDay = manualDaySelection || today;
  renderMachineList(startingDay);
  highlightSelectedDay(dayButtons, startingDay);

  /* =========================================
     RENDER MACHINE LIST
  ========================================== */
  function renderMachineList(day) {
    machineList.innerHTML = "";

    const ids = WEEKLY_SCHEDULE[day];
    if (!ids) return;

    ids.forEach(id => {
      const meta = MACHINES[id];
      if (!meta) return;

      const btn = document.createElement("button");
      btn.className = "strength-btn";
      btn.textContent = `#${id} ${meta.name}`;
      btn.onclick = () => window.renderScreen(`Machine-${id}`);

      machineList.appendChild(btn);
    });
  }

  /* =========================================
     HIGHLIGHT SELECTED DAY
  ========================================== */
  function highlightSelectedDay(container, selectedDay) {
    const buttons = container.querySelectorAll("button");
    buttons.forEach(btn => {
      if (btn.textContent === selectedDay) {
        btn.style.background = "rgba(0, 120, 255, 0.6)";
      } else {
        btn.style.background = "rgba(255,255,255,0.1)";
      }
    });
  }

  return container;
}
