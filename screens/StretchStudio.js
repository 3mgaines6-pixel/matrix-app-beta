export function StretchStudio() {
  const container = document.createElement('div');
  container.innerHTML = `
    <h1>Stretch Studio</h1>
    <button onclick="renderScreen('Lobby')">Back to Lobby</button>
  `;
  return container;
}

