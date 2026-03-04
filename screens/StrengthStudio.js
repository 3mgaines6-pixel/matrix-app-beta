import { WEEKLY_SCHEDULE } from "../data/weekly.js";
import { MACHINES } from "../data/machines.js";
import { getRotationInfo, getRotatedMachine } from "../data/rotation.js";

/* ============================================================
   REMEMBER USER'S SELECTED DAY
============================================================ */
let manualDaySelection = localStorage.getItem("manualDaySelection");

/* ============================================================
   EMOJIS
============================================================ */
const MACHINE_EMOJIS = {
  15: "🏋️",
  115: "🏋️",
  22: "🦵",
  122: "🦵",
  6: "💪",
  106: "💪",
  9: "🏋️",
  109: "🏋️",
  3: "🫀",
  103: "🫀",
  12: "🦾",
  112: "🦾",
  18: "🦵",
  118: "🦵",
  30: "🦴",
  130: "🦴"
};

export function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  const wrapper = document.createElement("div");
  wrapper.className = "strength-wrapper";
  container.appendChild(wrapper);

  /* HEADER */
  const header = document.createElement("div");
  header.className = "strength-header";
  header.textContent = "Strength Studio";
  wrapper.appendChild(header);

  /* ROTATION LABEL — NOW SHOWS WEEK */
  const rot = getRotationInfo();
  const rotationLabel = document.createElement("div");
  rotationLabel.className = "rotation-label";
  rotationLabel.textContent = `Block ${rot.block} • Week ${rot.week} of ${rot.range} • ${rot.mode}`;
  wrapper.appendChild(rotationLabel);

  /* DAY SELECTOR */
  const dayButtons = document.createElement("div");
  dayButtons.className = "day-selector";

  const
