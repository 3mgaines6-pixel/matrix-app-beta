export function Lobby() {
  const container = document.createElement("div");
  container.className = "lobby-screen";

  container.innerHTML = `
    <h1 class="lobby-title">Welcome</h1>

    <div class="lobby-buttons">
      <button onclick="renderScreen('GymFloor')">Enter Gym Floor</button>
    </div>
  `;

  return container;
}
