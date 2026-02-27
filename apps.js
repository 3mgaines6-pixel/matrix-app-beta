


/* =========================================
   IMPORT SCREENS (ORDER MATTERS)
========================================= */
import { Splash } from "./screens/Splash.js?v=3";
import { GymFloor } from "./screens/GymFloor.js?v=3";
import { StrengthFloor } from "./screens/StrengthFloor.js";
import { StrengthHistory } from "./screens/StrengthHistory.js?v=3";
import { Machine } from "./screens/Machine.js?v=3";
import { CardioStudio } from "./screens/CardioStudio.js?v=3";
import { StretchStudio } from "./screens/StretchStudio.js?v=3";
import { Summary } from "./screens/Summary.js?v=3";
import { WeeklyOverview } from "./screens/WeeklyOverview.js?v=3";
import { MatrixTreadmill } from "./screens/MatrixTreadmill.js?v=3";
import { MatrixCycle } from "./screens/MatrixCycle.js?v=3";
import { MatrixElliptical } from "./screens/MatrixElliptical.js?v=3";
import { NutritionGuide } from "./screens/NutritionGuide.js?v=3";
import { SpinClass } from "./screens/SpinClass.js?v=3";
import { CoreClass } from "./screens/CoreClass.js?v=3";
import { CardioHistory } from "./screens/CardioHistory.js?v=3";


/* =========================================
   SCREEN REGISTRY
========================================= */
window.SCREENS = {
  StrengthFloor,
  Machine,
  StrengthHistory,
  CardioStudio,
  StretchStudio,
  GymFloor,
  Splash,

  MatrixTreadmill,
  MatrixCycle,
  MatrixElliptical,

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
    case "Splash": screen = Splash(); break;
    case "GymFloor": screen = GymFloor(); break;
    case "StrengthFloor": screen = StrengthFloor(); break;
    case "StrengthHistory": screen = StrengthHistory(); break;
    case "CardioStudio": screen = CardioStudio(); break;
    case "StretchStudio": screen = StretchStudio(); break;
    case "Machine": screen = Machine(data); break;
    case "MatrixTreadmill": screen = MatrixTreadmill(); break;
    case "MatrixCycle": screen = MatrixCycle(); break;
    case "MatrixElliptical": screen = MatrixElliptical(); break;
    case "SpinClass": screen = SpinClass(); break;
    case "CoreClass": screen = CoreClass(); break;
    case "CardioHistory": screen = CardioHistory(); break;
    case "Summary": screen = Summary(); break;
    case "WeeklyOverview": screen = WeeklyOverview(); break;
    case "NutritionGuide": screen = NutritionGuide(); break;

    default:
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
