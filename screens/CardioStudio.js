export function CardioStudio() {
  const container = document.createElement('div');
  container.innerHTML = `
    <h1>Cardio Studio</h1>
    <button onclick="renderScreen('Lobby')">Back to Lobby</button>
  `;
  return container;
}

