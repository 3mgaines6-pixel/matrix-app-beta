import { Lobby } from "./screens/Lobby.js";

export function renderScreen(screenName) {
  const app = document.getElementById("app");
  if (!app) return;

  let screen;

  switch (screenName) {
    case "Lobby":
      screen = Lobby();
      break;

    default:
      screen = Lobby();
  }

  app.innerHTML = "";
  app.appendChild(screen);
}

document.addEventListener("DOMContentLoaded", () => {
  renderScreen("Lobby");
});

