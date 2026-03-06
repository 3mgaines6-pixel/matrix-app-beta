export function GymFloor() {
  const div = document.createElement("div");
  div.className = "gymfloor-screen";

  div.innerHTML = `
    <div class="gymfloor-overlay"></div>

    <header class="gymfloor-header">
      <h1>Welcome to Matt's Gym Floor</h1>
    </header>

    <div class="gymfloor-buttons">
      <button class="gymfloor-btn" data-screen="StrengthStudio">Strength Studio</button>
      <button class="gymfloor-btn" data-screen="CardioStudio">Cardio Studio</button>
      <button class="gymfloor-btn" data-screen="StretchStudio">Stretch Studio</button>
      <button class="gymfloor-btn" data-screen="NutritionGuide">Nutrition Guide</button>
    </div>
  `;

  // Attach navigation
  div.querySelectorAll(".gymfloor-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-screen");
      window.renderScreen(target);
    });
  });

  return div;
}
