export function Machine8() {
  const container = document.createElement("div");
  container.className = "machine-screen";

  container.innerHTML = `
    <h1 class="machine-title">#8 Lat Pulldown</h1>
    <button class="close-btn" onclick="renderScreen('StrengthStudio')">Close</button>
  `;

  return container;
}
