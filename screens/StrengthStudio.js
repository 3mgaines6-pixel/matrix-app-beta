/* =========================================
   STRENGTH STUDIO (DOM VERSION)
========================================= */

export default function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-studio";

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Strength Studio";
  container.appendChild(header);

  // Machine list container
  const list = document.createElement("div");
  list.className = "machine-list";
  container.appendChild(list);

  // Load machines from global MACHINES object
  Object.keys(MACHINES).forEach((machineName) => {
    const btn = document.createElement("div");
    btn.className = "machine-button";
    btn.textContent = machineName;

    btn.onclick = () => {
      window.renderScreen("Machine", { name: machineName });
    };

    list.appendChild(btn);
  });

  return container;
}
