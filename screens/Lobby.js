export function Lobby() {
  const container = document.createElement('div');
  container.innerHTML = `
    <h1>Lobby</h1>
    <button onclick="renderScreen('CardioStudio')">Cardio Studio</button>
  `;
  return container;
}


