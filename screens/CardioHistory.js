export function CardioHistory() {
  const container = document.createElement("div");
  container.className = "history-screen";

  /* ---------- TITLE ---------- */
  const title = document.createElement("h1");
  title.className = "history-title";
  title.textContent = "Cardio History";
  container.appendChild(title);

  /* ---------- LOAD HISTORY ---------- */
  const history = JSON.parse(localStorage.getItem("cardio_history")) || [];

  /* ---------- EMPTY STATE ---------- */
  if (history.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-history";
    empty.textContent = "No cardio sessions logged yet.";
    container.appendChild(empty);

    // Return button even when empty
    const backBtn = document.createElement("button");
    backBtn.className = "cardio-btn";
    backBtn.textContent = "← Back to Cardio Studio";
    backBtn.style.marginTop = "20px";
    backBtn.onclick = () => window.renderScreen("CardioStudio");
    container.appendChild(backBtn);

    return container;
  }

  /* ---------- GROUP BY DATE ---------- */
  const groups = {};

  history.forEach(entry => {
    const date = new Date(entry.date);
    const dateKey = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(entry);
  });

  /* ---------- RENDER GROUPS ---------- */
  Object.keys(groups).forEach(dateKey => {
    const dateHeader = document.createElement("h2");
    dateHeader.className = "history-date";
    dateHeader.textContent = dateKey;
    container.appendChild(dateHeader);

    groups[dateKey].forEach(entry => {
      const row = document.createElement("div");
      row.className = "history-row";

      const machine = entry.machine || "Cardio";
      const minutes = entry.minutes || "?";
      const miles = entry.miles ? `${entry.miles} mi` : "";

      row.textContent = `${machine} — ${minutes} min ${miles}`;
      container.appendChild(row);
    });
  });

  /* ---------- RETURN BUTTON ---------- */
  const backBtn = document.createElement("button");
  backBtn.className = "cardio-btn";
  backBtn.textContent = "← Back to Cardio Studio";
  backBtn.style.marginTop = "20px";
  backBtn.onclick = () => window.renderScreen("CardioStudio");
  container.appendChild(backBtn);

  return container;
}
