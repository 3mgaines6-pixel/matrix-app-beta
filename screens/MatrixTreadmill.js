/* =========================================
   MATRIX TREADMILL (DOM VERSION)
========================================= */

export default function MatrixTreadmill() {
  const container = document.createElement("div");
  container.className = "cardio-machine-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Matrix Treadmill";
  container.appendChild(header);

  /* TIME INPUT */
  const timeInput = document.createElement("input");
  timeInput.type = "number";
  timeInput.className = "cardio-input";
  timeInput.placeholder = "Minutes";
  container.appendChild(timeInput);

  /* DISTANCE INPUT */
  const distanceInput = document.createElement("input");
  distanceInput.type = "number";
  distanceInput.className = "cardio-input";
  distanceInput.placeholder = "Miles";
  container.appendChild(distanceInput);

  /* SAVE BUTTON */
  const saveBtn = document.createElement("div");
  saveBtn.className = "save-button";
  saveBtn.textContent = "Save Cardio";

  saveBtn.onclick = () => {
    const minutes = Number(timeInput.value);
    const miles = Number(distanceInput.value);

    if (!minutes && !miles) {
      alert("Enter minutes or miles");
      return;
    }

    const entry = {
      type: "treadmill",
      minutes,
      miles,
      date: new Date().toISOString()
    };

    // Save to localStorage
    const history = JSON.parse(localStorage.getItem("cardioHistory")) || [];
    history.push(entry);
    localStorage.setItem("cardioHistory", JSON.stringify(history));

    alert("Cardio saved!");
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
