export function CardioStudio() {
  const container = document.createElement("div");
  container.className = "cardio-screen";

  const title = document.createElement("h1");
  title.className = "cardio-title";
  title.textContent = "Cardio Studio";
  container.appendChild(title);

  /* ----- General Cardio Options ----- */
  const generalHeader = document.createElement("h2");
  generalHeader.textContent = "Cardio Options";
  generalHeader.className = "cardio-header";
  container.appendChild(generalHeader);

  const generalButtons = document.createElement("div");
  generalButtons.className = "cardio-buttons";

  const generalList = [
    { label: "Treadmill", screen: "Treadmill" },
    { label: "Rowing Machine", screen: "RowingMachine" },
    { label: "Outdoor Walk", screen: "OutdoorWalk" },
    { label: "Spin Class", screen: "SpinClass" },
    { label: "Core Class", screen: "CoreClass" },
    { label: "Classroom Door", screen: "ClassroomDoor" }
  ];

  generalList.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "cardio-btn";
    btn.textContent = item.label;
    btn.onclick = () => window.renderScreen(item.screen);
    generalButtons.appendChild(btn);
  });

  container.appendChild(generalButtons);

  /* ----- Matrix Machines ----- */
  const matrixHeader = document.createElement("h2");
  matrixHeader.textContent = "Matrix Cardio Machines";
  matrixHeader.className = "cardio-header";
  container.appendChild(matrixHeader);

  const matrixButtons = document.createElement("div");
  matrixButtons.className = "cardio-buttons";

  const matrixList = [
    { label: "Matrix Treadmill", screen: "MatrixTreadmill" },
    { label: "Matrix Cycle", screen: "MatrixCycle" },
    { label: "Matrix Elliptical", screen: "MatrixElliptical" }
  ];

  matrixList.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "cardio-btn";
    btn.textContent = item.label;
    btn.onclick = () => window.renderScreen(item.screen);
    matrixButtons.appendChild(btn);
  });

  container.appendChild(matrixButtons);

  /* ----- Back Button ----- */
  const backBtn = document.createElement("button");
  backBtn.className = "cardio-back-btn";
  backBtn.textContent = "Return to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(backBtn);

  return container;
}
