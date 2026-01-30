import { Splash } from "./screens/Splash.js";

import { GymFloor } from "./screens/GymFloor.js";

import { CardioStudio } from "./screens/CardioStudio.js";
import { StrengthStudio } from "./screens/StrengthStudio.js";
import { StretchStudio } from "./screens/StretchStudio.js";

export function renderScreen(screenName) {
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


    case "CardioStudio":
      screen = CardioStudio();
      break;

    case "StrengthStudio":
      screen = StrengthStudio();
      break;

    case "StretchStudio":
      screen = StretchStudio();
      break;

   default:
  screen = GymFloor();

}

  app.innerHTML = "";
  app.appendChild(screen);
}

window.renderScreen = renderScreen;

document.addEventListener("DOMContentLoaded", () => {
  renderScreen("Splash");
});


