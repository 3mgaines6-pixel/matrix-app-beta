export function CardioStudio() {
  const container = document.createElement("div");
  container.className = "cardio-screen";

  /* ---------- TITLE ---------- */
  const title = document.createElement("h1");
  title.className = "cardio-title";
  title.textContent = "Cardio Studio";
  container.appendChild(title);

  /* Helper to create buttons */
  function makeBtn(icon, label, screen) {
    const btn = document.createElement("button");
    btn.className = "cardio-btn";
    btn.innerHTML = `<span class="icon">${icon}</span> ${label}`;
    btn.onclick = () => window.renderScreen(screen);
    return btn;
  }

  /* ---------- BUTTONS (FINAL ORDER) ---------- */
  container.appendChild(makeBtn("🏃‍♂️", "Matrix Treadmill", "MatrixTreadmill"));
  container.appendChild(makeBtn("🚴", "Spin Class", "SpinClass"));
  container.appendChild(makeBtn("💪", "Core Class", "CoreClass"));
  container.appendChild(makeBtn("🚲", "Matrix Cycle", "Cycle"));
  container.appendChild(makeBtn("🏃‍♀️", "Matrix Elliptical", "Elliptical"));
  container.appendChild(makeBtn("🚣", "Rowing Machine", "Rowing"));
  container.appendChild(makeBtn("🌤️", "Outdoor Walk", "OutdoorWalk"));

  return container;
}
