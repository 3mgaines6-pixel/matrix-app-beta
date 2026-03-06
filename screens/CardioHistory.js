/* =========================================
   CARDIO HISTORY (DOM VERSION)
========================================= */

export default function CardioHistory() {
  const container = document.createElement("div");
  container.className = "cardio-history-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Cardio History";
  container.appendChild(header);

  /* HISTORY LIST */
  const list = document.createElement("div");
  list.className = "cardio-history-list";
  container.appendChild(list);

  const history = JSON.parse(localStorage.getItem("cardioHistory")) || [];

  if (history.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-history";
    empty.textContent = "No cardio logged yet";
    list.appendChild(empty);
  } else {
    history
      .slice()
      .reverse()
      .forEach((entry) => {
        const row = document.createElement("div");
        row.className = "cardio-history-row";

        const type = document.createElement("div");
        type.className = "cardio-history-type";
        type.textContent = entry.type.toUpperCase();

        const details = document.createElement("div");
        details.className = "cardio-history-details";

        let text = `${entry.minutes || 0} min`;

        if (entry.miles) text += ` · ${entry.miles} miles`;
        if (entry.rpm) text += ` · ${entry.rpm} RPM`;
        if (entry.intensity) text += ` · Intensity ${entry.intensity}`;
        if (entry.hr) text += ` · HR ${entry.hr}`;
        if (entry.calories) text += ` · ${entry.calories} cal`;

        details.textContent = text;

        const date = document.createElement("div");
        date.className = "cardio-history-date";
        date.textContent = new Date(entry.date).toLocaleString();

        row.appendChild(type);
        row.appendChild(details);
        row.appendChild(date);

        list.appendChild(row);
      });
  }

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("CardioStudio");
  container.appendChild(backBtn);

  return container;
}
