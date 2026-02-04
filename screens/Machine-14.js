/* =========================================
   ==========  MACHINE 14 — HIP ABDUCTOR
   ========================================= */

export function Machine14() {
  const container = document.createElement("div");
  container.className = "machine-screen";

  /* ---------- HEADER ---------- */
  const title = document.createElement("h1");
  title.className = "machine-title";
  title.textContent = "#14 HIP ABDUCTOR";

  const subtitle = document.createElement("div");
  subtitle.className = "machine-subtitle";
  subtitle.textContent = "Outer Thighs / Glutes • LIGHT • 3×12–15";

  /* ---------- TEMPO ---------- */
  const tempoRow = document.createElement("div");
  tempoRow.className = "tempo-row";

  const tempoLabel = document.createElement("span");
  tempoLabel.id = "tempo-label-14";
  tempoLabel.textContent = "Tempo ▸";

  const tempoValue = document.createElement("span");
  tempoValue.id = "tempo-value-14";
  tempoValue.className = "hidden";
  tempoValue.textContent = "2-1-2";

  tempoRow.appendChild(tempoLabel);
  tempoRow.appendChild(tempoValue);

  tempoRow.onclick = () => {
    tempoValue.classList.toggle("hidden");
    tempoLabel.textContent = tempoValue.classList.contains("hidden")
      ? "Tempo ▸"
      : "Tempo ▾";
  };

  /* ----------
