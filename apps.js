/* =========================================
   GLOBAL ERROR CATCHER
========================================= */
window.onerror = function (msg, url, line, col, error) {
  alert("ERROR: " + msg + "\n" + url + ":" + line);
};


/* =========================================
   IMPORT DATA FIRST
========================================= */
import { MACHINES } from "./data/machines.js";

// LOAD SAVED MACHINE DATA
const savedMachines = JSON.parse(localStorage.getItem("machines"));
if (savedMachines) {
  Object.assign(MACHINES, savedMachines);
}


/* =========================================
   IMPORT SCREENS (Backup removed)
========================================= */
import { Splash } from "./screens/Splash.js";
import { GymFloor } from "./screens/GymFloor.js";
import { StrengthStudio } from "./screens/StrengthStudio.js";
// import { Backup } from "./screens/Backup.js";   <-- REMOVED

import { StrengthHistory } from "./screens/StrengthHistory.js";
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
import { CardioHistory } from "./screens/CardioHistory.js";


/* =========================================
   SCREEN REGISTRY (Backup removed)
========================================= */
window.SCREENS = {
  StrengthStudio,
  Machine,

  StrengthHistory,
  CardioStudio,
  CardioHistory,
  StretchStudio,
  GymFloor,
  Splash,

  MatrixTreadmill,
  MatrixCycle,
  MatrixElliptical,

  SpinClass,
  CoreClass,

  Summary,
  WeeklyOverview,
  NutritionGuide,

  // Backup,   <-- REMOVED

  Rowing: null,
  OutdoorWalk: null
};


/* =========================================
   DEFINE renderScreen AFTER IMPORTS
========================================= */
export function renderScreen(screenName, data) {
  const app = document.getElementById("app");
  if (!app) return;

  let screen;

  switch (screenName) {
    case "Splash": screen = Splash(); break;
    case "GymFloor": screen = GymFloor(); break;
    case "StrengthStudio": screen = StrengthStudio(); break;
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
    // case "Backup": screen = Backup(); break;   <-- REMOVED
    default:
      screen = GymFloor();
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



/* =========================================
   GLOBAL ERROR CATCHER
========================================= */
window.onerror = function (msg, url, line, col, error) {
  alert("ERROR: " + msg + "\n" + url + ":" + line);
};


/* =========================================
   IMPORT DATA FIRST
========================================= */
import { MACHINES } from "./data/machines.js";

// LOAD SAVED MACHINE DATA
const savedMachines = JSON.parse(localStorage.getItem("machines"));
if (savedMachines) {
  Object.assign(MACHINES, savedMachines);
}


/* =========================================
   IMPORT SCREENS (Backup removed)
========================================= */
import { Splash } from "./screens/Splash.js";
import { GymFloor } from "./screens/GymFloor.js";
import { StrengthStudio } from "./screens/StrengthStudio.js";
// import { Backup } from "./screens/Backup.js";   <-- REMOVED

import { StrengthHistory } from "./screens/StrengthHistory.js";
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
import { CardioHistory } from "./screens/CardioHistory.js";


/* =========================================
   SCREEN REGISTRY (Backup removed)
========================================= */
window.SCREENS = {
  StrengthStudio,
  Machine,

  StrengthHistory,
  CardioStudio,
  CardioHistory,
  StretchStudio,
  GymFloor,
  Splash,

  MatrixTreadmill,
  MatrixCycle,
  MatrixElliptical,

  SpinClass,
  CoreClass,

  Summary,
  WeeklyOverview,
  NutritionGuide,

  // Backup,   <-- REMOVED

  Rowing: null,
  OutdoorWalk: null
};


/* =========================================
   DEFINE renderScreen AFTER IMPORTS
========================================= */
export function renderScreen(screenName, data) {
  const app = document.getElementById("app");
  if (!app) return;

  let screen;

  switch (screenName) {
    case "Splash": screen = Splash(); break;
    case "GymFloor": screen = GymFloor(); break;
    case "StrengthStudio": screen = StrengthStudio(); break;
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
    // case "Backup": screen = Backup(); break;   <-- REMOVED
    default:
      screen = GymFloor();
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
