/* =========================================
   ==========  SPLASH SCREEN  ==============
   ========================================= */

export function Splash() {
  const container = document.createElement("div");
  container.className = "splash-screen";

  const door = document.createElement("div");
  door.className = "splash-door";

  container.appendChild(door);

  // Auto-transition after 1500ms
  setTimeout(() => {
   window.renderScreen("GymFloor");

  }, 1500);

  return container;
}
