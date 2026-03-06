/* =========================================
   SPIN CLASS (DOM VERSION)
========================================= */

export default function SpinClass() {
  const container = document.createElement("div");
  container.className = "spin-class-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Spin Class";
  container.appendChild(header);

  /* MINUTES INPUT */
  const minutesInput = document.createElement("input");
  minutesInput.type = "number";
  minutesInput.className = "cardio-input";
  minutesInput.placeholder = "Minutes";
  container.appendChild(minutesInput);

  /* DISTANCE INPUT */
  const distanceInput = document.createElement("input");
  distanceInput.type = "number";
  distanceInput.className = "cardio-input";
  distanceInput.placeholder = "Miles (optional)";
  container.appendChild(distanceInput);

  /* RPM INPUT */
  const rpmInput = document.createElement("input");
  rpmInput.type = "number";
  rpmInput.className = "cardio-input";
  rpmInput.placeholder = "Avg RPM (optional)";
  container.appendChild(rpmInput);

  /* SAVE BUTTON */
  const saveBtn = document.createElement("div");
  saveBtn.className = "save-button";
  saveBtn.textContent = "Save Spin Class";

  saveBtn.onclick = () => {
    const minutes = Number(minutesInput.value);
    const miles = Number(distanceInput.value);
    const rpm = Number(rpmInput.value);

    if (!minutes) {
      alert("Enter minutes");
      return;
    }

    const entry = {
      type: "spin",
      minutes,
      miles: miles || null,
      rpm: rpm || null,
      date: new Date().toISOString()
    };

    // Save to localStorage
    const history = JSON.parse(localStorage.getItem("cardioHistory")) || [];
    history.push(entry);
    localStorage.setItem("cardioHistory", JSON.stringify(history));

    alert("Spin class saved!");
  };

  container.appendChild(saveBtn);

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("CardioStudio");
  container.appendChild(backBtn);

  return container;
}
