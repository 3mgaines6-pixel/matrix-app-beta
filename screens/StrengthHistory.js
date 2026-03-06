/* =========================================
   STRENGTH HISTORY (DOM VERSION)
========================================= */

export default function StrengthHistory() {
  const container = document.createElement("div");
  container.className = "strength-history-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Strength History";
  container.appendChild(header);

  /* HISTORY LIST */
  const list = document.createElement("div");
  list.className = "strength-history-list";
  container.appendChild(list);

  const history = JSON.parse(localStorage.getItem("strengthHistory")) || [];

  if (history.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-history";
    empty.textContent = "No strength workouts logged yet";
    list.appendChild(empty);
  } else {
    history
      .slice()
      .reverse()
      .forEach((entry) => {
        const row = document.createElement("div");
        row.className = "strength-history-row";

        const name = document.createElement("div");
        name.className = "strength-history-name";
        name.textContent = entry.machine;

        const stats = document.createElement("div");
        stats.className = "strength-history-stats";
        stats.textContent = `${entry.weight} lbs × ${entry.reps} reps`;

        const date = document.createElement("div");
        date.className = "strength-history-date";
        date.textContent = new Date(entry.date).toLocaleString();

        row.appendChild(name);
        row.appendChild(stats);
        row.appendChild(date);

        list.appendChild(row);
      });
  }

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("StrengthStudio");
  container.appendChild(backBtn);

  return container;
}
