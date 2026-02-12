import { WEEKLY_SCHEDULE } from "../data/weeklySchedule.js";
import { MACHINES } from "../data/machines.js";
import { getRotationInfo, getRotatedMachine } from "../data/rotation.js";

/* =========================================
   REMEMBER USER'S SELECTED DAY
========================================= */
let manualDaySelection = localStorage.getItem("selectedDay") || null;

export function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  const wrapper = document.createElement("div");
  wrapper.className = "strength-wrapper";
  container.appendChild(wrapper);

  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Strength Floor";
  wrapper.appendChild(title);

  const rot = getRotationInfo();
  const rotationLabel = document.createElement("div");
  rotationLabel.style.textAlign = "center";
  rotationLabel.style.opacity = "0.7";
  rotationLabel.style.marginBottom = "10px";
  rotationLabel.style.fontSize = "14px";
  rotationLabel.textContent = `Rotation Block ${rot.block} • ${rot.mode} • ${rot.range}`;
  wrapper.appendChild(rotationLabel);

  const backBtn = document.createElement("button");
  backBtn.className = "strength-back-btn";
  backBtn.textContent = "Return to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");

  const dayButtons = document.createElement("div");
  dayButtons.className = "strength-day-buttons";

  const days = Object.keys(WEEKLY_SCHEDULE);

  days.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "strength-btn";
    btn.textContent = day;

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

  const machineList = document.createElement("div");
  machineList.className = "strength-machine-buttons";

  wrapper.appendChild(backBtn);
  wrapper.appendChild(dayButtons);
  wrapper.appendChild(machineList);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const startingDay = manualDaySelection || today;

  renderMachineList(startingDay);
  highlightSelectedDay(dayButtons, startingDay);

  function renderMachineList(day) {
    machineList.innerHTML = "";

    const ids = WEEKLY_SCHEDULE[day];
    if (!ids) return;

    ids.forEach(id => {
      const rotatedId = getRotatedMachine(id);
      const meta = MACHINES[rotatedId];
      if (!meta) return;

      const btn = document.createElement("button");
      btn.className = "strength-btn";
      btn.textContent = `#${rotatedId} ${meta.name}`;
      btn.onclick = () => window.renderScreen(`Machine-${rotatedId}`);

      machineList.appendChild(btn);
    });
  }

  function highlightSelectedDay(container, selectedDay) {
    const buttons = container.querySelectorAll("button");
    buttons.forEach(btn => {
      btn.style.background =
        btn.textContent === selectedDay
          ? "rgba(0, 120, 255, 0.6)"
          : "rgba(255,255,255,0.1)";
    });
  }

  return container;
}
