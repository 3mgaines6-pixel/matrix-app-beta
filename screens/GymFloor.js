export function Lobby() {
  const container = document.createElement('div');
  container.innerHTML = `
    <h1>Lobby</h1>
    <button onclick="renderScreen('CardioStudio')">Cardio Studio</button>
    <button onclick="renderScreen('StrengthStudio')">Strength Studio</button>
    <button onclick="renderScreen('StretchStudio')">Stretch Studio</button>
  `;
  return container;
}
