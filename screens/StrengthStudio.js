import { MACHINES } from "../data/machines.js";

export default function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "screen strength-bg";

  /* -------------------------------
     HEADER
  --------------------------------*/
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Strength Studio";
  container.appendChild(header);

  /* -------------------------------
     WEEK + BLOCK BADGE
  --------------------------------*/
  const week = parseInt(localStorage.getItem("week") || "1");
  const block = week <= 2 ? "PRIMARY" : "SWAP";

  const badge = document.createElement("div");
  badge.className = "badge";
  badge.textContent = `Week ${week} of 4 • ${block}`;
  container.appendChild(badge);

  /* -------------------------------
     MACHINE LIST
  --------------------------------*/
  Object.keys(MACHINES).forEach((id) => {
    const machine = MACHINES[id];
    if (!machine) return; // safety guard

    const btn = document.createElement("div");
    btn.className = "button";
    btn.textContent = `${id} — ${machine.emoji} ${machine.name}`;

    // 🔥 FIXED: pass the ID into Machine screen
    btn.onclick = () => {
      window.renderScreen("Machine", id);
    };

    container.appendChild(btn);
  });

  /* -------------------------------
     BACK BUTTON
  --------------------------------*/
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(back);

  return container;
}
