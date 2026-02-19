/* =========================================
   IMPORT SCREENS (ORDER MATTERS)
========================================= */
import { Splash } from "./screens/Splash.js";
import { GymFloor } from "./screens/GymFloor.js";
import { StrengthStudio } from "./screens/StrengthStudio.js?v=2";
  // ⭐ moved up
import { Machine } from "./screens/Machine.js";
import { CardioStudio } from "./screens/CardioStudio.js";
import { StretchStudio } from "./screens/StretchStudio.js";
import { Summary } from "./screens/Summary.js";
import { WeeklyOverview } from "./screens/WeeklyOverview.js";
import { MatrixTreadmill } from "./screens/MatrixTreadmill.js";
import { MatrixCycle } from "./screens/MatrixCycle.js";
import { MatrixElliptical } from "./screens/MatrixElliptical.js";
import { NutritionGuide } from "./screens/NutritionGuide.js";
import { SpinClass } from "./screens/SpinClass.js";
import { CoreClass } from "./screens/CoreClass.js";
 { CardioHistory } from "./screens/CardioHistory.js";



/* =========================================
   SCREEN REGISTRY
========================================= */

window.SCREENS = {
  StrengthStudio,
  Machine,
  StrengthHistory,
  CardioStudio,
  StretchStudio,
  GymFloor,
  Splash,

  // Cardio Machines
  MatrixTreadmill,
  MatrixCycle,
  MatrixElliptical,

  // Coming soon (safe placeholders)
  SpinClass,
  CoreClass,
  Rowing: null,
  OutdoorWalk: null
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
        
case "StrengthHistory":
  screen = StrengthHistory();
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

     case "MatrixTreadmill":
  screen = MatrixTreadmill();
  break;

case "MatrixCycle":
  screen = MatrixCycle();
  break;

case "MatrixElliptical":
  screen = MatrixElliptical();
  break;
case "SpinClass":
  screen = SpinClass();
  break;

case "CoreClass":
  screen = CoreClass();
  break;
        
case "CardioHistory":
  screen = CardioHistory();
  break;

case "Summary":
  screen = Summary();
  break;

case "WeeklyOverview":
  screen = WeeklyOverview();
  break;

case "NutritionGuide":
  screen = NutritionGuide();
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

