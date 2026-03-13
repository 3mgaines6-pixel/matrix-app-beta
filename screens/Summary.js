import { MACHINES } from "../data/machines.js";
import { loadHistory } from "../utils/history.js";
import { RULES } from "../data/rules.js";   // If your rules live elsewhere, adjust import

export default function Summary() {
  const root = document.createElement("div");
  root.id = "summary-root";

  /* -----------------------------------------
     HEADER
  ----------------------------------------- */
  const header = document.createElement("div");
  header.className = "summary-header";
  header.textContent = "Weekly Summary";
  root.appendChild(header);

  /* -----------------------------------------
     TIME WINDOW — LAST 7 DAYS
  ----------------------------------------- */
  const now = Date.now();
  const cutoff = now - (7 * 24 * 60 * 60 * 1000);

  /* -----------------------------------------
     TOTALS STRUCTURE
  ----------------------------------------- */
  const totals = {
    HEAVY: { sets: 0, topReps: 0, topWeight: 0 },
    LIGHT: { sets: 0, topReps: 0, topWeight: 0 },
    CORE:  { sets: 0, topReps: 0, topWeight: 0 }
  };

  /* -----------------------------------------
     STRENGTH SUMMARY LOOP
  ----------------------------------------- */
  Object.values(MACHINES).forEach(machine => {
    const type = machine.type; // HEAVY / LIGHT / CORE
    const rule = RULES[type];

    const history = loadHistory(machine.id, type);
    if (!history.length) return;

    // Determine last max weight for this machine/type
    const lastMax = Math.max(
      ...history[history.length - 1].sets.map(s => s.weight)
    );

    history.forEach(session => {
      if (session.time < cutoff) return;

      session.sets.forEach(set => {
        totals[type].sets++;

        if (set.reps >= rule.top) totals[type].topReps++;
        if (set.weight >= lastMax) totals[type].topWeight++;
      });
    });
  });

  /* -----------------------------------------
     RENDER STRENGTH SUMMARY
  ----------------------------------------- */
  const strengthBox = document.createElement("div");
  strengthBox.className = "summary-box";

  strengthBox.innerHTML = `
    <h3>Strength (Last 7 Days)</h3>
    <table class="summary-table">
      <tr>
        <th>Type</th>
        <th>Total Sets</th>
        <th>Top Reps</th>
        <th>Top Weight</th>
      </tr>
      <tr>
        <td>HEAVY</td>
        <td>${totals.HEAVY.sets}</td>
        <td>${totals.HEAVY.topReps}</td>
        <td>${totals.HEAVY.topWeight}</td>
      </tr>
      <tr>
        <td>LIGHT</td>
        <td>${totals.LIGHT.sets}</td>
        <td>${totals.LIGHT.topReps}</td>
        <td>${totals.LIGHT.topWeight}</td>
      </tr>
      <tr>
        <td>CORE</td>
        <td>${totals.CORE.sets}</td>
        <td>${totals.CORE.topReps}</td>
        <td>${totals.CORE.topWeight}</td>
      </tr>
    </table>
  `;

  root.appendChild(strengthBox);

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
