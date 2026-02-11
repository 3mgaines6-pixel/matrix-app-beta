/* =========================================
   IMPORT SCREENS (ORDER MATTERS)
========================================= */
import { Splash } from "./screens/Splash.js";
import { GymFloor } from "./screens/GymFloor.js";
import { StrengthStudio } from "./screens/StrengthStudio.js";   // ⭐ moved up
import { Machine } from "./screens/Machine.js";
import { CardioStudio } from "./screens/CardioStudio.js";
import { StretchStudio } from "./screens/StretchStudio.js";
/* =========================================
   SCREEN REGISTRY
========================================= */

window.SCREENS = {
  StrengthStudio,
  Machine,
  CardioStudio,
  StretchStudio,
  GymFloor,
  Splash
};

/* =========================================
   RENDER FUNCTION
========================================= */

export function renderScreen(screenName, data) {
  const app = document.getElementById("app");
  if (!app) return;

  let screen;

  switch (screenName) {
    case "Splash":
      screen = Splash();
      break;

    case "GymFloor":
      screen = GymFloor();
      break;

    case "StrengthStudio":
      screen = StrengthStudio();
      break;

    case "CardioStudio":
      screen = CardioStudio();
      break;

    case "StretchStudio":
      screen = StretchStudio();
      break;

    case "Machine":
      screen = Machine(data);
      break;

    default:
      // Unified machine routing: "Machine-15", "Machine-3", etc.
      if (screenName.startsWith("Machine-")) {
        const id = Number(screenName.split("-")[1]);
        screen = Machine(id);
      } else {
        screen = GymFloor();
      }
  }

  app.innerHTML = "";
  app.appendChild(screen);
}

window.renderScreen = renderScreen;

/* =========================================
   INITIAL LOAD
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderScreen("Splash");
});

