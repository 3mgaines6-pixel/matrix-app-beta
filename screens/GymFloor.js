/* =========================================
   ==========  GYM FLOOR SCREEN  ===========
   ========================================= */

export function GymFloor() {
  const container = document.createElement("div");
  container.className = "gymfloor-screen";

  const title = document.createElement("h1");
  title.className = "gymfloor-title";
  title.textContent = "Gym Floor";

  const buttons = document.createElement("div");
  buttons.className = "gymfloor-buttons";

  const zones = [
    { label: "Cardio Studio", screen: "CardioStudio" },
    { label: "Strength Studio", screen: "StrengthStudio" },
    { label: "Stretch Studio", screen: "StretchStudio" }
  ];

  zones.forEach(z => {
    const btn = document.createElement("button");
    btn.className = "gymfloor-btn";
    btn.textContent = z.label;
    btn.onclick = () => window.renderScreen(z.screen);
    buttons.appendChild(btn);
  });

  container.appendChild(title);
  container.appendChild(buttons);

  return container;
}
