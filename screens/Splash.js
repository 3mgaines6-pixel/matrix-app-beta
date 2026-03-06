/* =========================================
   SPLASH SCREEN (DOM VERSION)
========================================= */

export function Splash() {
  const container = document.createElement("div");
  container.className = "splash-container";

  const door = document.createElement("div");
  door.className = "splash-door";

  container.appendChild(door);

  // Fade out
  setTimeout(() => {
    container.classList.add("fade-out");
  }, 900);

  // Navigate to GymFloor
  setTimeout(() => {
    window.renderScreen("GymFloor");
  }, 1700);

  return container;
}
