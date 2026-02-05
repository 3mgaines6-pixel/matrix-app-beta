export function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  container.innerHTML = `
    <h1 class="strength-title">Strength Floor</h1>

    <button class="strength-back-btn" onclick="renderScreen('Lobby')">Back</button>

    <div class="strength-group">
      <h2>Lower Body</h2>
      <div class="strength-buttons">
        <button class="strength-btn" onclick="renderScreen('Machine-15')">#15 Leg Press</button>
        <button class="strength-btn" onclick="renderScreen('Machine-12')">#12 Seated Leg Curl</button>
        <button class="strength-btn" onclick="renderScreen('Machine-10')">#10 Prone Leg Curl</button>
        <button class="strength-btn" onclick="renderScreen('Machine-11')">#11 Leg Extension</button>
        <button class="strength-btn" onclick="renderScreen('Machine-13')">#13 Hip Adductor</button>
        <button class="strength-btn" onclick="renderScreen('Machine-14')">#14 Hip Abductor</button>
      </div>
    </div>

    <div class="strength-group">
      <h2>Upper Body — Push</h2>
      <div class="strength-buttons">
        <button class="strength-btn" onclick="renderScreen('Machine-7')">#7 Chest Press</button>
        <button class="strength-btn" onclick="renderScreen('Machine-6')">#6 Shoulder Press</button>
        <button class="strength-btn" onclick="renderScreen('Machine-2')">#2 Triceps Press</button>
        <button class="strength-btn" onclick="renderScreen('Machine-9')">#9 Pec Fly / Rear Delt</button>
      </div>
    </div>

    <div class="strength-group">
      <h2>Upper Body — Pull</h2>
      <div class="strength-buttons">
        <button class="strength-btn" onclick="renderScreen('Machine-8')">#8 Lat Pulldown</button>
        <button class="strength-btn" onclick="renderScreen('Machine-5')">#5 Seated Row</button>
        <button class="strength-btn" onclick="renderScreen('Machine-4')">#4 Back Extension</button>
      </div>
    </div>

    <div class="strength-group">
      <h2>Arms & Core</h2>
      <div class="strength-buttons">
        <button class="strength-btn" onclick="renderScreen('Machine-1')">#1 Dependent Curl</button>
        <button class="strength-btn" onclick="renderScreen('Machine-3')">#3 Ab Crunch</button>
      </div>
    </div>
  `;

  return container;
}

