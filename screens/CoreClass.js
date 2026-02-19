export function CoreClass() {
  const container = document.createElement("div");
  container.className = "cardio-machine-screen";

  /* ---------- TITLE ---------- */
  const title = document.createElement("h1");
  title.className = "cardio-machine-title";
  title.textContent = "Core Class";
  container.appendChild(title);

  /* ---------- LAST SESSION ---------- */
  const last = document.createElement("div");
  last.className = "last-session";

  const lastData = JSON.parse(localStorage.getItem("core_last"));
  if (lastData) {
    last.textContent = `Last: ${lastData.minutes} min • Intensity ${lastData.intensity}`;
  } else {
    last.textContent = "Last: —";
  }
  container.appendChild(last);

  /* ---------- INPUTS ---------- */
  function makeInput(label, id, type = "number") {
    const wrap = document.createElement("div");
    wrap.className = "input-row";

    const lbl = document.createElement("label");
    lbl.textContent = label;

    const input = document.createElement("input");
    input.type = type;
    input.id = id;

    wrap.appendChild(lbl);
    wrap.appendChild(input);
    return wrap;
  }

  const minutesInput = makeInput("Minutes", "core_minutes");
const intensityInput = makeInput("Intensity (1–10)", "core_intensity");
const hrInput = makeInput("Heart Rate (optional)", "core_hr");
const calInput = makeInput("Calories (optional)", "core_calories");

container.appendChild(minutesInput);
container.appendChild(intensityInput);
container.appendChild(hrInput);
container.appendChild(calInput);


  /* ---------- LOG BUTTON ---------- */
  const logBtn = document.createElement("button");
  logBtn.className = "log-btn";
  logBtn.textContent = "Log Session";

  logBtn.onclick = () => {
  const minutes = parseFloat(minutesInput.querySelector("input").value);
  const intensity = parseFloat(intensityInput.querySelector("input").value);
  const hr = parseFloat(hrInput.querySelector("input").value) || null;
  const calories = parseFloat(calInput.querySelector("input").value) || null;

  if (!minutes || !intensity) {
    alert("Please enter minutes and intensity.");
    return;
  }

  const entry = {
    type: "core",
    minutes,
    intensity,
    hr,
    calories,
    date: Date.now()
  };

  localStorage.setItem("core_last", JSON.stringify(entry));

  const history = JSON.parse(localStorage.getItem("cardio_history")) || [];
  history.unshift(entry);
  localStorage.setItem("cardio_history", JSON.stringify(history));

  alert("Session logged!");
  window.renderScreen("CardioStudio");
};

  container.appendChild(logBtn);

  /* ---------- RETURN BUTTON ---------- */
  const backBtn = document.createElement("button");
  backBtn.className = "log-btn";
  backBtn.textContent = "← Back to Cardio Studio";
  backBtn.style.marginTop = "12px";
  backBtn.onclick = () => window.renderScreen("CardioStudio");
  container.appendChild(backBtn);

  return container;
}
