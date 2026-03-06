/* =========================================
   WEEKLY OVERVIEW (DOM VERSION)
========================================= */

export default function WeeklyOverview() {
  const container = document.createElement("div");
  container.className = "weekly-overview";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Weekly Overview";
  container.appendChild(header);

  /* TOTALS SECTION */
  const totals = document.createElement("div");
  totals.className = "weekly-totals";
  container.appendChild(totals);

  let totalSets = 0;
  let totalVolume = 0;

  Object.keys(MACHINES).forEach((machineName) => {
    const m = MACHINES[machineName];

    if (m.lastWeight && m.lastReps) {
      totalSets += 1;
      totalVolume += m.lastWeight * m.lastReps;
    }
  });

  const setsRow = document.createElement("div");
  setsRow.className = "weekly-row";
  setsRow.textContent = `Total Sets: ${totalSets}`;
  totals.appendChild(setsRow);

  const volumeRow = document.createElement("div");
  volumeRow.className = "weekly-row";
  volumeRow.textContent = `Total Volume: ${totalVolume} lbs`;
  totals.appendChild(volumeRow);

  /* MACHINE BREAKDOWN */
  const breakdown = document.createElement("div");
  breakdown.className = "weekly-breakdown";
  container.appendChild(breakdown);

  Object.keys(MACHINES).forEach((machineName) => {
    const m = MACHINES[machineName];

    const row = document.createElement("div");
    row.className = "weekly-machine-row";

    const name = document.createElement("div");
    name.className = "weekly-machine-name";
    name.textContent = machineName;

    const stats = document.createElement("div");
    stats.className = "weekly-machine-stats";

    if (m.lastWeight && m.lastReps) {
      stats.textContent = `${m.lastWeight} × ${m.lastReps}`;
    } else {
      stats.textContent = "—";
    }

    row.appendChild(name);
    row.appendChild(stats);
    breakdown.appendChild(row);
  });

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("Summary");
  container.appendChild(backBtn);

  return container;
}
