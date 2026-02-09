import { Splash } from "./screens/Splash.js";
import { GymFloor } from "./screens/GymFloor.js";

import { Machine } from "./screens/Machine.js";


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
case "Machine-15":
  screen = Machine15();
  break;
case "Machine-12":
  screen = Machine12();
  break;
case "Machine-13":
  screen = Machine13();
  break;
case "Machine-14":
  screen = Machine14();
  break;
case "Machine-3":
  screen = Machine3();
  break;
case "Machine-10":
  screen = Machine10();
  break;
case "Machine-11":
  screen = Machine11();
  break;
 case "Machine-7":
  screen = Machine7();
  break;
  case "Machine-6":
  screen = Machine6();
  break;
case "Machine-2":
  screen = Machine2();
  break;
case "Machine-9":
  screen = Machine9();
  break;
case "Machine-8":
  screen = Machine8();
  break;

case "Machine-5":
  screen = Machine5();
  break;

case "Machine-4":
  screen = Machine4();
  break;

case "Machine-1":
  screen = Machine1();
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


