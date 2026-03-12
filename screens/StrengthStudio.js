import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  /* -------------------------------
     TITLE
  --------------------------------*/
  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Strength Studio";
  container.appendChild(title);

  /* -------------------------------
     WEEK / BLOCK / SWAP BADGES
  --------------------------------*/
  const badgeRow = document.createElement("div");
  badgeRow.className = "badge-row";
  container.appendChild(badgeRow);

  function getWeek() {
    return parseInt(localStorage.getItem("training_week") || "1");
  }

  function setWeek(w) {
    localStorage.setItem("training_week", w);
  }

  function getBlock(week) {
    return week === 1 || week === 3 ? "Heavy" : "Light";
  }

  function isSwapWeek() {
    return localStorage.getItem("swap_week") === "true";
  }

  function renderBadges() {
    badgeRow.innerHTML = "";

    const week = getWeek();
    const block = getBlock(week);

    const weekBadge = document.createElement("div");
    weekBadge.className = "badge";
    weekBadge.textContent = `Week ${week} of 4`;
    badgeRow.appendChild(weekBadge);

    const blockBadge = document.createElement("div");
    blockBadge.className = "badge";
    blockBadge.textContent = `${block} Week`;
    badgeRow.appendChild(blockBadge);

    if (isSwapWeek()) {
      const swapBadge = document.createElement("div");
      swapBadge.className = "badge swap";
      swapBadge.textContent = "Swap Week Active";
      badgeRow.appendChild(swapBadge);
    }
  }

  renderBadges();

  /* -------------------------------
     DAY SELECTOR
  --------------------------------*/
  const dayRow = document.createElement("div");
  dayRow.className = "day-selector-row";

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  let jsDay = new Date().getDay();
  if (jsDay === 0 || jsDay === 6) jsDay = 1;
  let selectedDayKey = days[jsDay - 1];

  days.forEach((d) => {
    const btn = document.createElement("div");
    btn.className = "day-button";
    btn.textContent = d;

    if (d === selectedDayKey) btn.classList.add("day-selected");

    btn.onclick = () => {
      document.querySelectorAll(".day-button").forEach(b => b.classList.remove("day-selected"));
      btn.classList.add("day-selected");
      selectedDayKey = d;
      loadDay(d);
    };

    dayRow.appendChild(btn);
  });

  container.appendChild(dayRow);

  /* -------------------------------
     MACHINE LIST
  --------------------------------*/
  const list = document.createElement("div");
  list.className = "machine-list";
  container.appendChild(list);

  /* -------------------------------
     LOAD MACHINES FOR A DAY
  --------------------------------*/
  function loadDay(dayKey) {
    list.innerHTML = "";

    let todayMachines = WEEKLY[dayKey] || [];

    if (isSwapWeek()) {
      todayMachines = [...todayMachines].reverse();
    }

    todayMachines.forEach((id, index) => {
      const m = MACHINES[id];
      if (!m) return;

      const card = document.createElement("div");
      card.className = "machine-card";

      card.innerHTML = `
        <div class="machine-name">${m.emoji} ${m.name}</div>
        <div class="machine-baseline">${m.muscle}</div>
        <div class="machine-baseline">Baseline: ${m.baseline} lbs</div>
      `;

      card.onclick = () => {
        window.renderScreen("Machine", {
          id,
          number: index + 1,
          day: dayKey
        });
      };

      list.appendChild(card);
    });
  }

  loadDay(selectedDayKey);

  /* -------------------------------
     DAY COMPLETION CHECK
  --------------------------------*/
  function checkDayCompletion() {
    const todayMachines = WEEKLY[selectedDayKey] || [];
    let completed = 0;

    todayMachines.forEach(id => {
      const sets = JSON.parse(localStorage.getItem(`history_${id}_today`) || "[]");
      if (sets.length === 3) completed++;
    });

    if (completed === 5) {
      handleDayComplete();
    }
  }

  /* -------------------------------
     HANDLE DAY COMPLETE
  --------------------------------*/
  function handleDayComplete() {
    const last = localStorage.getItem("last_completed_day_date");
    const today = new Date().toDateString();

    if (last) {
      const diff = (new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24);
      if (diff >= 7) {
        let w = getWeek();
        w = w === 4 ? 1 : w + 1;
        setWeek(w);
        renderBadges();
      }
    }

    localStorage.setItem("last_completed_day_date", today);

    showCompletionBanner();
  }

  /* -------------------------------
     G2 FLOATING BANNER
  --------------------------------*/
  function showCompletionBanner() {
    const banner = document.createElement("div");
    banner.className = "completion-banner";
    banner.textContent = "🎉 Day Complete! Week will advance when 7 days have passed.";

    container.appendChild(banner);

    setTimeout(() => {
      banner.style.opacity = "0";
      setTimeout(() => banner.remove(), 600);
    }, 3000);
  }

  /* -------------------------------
     CHECK COMPLETION ON RETURN
  --------------------------------*/
  window.onStrengthReturn = () => {
    renderBadges();
    checkDayCompletion();
    loadDay(selectedDayKey);
  };

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
