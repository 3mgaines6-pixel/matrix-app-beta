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
import Splash from "./screens/Splash.js";
import GymFloor from "./screens/GymFloor.js";
import StrengthStudio from "./screens/StrengthStudio.js";
// import Backup from "./screens/Backup.js";   <-- REMOVED

import StrengthHistory from "./screens/StrengthHistory.js";
import Machine from "./screens/Machine.js";
import CardioStudio from "./screens/CardioStudio.js";
import StretchStudio from "./screens/StretchStudio.js";
import Summary from "./screens/Summary.js";
import WeeklyOverview from "./screens/WeeklyOverview.js";
import MatrixTreadmill from "./screens/MatrixTreadmill.js";
import MatrixCycle from "./screens/MatrixCycle.js";
import MatrixElliptical from "./screens/MatrixElliptical.js";
import NutritionGuide from "./screens/NutritionGuide.js";
import SpinClass from "./screens/SpinClass.js";
import CoreClass from "./screens/CoreClass.js";
import CardioHistory from "./screens/CardioHistory.js";



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
    case "Splash": return app.replaceChildren(Splash());
    case "GymFloor": return app.replaceChildren(GymFloor());
    case "StrengthStudio": return app.replaceChildren(StrengthStudio());
    case "StrengthHistory": return app.replaceChildren(StrengthHistory());
    case "CardioStudio": return app.replaceChildren(CardioStudio());
    case "StretchStudio": return app.replaceChildren(StretchStudio());
    case "Machine": return app.replaceChildren(Machine(data));
    case "MatrixTreadmill": return app.replaceChildren(MatrixTreadmill());
    case "MatrixCycle": return app.replaceChildren(MatrixCycle());
    case "MatrixElliptical": return app.replaceChildren(MatrixElliptical());
    case "SpinClass": return app.replaceChildren(SpinClass());
    case "CoreClass": return app.replaceChildren(CoreClass());
    case "CardioHistory": return app.replaceChildren(CardioHistory());
    case "Summary": return app.replaceChildren(Summary());
    case "WeeklyOverview": return app.replaceChildren(WeeklyOverview());
    case "NutritionGuide": return app.replaceChildren(NutritionGuide());
    default: return app.replaceChildren(GymFloor());
  }
}

window.renderScreen = renderScreen;


/* =========================================
   INITIAL LOAD
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderScreen("Splash");
});
