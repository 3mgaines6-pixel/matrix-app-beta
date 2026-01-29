import { Lobby } from "./screens/Lobby.js";
import { CardioStudio } from "./screens/CardioStudio.js";

export function renderScreen(screenName) {
  const app = document.getElementById("app");
  if (!app) return;

  let screen;

  switch (screenName) {
    case "Lobby":
      screen = Lobby();
      break;

    case "CardioStudio":
      screen = CardioStudio();
      break;

    default:
      screen = Lobby();
  }

  app.innerHTML = "";
  app.appendChild(screen);
}

window.renderScreen = renderScreen;

document.addEventListener("DOMContentLoaded", () => {
  renderScreen("Lobby");
});
