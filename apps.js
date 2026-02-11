import { Splash } from "./screens/Splash.js";
import { GymFloor } from "./screens/GymFloor.js";
import { Machine } from "./screens/Machine.js";
import { WeeklySchedule } from "./screens/WeeklySchedule.js";
import { DayView } from "./screens/DayView.js";

window.SCREENS = {
  StrengthStudio,
  Machine,
  WeeklySchedule,
  DayView,
};

import { CardioStudio } from "./screens/CardioStudio.js";
import { StrengthStudio } from "./screens/StrengthStudio.js";
import { StretchStudio } from "./screens/StretchStudio.js";

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

    case "CardioStudio":
      screen = CardioStudio();
      break;

    case "StrengthStudio":
      screen = StrengthStudio();
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

document.addEventListener("DOMContentLoaded", () => {
  renderScreen("Splash");
});
