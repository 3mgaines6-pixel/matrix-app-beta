export function MatrixCycle() {
  const container = document.createElement("div");
  container.className = "cardio-machine-screen";

  const title = document.createElement("h1");
  title.textContent = "Matrix Cycle";
  container.appendChild(title);

  const msg = document.createElement("div");
  msg.textContent = "Cardio tracking coming soon.";
  container.appendChild(msg);

  const back = document.createElement("button");
  back.textContent = "Back";
  back.onclick = () => window.renderScreen("CardioStudio");
  container.appendChild(back);

  return container;
}

