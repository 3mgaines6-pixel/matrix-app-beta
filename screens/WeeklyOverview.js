import { MACHINES } from "../data/machines.js";

export function WeeklyOverview() {
  const container = document.createElement("div");
  container.className = "weekly-screen";

  /* ============================
     TITLE
  ============================ */
  const title = document.createElement("h1");
  title.className = "weekly-title";
  title.textContent = "This Week's Training";
  container.appendChild(title);

  /* ============================
     WEEK X OF 1–4 HEADER
  ============================ */
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((today - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);

  const blockWeek = ((weekNumber - 1) % 4) + 1;

  const blockLabel = document.createElement("div");
  blockLabel.className = "weekly-block-label";
  blockLabel.textContent = `Week ${blockWeek} of 4`;
  container.appendChild(blockLabel);

  /* ============================
     WEEK FILTER
  ============================ */
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  let weeklySets = 0;
  let weeklyVolume = 0;

  const machineBreakdown = {};

  /* ============================
     LOOP THROUGH ALL MACHINES
  ============================ */
  Object.keys(MACHINES).forEach(id => {
    const key = `machine-${id}-history`;
    const raw = localStorage.getItem(key);
    if (!raw) return;

    const history = JSON.parse(raw);

    history
      // 🔥 FIXED: convert date string → timestamp
      .filter(entry => new Date(entry.date).getTime() >= oneWeekAgo)
      .forEach(entry => {
        entry.reps.forEach((r, i) => {
          const vol = r * entry.weight[i];
          weeklySets++;
          weeklyVolume += vol;

          if (!machineBreakdown[id]) {
            machineBreakdown[id] = {
              name: MACHINES[id].name,
              sets: 0,
              volume: 0
            };
          }

          machineBreakdown[id].sets++;
          machineBreakdown[id].volume += vol;
        });
      });
  });

  /* ============================
     WEEKLY TOTALS CARD
  ============================ */
  const totalsCard = document.createElement("div");
  totalsCard.className = "weekly-card";

  totalsCard.innerHTML = `
    <h2>Weekly Totals</h2>
    <div class="weekly-totals">
      <div><strong>${weeklySets}</strong> Sets</div>
      <div><strong>${weeklyVolume}</strong> lbs Volume</div>
    </div>
  `;

  container.appendChild(totalsCard);

  /* ============================
     PER-MACHINE BREAKDOWN
  ============================ */
  const breakdownHeader = document.createElement("h2");
  breakdownHeader.textContent = "Per-Machine Breakdown";
  breakdownHeader.className = "weekly-subtitle";
  container.appendChild(breakdownHeader);

  const breakdownList = document.createElement("div");
  breakdownList.className = "weekly-list";

  Object.keys(machineBreakdown).forEach(id => {
    const m = machineBreakdown[id];

    const row = document.createElement("div");
    row.className = "weekly-row";

    // 🔥 SHOW MACHINE NUMBER + NAME
    row.innerHTML = `
      <div class="weekly-machine-name">#${id} — ${m.name}</div>
      <div class="weekly-machine-stats">
        ${m.sets} sets • ${m.volume} lbs
      </div>
    `;

    breakdownList.appendChild(row);
  });

  container.appendChild(breakdownList);

  /* ============================
     BACK BUTTON
  ============================ */
  const backBtn = document.createElement("button");
  backBtn.className = "weekly-back-btn";
  backBtn.textContent = "Return to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(backBtn);

  return container;
}
